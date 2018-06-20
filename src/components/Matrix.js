import React, { PureComponent } from 'react'
import random from 'lodash/random'

const CHARACTERS = ['A', 'B', 'C', 'D', 'E', '#', '£']
const FPS = 60
const INTERVAL = 1000 / FPS

class Matrix extends PureComponent {
  static defaultProps = {
    columnWidth: 15,
    baseSpeed: 20,
    baseOpacity: 0.5
  }

  state = {
    columns: []
  }

  raf = 0
  last = 0
  delta = 0

  componentDidMount() {
    const { columnWidth } = this.props

    const winWidth = window.innerWidth
    const numberOfColumns = Math.round(winWidth / columnWidth)

    const columns = []

    for (let col = 0; col < numberOfColumns; col++) {
      columns.push({
        opacity: random(0.5, 1),
        added: performance.now(),
        chars: []
      })
    }

    this.setState({
      columns
    })

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
    this.delta = time - this.last

    if (this.delta > INTERVAL) {
      this.last = time - (this.delta % INTERVAL)
      this.renderColumns(time)
    }
  }

  stopRender = () => {
    cancelAnimationFrame(this.raf)
  }

  renderColumns = (time) => {
    const { columns } = this.state
    const nextCols = []

    for (let col = 0; col < columns.length; col++) {
      const column = { ...columns[col] }
      const columnDelta = time - column.added
      
      column.opacity = column.opacity - ((Math.random() * 0.0005) * (columnDelta / 100))
      
      if (column.opacity > 0) {
        column.chars = this.renderColumn(column.chars)
        nextCols.push(column)
      } else {
        nextCols.push({
          opacity: random(0.75, 1),
          added: time,
          chars: []
        })
      }
    }
  
    this.setState({
      columns: nextCols
    })
  }

  renderColumn = column => {
    const character = {
      opacity: random(0.5, 1),
      char: CHARACTERS[random(0, CHARACTERS.length - 1)]
    }

    if (Math.random() > 0.75) {
      column.push(character)
    }

    for (let col = 0; col < column.length; col++) {
      const char = column[col]
      char.opacity = char.opacity - 0.005
    }

    return column
  }

  render() {
    const { columns } = this.state
    const { columnWidth } = this.props

    return (
      <div className="matrix-bg">
        {columns.map((col, colIdx) => (
          <div
            key={ `col_${colIdx}` }
            style={{ opacity: col.opacity, width: columnWidth + 'px' }}
            className="matrix-column">
            {col.chars.map((char, charIdx) => (
              <span
                key={ `col_${colIdx}_char_${charIdx}` }
                style={{ opacity: char.opacity }}>
                {char.char}
              </span>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default Matrix
