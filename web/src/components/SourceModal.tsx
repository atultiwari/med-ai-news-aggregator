import { X, Rss, Globe, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { SiteStat } from '../types'

interface SourceModalProps {
  isOpen: boolean
  onClose: () => void
  siteStats: SiteStat[]
  sourceCount: number
  windowHours: number
}

interface SourceStatus {
  generated_at: string
  sites: {
    site_id: string
    site_name: string
    ok: boolean
    item_count: number
    duration_ms: number
    error: string | null
  }[]
  successful_sites: number
  failed_sites: string[]
}

interface OpmlGroup {
  name: string
  feeds: {
    name: string
    url: string
  }[]
}

const SITE_INFO: Record<string, { description: string; url: string }> = {
  aihot: {
    description: 'AI hot topics aggregator, collecting AI-related trending content from major platforms',
    url: 'https://www.aihot.cn/',
  },
  techurls: {
    description: 'Tech link aggregator, featuring popular articles from Hacker News, Reddit, and other tech communities',
    url: 'https://techurls.com/',
  },
  newsnow: {
    description: 'News aggregation platform, real-time tracking of global tech news',
    url: 'https://newsnow.co/',
  },
  tophub: {
    description: 'Trending topics aggregator from 50+ platforms',
    url: 'https://tophub.today/',
  },
  buzzing: {
    description: 'Trending discussions aggregator from Reddit, HN, Twitter, and other platforms',
    url: 'https://www.buzzing.cc/',
  },
  opmlrss: {
    description: 'Custom RSS subscriptions including healthcare AI journals, preprints, and news sources',
    url: '',
  },
  iris: {
    description: 'Info Flow RSS feed, curated tech blogs and news',
    url: 'https://info-flow.codelife.cc/',
  },
  zeli: {
    description: 'Hacker News 24-hour hot picks',
    url: 'https://zeli.app/',
  },
  aihubtoday: {
    description: 'AI daily news, curated important developments in the AI field',
    url: 'https://aihubtoday.com/',
  },
  aibase: {
    description: 'AI product database, featuring the latest AI tools and applications',
    url: 'https://www.aibase.com/',
  },
  bestblogs: {
    description: 'Quality blog roundup, curated tech blog articles',
    url: 'https://bestblogs.dev/',
  },
}

export function SourceModal({ isOpen, onClose, siteStats, sourceCount, windowHours }: SourceModalProps) {
  const [sourceStatus, setSourceStatus] = useState<SourceStatus | null>(null)
  const [opmlGroups, setOpmlGroups] = useState<OpmlGroup[]>([])

  useEffect(() => {
    if (isOpen) {
      const basePath = import.meta.env.BASE_URL || '/'
      fetch(`${basePath}data/source-status.json`)
        .then(res => res.json())
        .then(data => setSourceStatus(data))
        .catch(() => { })

      fetch(`${basePath}data/opml-feeds.json`)
        .then(res => res.json())
        .then(data => setOpmlGroups(data))
        .catch(() => { })
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const totalRawItems = siteStats.reduce((sum, s) => sum + s.raw_count, 0)
  const totalFilteredItems = siteStats.reduce((sum, s) => sum + s.count, 0)
  const allOpmlFeeds = opmlGroups.flatMap(g => g.feeds)

  const sortedSiteStats = [...siteStats].sort((a, b) => {
    if (a.site_id === 'opmlrss') return 1
    if (b.site_id === 'opmlrss') return -1
    return 0
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[85vh] overflow-hidden animate-fade-in">
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Rss className="w-5 h-5 text-primary-500" />
              Source Overview
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Aggregating {siteStats.length} platforms · {sourceCount} sources
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="px-6 py-4 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{siteStats.length}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Platforms</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{sourceCount}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Sources</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalRawItems.toLocaleString()}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Raw Articles</p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              <span>In the last <strong className="text-slate-900 dark:text-white">{windowHours} hours</strong>, intelligently filtered <strong className="text-slate-900 dark:text-white">{totalFilteredItems.toLocaleString()}</strong> AI-related articles from <strong className="text-slate-900 dark:text-white">{totalRawItems.toLocaleString()}</strong> raw items</span>
            </div>
          </div>

          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Platform Details
          </h3>

          <div className="space-y-3">
            {sortedSiteStats.map((stat) => {
              const siteInfo = sourceStatus?.sites.find(s => s.site_id === stat.site_id)
              const isOk = siteInfo?.ok !== false
              const info = SITE_INFO[stat.site_id]
              const isOpml = stat.site_id === 'opmlrss'

              return (
                <div key={stat.site_id} className="rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700/50">
                    <div className="flex items-center gap-3">
                      {isOk ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      )}
                      <div className="text-left">
                        <span className="font-medium text-slate-900 dark:text-white">{stat.site_name}</span>
                        {isOpml && (
                          <span className="ml-2 text-xs text-slate-500">({allOpmlFeeds.length} subscriptions)</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Raw: <span className="text-slate-700 dark:text-slate-300">{stat.raw_count}</span>
                      </span>
                      <span className="text-primary-600 dark:text-primary-400 font-medium">
                        AI: {stat.count}
                      </span>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-600">
                    {info && (
                      <div className="mb-3">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{info.description}</p>
                        {info.url && (
                          <a
                            href={info.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {info.url}
                          </a>
                        )}
                      </div>
                    )}

                    {isOpml && allOpmlFeeds.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mt-2">
                        {allOpmlFeeds.map((feed, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-slate-600 dark:text-slate-400 truncate py-1 px-2 bg-white dark:bg-slate-700/50 rounded border border-slate-200 dark:border-slate-600"
                            title={feed.name}
                          >
                            {feed.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {sourceStatus?.failed_sites && sourceStatus.failed_sites.length > 0 && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <h4 className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">Failed Sources</h4>
              <p className="text-xs text-red-600 dark:text-red-300">
                {sourceStatus.failed_sites.join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
