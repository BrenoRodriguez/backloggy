export function getVisiblePageNumbers(
  totalPages: number,
  currentPage: number,
): number[] {
  const MIN_VISIBLE_PAGES = 5
  const PAGE_RANGE_OFFSET = 2

  if (totalPages <= 0) return []
  if (totalPages === 1) return [1]

  const [rangeStart, rangeEnd] = calculateVisibleRange(
    totalPages,
    currentPage,
    PAGE_RANGE_OFFSET,
    MIN_VISIBLE_PAGES,
  )

  return generatePageRange(rangeStart, rangeEnd)
}

function calculateVisibleRange(
  totalPages: number,
  currentPage: number,
  offset: number,
  minVisible: number,
): [number, number] {
  let rangeStart = Math.max(1, currentPage - offset)
  let rangeEnd = Math.min(totalPages, currentPage + offset)

  rangeEnd = expandRangeToMinimum(rangeEnd, totalPages, rangeStart, minVisible)
  rangeStart = shrinkRangeToMinimum(rangeStart, rangeEnd, minVisible)

  return [rangeStart, rangeEnd]
}

function expandRangeToMinimum(
  end: number,
  maxEnd: number,
  start: number,
  minSize: number,
): number {
  while (getRangeSize(start, end) < minSize && end < maxEnd) {
    end++
  }
  return end
}

function shrinkRangeToMinimum(
  start: number,
  end: number,
  minSize: number,
): number {
  while (getRangeSize(start, end) < minSize && start > 1) {
    start--
  }
  return start
}

function getRangeSize(start: number, end: number): number {
  return end - start + 1
}

function generatePageRange(start: number, end: number): number[] {
  return Array.from(
    { length: getRangeSize(start, end) },
    (_, index) => start + index,
  )
}
