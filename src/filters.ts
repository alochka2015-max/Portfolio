/** Project filters: index matches the FILTERS order (All, Web, Mobile, UX research). */
export function matchesFilter(index: number, p: { kind: string; badge: string }): boolean {
  if (index === 1) return p.kind === 'kind.web'
  if (index === 2) return p.kind === 'kind.app'
  if (index === 3) return p.badge === 'badge.research'
  return true
}
