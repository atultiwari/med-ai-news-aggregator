import { ExternalLink, Clock, BadgeCheck, Star } from 'lucide-react'
import type { NewsItem } from '../types'
import { SourceBadge } from './SourceBadge'
import { formatDateTime } from '../utils/formatDate'
import { Analytics } from '../utils/analytics'
import { matchSpecialtyTags, getTagById } from '../utils/healthcareTags'

interface NewsCardProps {
  item: NewsItem
  index: number
  isVisited?: boolean
  isFavorite?: boolean
  onVisit?: (url: string, title?: string) => void
  onToggleFavorite?: (url: string, title: string) => void
}

export function NewsCard({ item, index, isVisited = false, isFavorite = false, onVisit, onToggleFavorite }: NewsCardProps) {
  const displayTitle = item.title_en || item.title || item.title_bilingual || item.title_zh || ''

  const handleClick = () => {
    Analytics.trackNewsClick(displayTitle, item.source, item.site_id)
    onVisit?.(item.url, displayTitle)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    Analytics.trackNewsFavorite(displayTitle, isFavorite ? 'remove' : 'add')
    onToggleFavorite?.(item.url, displayTitle)
  }

  const specialtyTagIds = matchSpecialtyTags(displayTitle || '')

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`card card-hover p-4 block animate-slide-up group relative transition-all duration-300 ${isVisited ? 'visited-card' : ''
        }`}
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <SourceBadge siteId={item.site_id} siteName={item.site_name} />
            <span className={`text-xs truncate max-w-[200px] ${isVisited
              ? 'text-slate-400 dark:text-slate-500'
              : 'text-slate-500 dark:text-slate-400'
              }`}>
              {item.source}
            </span>
            {isVisited && (
              <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <BadgeCheck className="w-3.5 h-3.5" />
                <span className="text-[12px] font-medium">Read</span>
              </span>
            )}
          </div>

          <h3 className={`text-base font-medium leading-relaxed transition-colors line-clamp-2 ${isVisited
            ? 'text-slate-400 dark:text-slate-500 group-hover:text-primary-500 dark:group-hover:text-primary-400'
            : 'text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400'
            }`}>
            {displayTitle}
          </h3>

          {specialtyTagIds.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {specialtyTagIds.slice(0, 3).map(tagId => {
                const tag = getTagById(tagId)
                if (!tag) return null
                return (
                  <span
                    key={tagId}
                    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium ${tag.color}`}
                  >
                    <span>{tag.icon}</span>
                    <span>{tag.label}</span>
                  </span>
                )
              })}
            </div>
          )}

          <div className={`flex items-center gap-4 mt-3 text-xs ${isVisited
            ? 'text-slate-400 dark:text-slate-500'
            : 'text-slate-500 dark:text-slate-400'
            }`}>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDateTime(item.published_at || item.first_seen_at)}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <button
            onClick={handleToggleFavorite}
            className={`p-1.5 rounded-lg transition-all ${isFavorite
              ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
              : 'text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
              }`}
            title={isFavorite ? 'Unfavorite' : 'Favorite'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <ExternalLink className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </a>
  )
}

