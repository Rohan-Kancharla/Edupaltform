import { useEffect, useMemo, useRef, useState } from 'react'

export type WaveMode = 'single' | 'interference' | 'standing'

export function WaveLab() {
  const [mode, setMode] = useState<WaveMode>('single')
  const [amplitude, setAmplitude] = useState<number>(50)
  const [frequency, setFrequency] = useState<number>(1)
  const [phase, setPhase] = useState<number>(0)
  const [speed, setSpeed] = useState<number>(120)
  const [showGrid, setShowGrid] = useState<boolean>(true)
  const [showMarkers, setShowMarkers] = useState<boolean>(false)
  const [paused, setPaused] = useState<boolean>(false)

  // Second wave (for interference)
  const [amplitude2, setAmplitude2] = useState<number>(40)
  const [frequency2, setFrequency2] = useState<number>(1)
  const [phase2, setPhase2] = useState<number>(Math.PI / 2)

  // Standing wave options
  const [lengthPx, setLengthPx] = useState<number>(800)
  const [nodeCount, setNodeCount] = useState<number>(5)
  const [damping, setDamping] = useState<number>(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const requestRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const wavelength = useMemo(() => (frequency === 0 ? Infinity : speed / frequency), [speed, frequency])
  const wavelength2 = useMemo(() => (frequency2 === 0 ? Infinity : speed / frequency2), [speed, frequency2])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const context = ctx as CanvasRenderingContext2D

    let width = canvas.clientWidth || 800
    let height = 320
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    context.setTransform(dpr, 0, 0, dpr, 0, 0)

    function draw(timeMs: number) {
      if (startTimeRef.current === null) startTimeRef.current = timeMs
      const t = (timeMs - startTimeRef.current) / 1000
      context.clearRect(0, 0, width, height)

      const midY = height / 2

      if (showGrid) {
        context.strokeStyle = '#e2e8f0'
        context.lineWidth = 1
        context.beginPath()
        for (let x = 0; x <= width; x += 50) { context.moveTo(x, 0); context.lineTo(x, height) }
        for (let y = 0; y <= height; y += 50) { context.moveTo(0, y); context.lineTo(width, y) }
        context.stroke()
      }

      // Equilibrium line (subtle)
      context.strokeStyle = '#cbd5e1'
      context.setLineDash([4, 6])
      context.beginPath()
      context.moveTo(0, midY)
      context.lineTo(width, midY)
      context.stroke()
      context.setLineDash([])

      context.lineWidth = 2

      if (mode === 'single') {
        // y(x,t) = A sin(2π(x/λ − f t) + φ)
        context.strokeStyle = '#1e40af'
        context.beginPath()
        const k = isFinite(wavelength) ? (2 * Math.PI) / wavelength : 0
        const omega = 2 * Math.PI * frequency
        for (let x = 0; x <= width; x++) {
          const y = midY + amplitude * Math.sin(k * x - omega * (paused ? 0 : t) + phase)
          if (x === 0) context.moveTo(x, y); else context.lineTo(x, y)
        }
        context.stroke()

        if (showMarkers && isFinite(wavelength) && wavelength > 20) {
          context.fillStyle = '#0ea5e9'
          for (let x = 0; x <= width; x += wavelength) { context.beginPath(); context.arc(x, midY, 3, 0, Math.PI * 2); context.fill() }
        }
      }

      if (mode === 'interference') {
        // Wave 1
        context.strokeStyle = '#1e40af'
        context.beginPath()
        const k1 = isFinite(wavelength) ? (2 * Math.PI) / wavelength : 0
        const w1 = 2 * Math.PI * frequency
        for (let x = 0; x <= width; x++) {
          const y1 = amplitude * Math.sin(k1 * x - w1 * (paused ? 0 : t) + phase)
          if (x === 0) context.moveTo(x, midY + y1); else context.lineTo(x, midY + y1)
        }
        context.stroke()

        // Wave 2
        context.strokeStyle = '#0ea5e9'
        context.beginPath()
        const k2 = isFinite(wavelength2) ? (2 * Math.PI) / wavelength2 : 0
        const w2 = 2 * Math.PI * frequency2
        for (let x = 0; x <= width; x++) {
          const y2 = amplitude2 * Math.sin(k2 * x - w2 * (paused ? 0 : t) + phase2)
          if (x === 0) context.moveTo(x, midY + y2); else context.lineTo(x, midY + y2)
        }
        context.stroke()

        // Resultant
        context.strokeStyle = '#10b981'
        context.beginPath()
        for (let x = 0; x <= width; x++) {
          const y1 = amplitude * Math.sin(k1 * x - w1 * (paused ? 0 : t) + phase)
          const y2 = amplitude2 * Math.sin(k2 * x - w2 * (paused ? 0 : t) + phase2)
          const y = y1 + y2
          if (x === 0) context.moveTo(x, midY + y); else context.lineTo(x, midY + y)
        }
        context.stroke()
      }

      if (mode === 'standing') {
        // y(x,t) = 2A cos(kx) sin(ωt)
        context.strokeStyle = '#1e40af'
        context.beginPath()
        const k = (Math.PI * nodeCount) / lengthPx // nodes define k
        const w = 2 * Math.PI * frequency
        for (let x = 0; x <= width; x++) {
          const env = Math.exp(-damping * (x / width))
          const y = 2 * amplitude * Math.cos(k * x) * Math.sin(w * (paused ? 0 : t)) * env
          if (x === 0) context.moveTo(x, midY + y); else context.lineTo(x, midY + y)
        }
        context.stroke()

        if (showMarkers) {
          context.fillStyle = '#dc2626'
          // Nodes at cos(kx)=0 => kx = (n+1/2)π
          for (let n = 0; n < nodeCount * 2; n++) {
            const x = ((n + 0.5) * Math.PI) / k
            if (x >= 0 && x <= width) { context.beginPath(); context.arc(x, midY, 3, 0, Math.PI * 2); context.fill() }
          }
        }
      }

      requestRef.current = requestAnimationFrame(draw)
    }

    requestRef.current = requestAnimationFrame(draw)
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); requestRef.current = null; startTimeRef.current = null }
  }, [mode, amplitude, frequency, phase, speed, showGrid, showMarkers, paused, amplitude2, frequency2, phase2, lengthPx, nodeCount, damping, wavelength, wavelength2])

  return (
    <div className="stack">
      <div className="panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <h3 className="section-title" style={{ margin: 0 }}>Wave Simulations</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Mode</label>
            <select value={mode} onChange={(e) => setMode(e.target.value as WaveMode)} style={{ padding: '8px 12px', borderRadius: '8px', border: '2px solid var(--border)', background: 'var(--background)' }}>
              <option value="single">Single Traveling Wave</option>
              <option value="interference">Two-Wave Interference</option>
              <option value="standing">Standing Wave</option>
            </select>
          </div>
        </div>
        <div className="canvas-wrap" style={{ marginTop: 12 }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: 320 }} />
        </div>
      </div>

      <div className="panel">
        <h3 className="section-title">Controls</h3>
        <div className="controls">
          <div className="control-row"><label>Amplitude (A)</label><span className="value">{amplitude.toFixed(0)} px</span></div>
          <input type="range" min={10} max={120} step={1} value={amplitude} onChange={e => setAmplitude(Number(e.target.value))} />

          <div className="control-row"><label>Frequency (f)</label><span className="value">{frequency.toFixed(2)} Hz</span></div>
          <input type="range" min={0.1} max={4} step={0.01} value={frequency} onChange={e => setFrequency(Number(e.target.value))} />

          <div className="control-row"><label>Phase (φ)</label><span className="value">{phase.toFixed(2)} rad</span></div>
          <input type="range" min={-Math.PI} max={Math.PI} step={0.01} value={phase} onChange={e => setPhase(Number(e.target.value))} />

          <div className="control-row"><label>Wave Speed (v)</label><span className="value">{speed.toFixed(0)} px/s</span></div>
          <input type="range" min={40} max={240} step={1} value={speed} onChange={e => setSpeed(Number(e.target.value))} />

          {mode === 'interference' && (
            <>
              <hr style={{ border: 0, borderTop: '1px solid var(--border)' }} />
              <div className="control-row"><label>Second Amplitude (A₂)</label><span className="value">{amplitude2.toFixed(0)} px</span></div>
              <input type="range" min={0} max={120} step={1} value={amplitude2} onChange={e => setAmplitude2(Number(e.target.value))} />

              <div className="control-row"><label>Second Frequency (f₂)</label><span className="value">{frequency2.toFixed(2)} Hz</span></div>
              <input type="range" min={0.1} max={4} step={0.01} value={frequency2} onChange={e => setFrequency2(Number(e.target.value))} />

              <div className="control-row"><label>Second Phase (φ₂)</label><span className="value">{phase2.toFixed(2)} rad</span></div>
              <input type="range" min={-Math.PI} max={Math.PI} step={0.01} value={phase2} onChange={e => setPhase2(Number(e.target.value))} />
            </>
          )}

          {mode === 'standing' && (
            <>
              <hr style={{ border: 0, borderTop: '1px solid var(--border)' }} />
              <div className="control-row"><label>Length (px)</label><span className="value">{lengthPx.toFixed(0)} px</span></div>
              <input type="range" min={400} max={1200} step={10} value={lengthPx} onChange={e => setLengthPx(Number(e.target.value))} />

              <div className="control-row"><label>Nodes</label><span className="value">{nodeCount}</span></div>
              <input type="range" min={2} max={12} step={1} value={nodeCount} onChange={e => setNodeCount(Number(e.target.value))} />

              <div className="control-row"><label>Damping</label><span className="value">{damping.toFixed(2)}</span></div>
              <input type="range" min={0} max={0.1} step={0.005} value={damping} onChange={e => setDamping(Number(e.target.value))} />
            </>
          )}

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="secondary" onClick={() => setPaused(p => !p)}>{paused ? 'Resume' : 'Pause'}</button>
            <button className="secondary" onClick={() => setShowGrid(g => !g)}>{showGrid ? 'Hide Grid' : 'Show Grid'}</button>
            <button className="secondary" onClick={() => setShowMarkers(m => !m)}>{showMarkers ? 'Hide Markers' : 'Show Markers'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
