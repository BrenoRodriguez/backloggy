import type { Settings } from '@/features/settings/types'

type PlatformSuggestion = { id: number; label: string }

type SelectOption = { label: string; value: string }

export function mapPlatformSuggestionsToOptions(
  platforms: PlatformSuggestion[],
): SelectOption[] {
  return platforms.map((platform) => ({
    label: platform.label,
    value: `${platform.id}`,
  }))
}

export function mapPrioritiesToOptions(
  priorities: Settings['priorities'],
): SelectOption[] {
  return priorities.map((priority) => ({
    label: priority.label,
    value: priority.level,
  }))
}
