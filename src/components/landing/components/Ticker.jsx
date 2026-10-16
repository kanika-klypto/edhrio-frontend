import { useEffect, useRef } from 'react'

const stocks = [
  { symbol: 'RELIANCE', price: '957.25', change: '-0.29%' },
  { symbol: 'BHARTIARTL', price: '1,778.70', change: '-1.46%' },
  { symbol: 'HDFCBANK', price: '704.90', change: '-0.33%' },
  { symbol: 'HINDUNILVR', price: '1,820.70', change: '-1.94%' },
  { symbol: 'INDIGO', price: '4,795.00', change: '-0.79%' },
  { symbol: 'ITC', price: '257.90', change: '-3.05%' },
  { symbol: 'MARUTI', price: '12,875.00', change: '+0.42%' },
  { symbol: 'NIFTY 50', price: '24,532.40', change: '+0.84%' },
  { symbol: 'SENSEX', price: '80,714.25', change: '+0.91%' },
]

function StockItem({ stock }) {
  const isDown = stock.change.startsWith('-')

  return (
    <span className="stock-ticker-item">
      <strong>{stock.symbol}</strong>
      <span className="stock-ticker-price">{stock.price}</span>
      <span className={`stock-ticker-change ${isDown ? 'stock-ticker-change--down' : 'stock-ticker-change--up'}`}>
        <span aria-hidden="true">{isDown ? '▼' : '▲'}</span> {stock.change.replace(/^[-+]/, '')}
      </span>
    </span>
  )
}

export function Ticker() {
  const viewportRef = useRef(null)
  const groupRef = useRef(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const viewport = viewportRef.current
    const group = groupRef.current
    if (!viewport || !group) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    let frame
    let previous = performance.now()
    const move = (now) => {
      if (!pausedRef.current) {
        viewport.scrollLeft += Math.min(now - previous, 100) * 0.035
        if (viewport.scrollLeft >= group.offsetWidth) {
          viewport.scrollLeft -= group.offsetWidth
        }
      }
      previous = now
      frame = requestAnimationFrame(move)
    }
    frame = requestAnimationFrame(move)
    return () => cancelAnimationFrame(frame)
  }, [])

  const step = (direction) => {
    const viewport = viewportRef.current
    const groupWidth = groupRef.current?.offsetWidth ?? 0
    if (!viewport || !groupWidth) return
    viewport.scrollLeft = (viewport.scrollLeft + direction * 260 + groupWidth) % groupWidth
  }

  return (
    <section id="markets" className="stock-ticker" aria-label="Illustrative market ticker">
      <button type="button" className="stock-ticker-arrow" aria-label="Previous stocks" onClick={() => step(-1)}>‹</button>
      <div
        ref={viewportRef}
        className="stock-ticker-viewport"
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
        onFocus={() => { pausedRef.current = true }}
        onBlur={() => { pausedRef.current = false }}
      >
        <div className="stock-ticker-track">
          <div className="stock-ticker-group" ref={groupRef}>{stocks.map((stock) => <StockItem key={stock.symbol} stock={stock} />)}</div>
          <div className="stock-ticker-group" aria-hidden="true">{stocks.map((stock) => <StockItem key={stock.symbol} stock={stock} />)}</div>
        </div>
      </div>
      <button type="button" className="stock-ticker-arrow" aria-label="Next stocks" onClick={() => step(1)}>›</button>
    </section>
  )
}
