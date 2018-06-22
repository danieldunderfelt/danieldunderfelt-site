import React, { PureComponent } from 'react'
import random from 'lodash/random'
import get from 'lodash/get'
import last from 'lodash/last'

const CHARACTERS = ['1', '0']
const LETTER_HEIGHT = 20
const INTERVAL = 1000 / 30
const MAX_COL_LENGTH = Math.round(window.innerHeight / LETTER_HEIGHT)
const COL_WIDTH = 30

function createChar() {
  return {
    opacity: 1,
    char: CHARACTERS[random(0, CHARACTERS.length - 1)]
  }
}

function createTrack(opacity = random(0.25, 1)) {
  return {
    opacity,
    chars: [createChar()]
  }
}

const winWidth = window.innerWidth

class Matrix extends PureComponent {
  state = {
    columns: []
  }

  raf = 0
  last = 0

  componentDidMount() {
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
      this.renderColumns()
    }
  }

  stopRender = () => {
    cancelAnimationFrame(this.raf)
  }

  renderColumns = () => {
    const numberOfColumns = Math.round(winWidth / COL_WIDTH)

    const { columns } = this.state
    const nextColumns = []

    for (let col = 0; col < numberOfColumns; col++) {
      let columnTracks = columns[col]
      const nextColumnTracks = []

      if (!columnTracks) {
        columnTracks = [createTrack()]
      }

      for (let t = 0; t < columnTracks.length; t++) {
        const track = { ...columnTracks[t] }

        if (track.opacity > 0.1) {
          if (track.chars.length > 0) {
            track.opacity = track.opacity - Math.random() * 0.005
          }

          const canAddChar = MAX_COL_LENGTH > track.chars.length

          if (canAddChar && Math.random() < 0.25 + t * 0.005) {
            track.chars.push(createChar())
          }

          for (let charIdx = 0; charIdx < track.chars.length; charIdx++) {
            const char = track.chars[charIdx]
            char.opacity = char.opacity > 0 ? char.opacity - Math.random() * 0.025 : 0
          }

          nextColumnTracks.push(track)
        } else {
          nextColumnTracks.push(createTrack())
        }
      }

      if (nextColumnTracks.length < 3) {
        const lastTrack = last(nextColumnTracks)
        const lastTrackChars = get(lastTrack, 'chars', [])

        if (get(lastTrack, 'opacity', 1) < 0.5 && lastTrackChars.length > 15) {
          nextColumnTracks.push(createTrack(1))
        }
      }

      nextColumns.push(nextColumnTracks)
    }

    this.setState({
      columns: nextColumns
    })
  }

  render() {
    const { columns } = this.state

    return (
      <div className="matrix-bg">
        <div className="columns-container">
          {columns.map((col, colIdx) => (
            <div
              style={{
                width: COL_WIDTH + 'px'
              }}
              className="matrix-column"
              key={`col_${colIdx}`}
              dangerouslySetInnerHTML={{
                __html: col
                  .map(
                    (track, trackIdx) => `
                <div
                  style="opacity: ${track.opacity}; left: ${(COL_WIDTH / 3) * trackIdx}px;"
                  class="matrix-column-track">
                  ${track.chars
                    .map(
                      char =>
                        `<span style="opacity: ${
                          char.opacity
                        }; width: ${COL_WIDTH}px; height: ${LETTER_HEIGHT}px;">${char.char}</span>`
                    )
                    .join('')}
                </div>
              `
                  )
                  .join('')
              }}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Matrix
