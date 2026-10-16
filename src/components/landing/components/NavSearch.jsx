import { useState } from 'react'

const destinations = [
  { label: 'Markets', href: '/#markets', keywords: 'stocks ticker indices' },
  { label: 'Features', href: '/#features', keywords: 'tools charts indicators' },
  { label: 'Platforms', href: '/#platforms', keywords: 'web desktop mobile api' },
  { label: 'Pricing', href: '/pricing', keywords: 'plans subscription cost' },
  { label: 'Market Movers', href: '/#market-movers', keywords: 'gainers losers stocks' },
  { label: 'Community', href: '/#community', keywords: 'traders ideas' },
  { label: 'Newsletter', href: '/#newsletter', keywords: 'email updates' },
]

export function NavSearch({ autoFocus = false }) {
  const [query, setQuery] = useState('')
  const results = query.trim()
    ? destinations.filter(({ label, keywords }) => `${label} ${keywords}`.toLowerCase().includes(query.trim().toLowerCase()))
    : []

  const onSubmit = (event) => {
    event.preventDefault()
    if (results[0]) window.location.assign(results[0].href)
  }

  return <form className="nav-search" role="search" onSubmit={onSubmit}>
    <svg className="nav-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
    <input
      className="nav-search-input border-1 border-border"
      type="search"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      onKeyDown={(event) => { if (event.key === 'Escape') setQuery('') }}
      placeholder="Search pages..."
      aria-label="Search pages"
      autoFocus={autoFocus}
    />
    {query.trim() && <div className="nav-search-results bg-secondary border-1 border-border" aria-live="polite">
      {results.length ? results.map(({ label, href }) => <a key={href} href={href}>{label}</a>)
        : <p>No matching page</p>}
    </div>}
  </form>
}
