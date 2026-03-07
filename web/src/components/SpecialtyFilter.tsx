import { X } from 'lucide-react'
import { HEALTHCARE_TAGS } from '../utils/healthcareTags'

export interface SpecialtyTagStat {
    tagId: string
    count: number
}

interface SpecialtyFilterProps {
    specialtyStats: SpecialtyTagStat[]
    selectedSpecialties: string[]
    onSpecialtyChange: (specialties: string[]) => void
}

export function SpecialtyFilter({
    specialtyStats,
    selectedSpecialties,
    onSpecialtyChange,
}: SpecialtyFilterProps) {
    const activeTags = HEALTHCARE_TAGS
        .map(tag => {
            const stat = specialtyStats.find(s => s.tagId === tag.id)
            return { ...tag, count: stat?.count || 0 }
        })
        .filter(tag => tag.count > 0)

    if (activeTags.length === 0) return null

    const toggleTag = (tagId: string) => {
        if (selectedSpecialties.includes(tagId)) {
            onSpecialtyChange(selectedSpecialties.filter(id => id !== tagId))
        } else {
            onSpecialtyChange([...selectedSpecialties, tagId])
        }
    }

    const clearAll = () => onSpecialtyChange([])
    const isFiltering = selectedSpecialties.length > 0

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    🏥 Healthcare Specialties
                </span>
                {isFiltering && (
                    <button
                        onClick={clearAll}
                        className="text-xs text-primary-500 hover:text-primary-600 flex items-center gap-0.5"
                    >
                        <X className="w-3 h-3" />
                        Clear
                    </button>
                )}
            </div>
            <div className="flex flex-wrap gap-1.5">
                <button
                    onClick={clearAll}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${!isFiltering
                            ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                        }`}
                >
                    All
                </button>
                {activeTags.map(tag => {
                    const isSelected = selectedSpecialties.includes(tag.id)
                    return (
                        <button
                            key={tag.id}
                            onClick={() => toggleTag(tag.id)}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1 ${isSelected
                                    ? tag.activeColor
                                    : tag.color + ' hover:opacity-80'
                                }`}
                            title={tag.label}
                        >
                            <span>{tag.icon}</span>
                            <span>{tag.label}</span>
                            <span className={`text-[10px] ${isSelected ? 'opacity-80' : 'opacity-60'}`}>
                                {tag.count}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
