import { formatDistanceToNow, format, parseISO, isValid } from 'date-fns'
import { enUS } from 'date-fns/locale'

export function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return 'Unknown time'

  try {
    const date = parseISO(dateString)
    if (!isValid(date)) return 'Unknown time'

    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: enUS
    })
  } catch {
    return 'Unknown time'
  }
}

export function formatDateTime(dateString: string | null): string {
  if (!dateString) return 'Unknown time'

  try {
    const date = parseISO(dateString)
    if (!isValid(date)) return 'Unknown time'

    return format(date, 'yyyy-MM-dd HH:mm', { locale: enUS })
  } catch {
    return 'Unknown time'
  }
}

export function formatTime(dateString: string | null): string {
  if (!dateString) return ''

  try {
    const date = parseISO(dateString)
    if (!isValid(date)) return ''

    return format(date, 'HH:mm', { locale: enUS })
  } catch {
    return ''
  }
}
