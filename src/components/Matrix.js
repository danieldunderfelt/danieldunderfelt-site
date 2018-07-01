import React, { PureComponent } from 'react'
import random from 'lodash/random'
import get from 'lodash/get'
import last from 'lodash/last'

let win = typeof window !== 'undefined' ? window : {}
const WIN_WIDTH = get(win, 'innerWidth', 2000)
const WIN_HEIGHT = get(win, 'innerHeight', 1000)

const CHARACTERS = ['1', '0']
const LETTER_HEIGHT = 20
const INTERVAL = 1000 / 30
const MAX_COL_LENGTH = Math.round(WIN_HEIGHT / LETTER_HEIGHT)
const COL_WIDTH = 25
const MAX_TRACKS = 3

function createChar() {
  return {
    rgb: [random(100, 120), random(100, 230), random(200, 255)],
    opacity: 1,
    char: CHARACTERS[random(0, CHARACTERS.length - 1)]
  }
}

function createTrack() {
  return {
    opacity: 1,
    chars: [createChar()]
  }
}

function getTrackOpacity(track) {
  return get(last(track.chars), 'opacity', 1)
}

class Matrix extends PureComponent {
  columns = []
  raf = 0
  last = 0
  canvas = []
  ctx = []
  wrapper = null

  componentDidMount() {
    this.ctx = this.canvas.map(canvas => canvas.getContext('2d'))
    this.renderLoop()
  }

  componentWillUnmount() {
    this.stopRender()
  }

  renderLoop = (time = 0) => {
    if (!this.last) {
      this.last = time
    }

    this.raf = requestAnimationFrame(this.renderLoop)
    let delta = time - this.last

    if (delta > INTERVAL) {
      this.last = time - (delta % INTERVAL)
      this.renderMatrix()
    }
  }

  stopRender = () => {
    cancelAnimationFrame(this.raf)
  }

  renderMatrix = () => {
    const numberOfColumns = Math.round(WIN_WIDTH / COL_WIDTH)
    const columns = this.columns

    const nextColumns = []

    this.ctx.forEach(ctx => {
      ctx.clearRect(0, 0, WIN_WIDTH, WIN_HEIGHT)
      ctx.font = '14px "Roboto Mono"'
    })

    for (let col = 0; col < numberOfColumns; col++) {
      const colX = col * COL_WIDTH
      const colY = 0

      let columnTracks = columns[col]
      const nextColumnTracks = []

      if (!columnTracks) {
        columnTracks = [createTrack()]
      }

      for (let trackIdx = 0; trackIdx < columnTracks.length; trackIdx++) {
        const ctx = this.ctx[trackIdx]
        const track = columnTracks[trackIdx]
        const trackX = Math.round(colX + (COL_WIDTH / 2) * trackIdx)
        const trackY = colY

        const trackOpacity = getTrackOpacity(track)

        if (trackOpacity > 0.1) {
          const canAddChar = MAX_COL_LENGTH > track.chars.length

          if (canAddChar && Math.random() < 0.5 - track.chars.length * 0.001) {
            track.chars.push(createChar())
          }

          for (let charIdx = 0; charIdx < track.chars.length; charIdx++) {
            const char = track.chars[charIdx]
            char.opacity = char.opacity > 0 ? char.opacity - Math.random() * 0.05 : 0

            const charX = trackX
            const charY = Math.round(trackY + LETTER_HEIGHT * charIdx)

            ctx.fillStyle = `rgba(${char.rgb.join(', ')}, ${char.opacity})`
            ctx.fillText(char.char, charX, charY)
          }

          nextColumnTracks.push(track)
        } else {
          nextColumnTracks.push(createTrack())
        }
      }

      if (nextColumnTracks.length < MAX_TRACKS) {
        const lastTrack = last(nextColumnTracks)
        const trackOpacity = getTrackOpacity(lastTrack)

        if (trackOpacity < 0.5 || lastTrack.chars.length > 20) {
          nextColumnTracks.push(createTrack(1))
        }
      }

      nextColumns.push(nextColumnTracks)
    }

    this.columns = nextColumns
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const canvases = []

    for (let c = 0; c < MAX_TRACKS; c++) {
      canvases.push(
        <canvas
          style={{ transform: `translateZ(${c * 50}px)`, opacity: 0.4 + (c * 0.15) }}
          key={`canvas_${c}`}
          width={WIN_WIDTH}
          height={WIN_HEIGHT}
          ref={ref => this.canvas.push(ref)}
          className="matrix-canvas"
        />
      )
    }

    return (
      <div className="matrix-bg">
        { canvases }
      </div>
    )
  }
}

export default Matrix
