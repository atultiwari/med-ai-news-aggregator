import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import type { NewsData, NewsItem, SiteStat } from '../types'
import { matchSpecialtyTags, HEALTHCARE_TAGS } from '../utils/healthcareTags'
import type { SpecialtyTagStat } from '../components/SpecialtyFilter'

export interface SourceStat {
  source: string
  count: number
}

export type TimeRange = '24h' | '7d'

interface UseNewsDataReturn {
  data: NewsData | null
  loading: boolean
  error: string | null
  filteredItems: NewsItem[]
  siteStats: SiteStat[]
  sourceStats: SourceStat[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedSite: string
  setSelectedSite: (site: string) => void
  selectedSource: string
  setSelectedSource: (source: string) => void
  selectedSpecialties: string[]
  setSelectedSpecialties: (specialties: string[]) => void
  specialtyStats: SpecialtyTagStat[]
  loadMore: () => void
  hasMore: boolean
  displayCount: number
  refresh: () => void
  timeRange: TimeRange
  setTimeRange: (range: TimeRange) => void
  isSwitching: boolean
}

const PAGE_SIZE = 50

export function useNewsData(): UseNewsDataReturn {
  const [data, setData] = useState<NewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSite, setSelectedSite] = useState('all')
  const [selectedSource, setSelectedSource] = useState('all')
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)
  const [timeRange, setTimeRange] = useState<TimeRange>('24h')
  const [isSwitching, setIsSwitching] = useState(false)

  const preloadedDataRef = useRef<{ [key in TimeRange]?: NewsData }>({})
  const isInitialLoadRef = useRef(true)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(async (range: TimeRange, isPreload = false) => {
    if (preloadedDataRef.current[range] && !isPreload) {
      setData(preloadedDataRef.current[range]!)
      setLoading(false)
      setIsSwitching(false)
      return
    }

    if (!isPreload) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      abortControllerRef.current = new AbortController()

      if (isInitialLoadRef.current) {
        setLoading(true)
      } else {
        setIsSwitching(true)
      }
      setError(null)
    }

    try {
      const basePath = import.meta.env.BASE_URL || '/'
      const fileName = range === '24h' ? 'latest-24h.json' : 'latest-7d.json'
      const signal = isPreload ? undefined : abortControllerRef.current?.signal

      const response = await fetch(`${basePath}data/${fileName}`, { signal })
      if (!response.ok) {
        throw new Error('Failed to load data')
      }
      const json = await response.json()

      preloadedDataRef.current[range] = json

      if (!isPreload) {
        setData(json)
        isInitialLoadRef.current = false
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }
      if (!isPreload) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    } finally {
      if (!isPreload) {
        setLoading(false)
        setIsSwitching(false)
      }
    }
  }, [])

  useEffect(() => {
    fetchData(timeRange)
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [timeRange, fetchData])

  useEffect(() => {
    if (!isInitialLoadRef.current && !preloadedDataRef.current['7d']) {
      fetchData('7d', true)
    }
  }, [data, fetchData])

  const handleTimeRangeChange = useCallback((range: TimeRange) => {
    setTimeRange(range)
    setDisplayCount(PAGE_SIZE)
    setSelectedSite('all')
    setSelectedSource('all')
    setSelectedSpecialties([])
    setSearchQuery('')
  }, [])

  const sourceStats = useMemo(() => {
    if (!data?.items || selectedSite === 'all') return []

    const sourceMap = new Map<string, number>()
    data.items
      .filter(item => item.site_id === selectedSite)
      .forEach(item => {
        sourceMap.set(item.source, (sourceMap.get(item.source) || 0) + 1)
      })

    return Array.from(sourceMap.entries())
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
  }, [data, selectedSite])

  const specialtyStats = useMemo(() => {
    if (!data?.items) return []

    const countMap = new Map<string, number>()
    for (const item of data.items) {
      const title = item.title_en || item.title || item.title_bilingual || item.title_zh || ''
      const tags = matchSpecialtyTags(title)
      for (const tagId of tags) {
        countMap.set(tagId, (countMap.get(tagId) || 0) + 1)
      }
    }

    return HEALTHCARE_TAGS
      .map(tag => ({ tagId: tag.id, count: countMap.get(tag.id) || 0 }))
      .filter(stat => stat.count > 0)
      .sort((a, b) => b.count - a.count)
  }, [data])

  const filteredItems = useMemo(() => {
    if (!data?.items) return []

    let items = data.items

    if (selectedSite !== 'all') {
      items = items.filter(item => item.site_id === selectedSite)
    }

    if (selectedSource !== 'all') {
      items = items.filter(item => item.source === selectedSource)
    }

    if (selectedSpecialties.length > 0) {
      items = items.filter(item => {
        const title = item.title_en || item.title || item.title_bilingual || item.title_zh || ''
        const tags = matchSpecialtyTags(title)
        return selectedSpecialties.some(s => tags.includes(s))
      })
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      items = items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query) ||
        (item.title_zh && item.title_zh.toLowerCase().includes(query))
      )
    }

    return items.slice(0, displayCount)
  }, [data, selectedSite, selectedSource, selectedSpecialties, searchQuery, displayCount])

  const totalFiltered = useMemo(() => {
    if (!data?.items) return 0

    let items = data.items

    if (selectedSite !== 'all') {
      items = items.filter(item => item.site_id === selectedSite)
    }

    if (selectedSource !== 'all') {
      items = items.filter(item => item.source === selectedSource)
    }

    if (selectedSpecialties.length > 0) {
      items = items.filter(item => {
        const title = item.title_en || item.title || item.title_bilingual || item.title_zh || ''
        const tags = matchSpecialtyTags(title)
        return selectedSpecialties.some(s => tags.includes(s))
      })
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      items = items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query) ||
        (item.title_zh && item.title_zh.toLowerCase().includes(query))
      )
    }

    return items.length
  }, [data, selectedSite, selectedSource, selectedSpecialties, searchQuery])

  const loadMore = () => {
    setDisplayCount(prev => prev + PAGE_SIZE)
  }

  const hasMore = displayCount < totalFiltered

  const refresh = () => {
    setDisplayCount(PAGE_SIZE)
    fetchData(timeRange)
  }

  useEffect(() => {
    setDisplayCount(PAGE_SIZE)
  }, [selectedSite, selectedSource, selectedSpecialties, searchQuery])

  useEffect(() => {
    setSelectedSource('all')
  }, [selectedSite])

  return {
    data,
    loading,
    error,
    filteredItems,
    siteStats: data?.site_stats || [],
    sourceStats,
    searchQuery,
    setSearchQuery,
    selectedSite,
    setSelectedSite,
    selectedSource,
    setSelectedSource,
    selectedSpecialties,
    setSelectedSpecialties,
    specialtyStats,
    loadMore,
    hasMore,
    displayCount,
    refresh,
    timeRange,
    setTimeRange: handleTimeRangeChange,
    isSwitching
  }
}
