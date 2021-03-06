// @flow
import React, { Component } from 'react'
import styles from './Subways.css'
import { select } from 'd3-selection'

const d3 = {
  select
}

const lineWidth = 37
const stationR = 22

type Props = {
}

export class Subways extends Component {
  props: Props
  draw: () => void
  drawLine: () => void
  textX: (position: string) => number
  textY: (position: string) => number
  textAnchor: (position: string) => string
  handleClickOnCanvas: () => void

  constructor (props: Props) {
    super(props)
    this.draw = this.draw.bind(this)
    this.drawLine = this.drawLine.bind(this)
    this.textAnchor = this.textAnchor.bind(this)
    this.handleClickOnCanvas = this.handleClickOnCanvas.bind(this)
  }

  componentDidMount () {
    this.draw()
  }

  draw () {
    const svg = d3.select(this.refs.svg)
    // const width = +svg.attr('width')
    // const height = +svg.attr('height')

    // Line 13:
    this.drawLine(svg, {
      d: `M3767 3698 C3727 3698, 3654 3667, 3654 3627 V2580
        C3654 2517, 3722 2453, 3785 2453 H5318
        C5398 2453, 5452 2524, 5452 2604 V3620
        C5452 3670, 5411 3699, 5362 3699
        `,
      color: '#ede611',
      stationsData: [
        { x: 3767, y: 3698, name: '西直门', text: 'left', isExchange: true, to: ['Line2', 'Line4'] },
        { x: 3654, y: 3440, name: '大钟寺', text: 'left' },
        { x: 3654, y: 3191, name: '知春路', text: 'left', isExchange: true, to: ['Line10'] },
        { x: 3654, y: 3002, name: '五道口', text: 'left' },
        { x: 3654, y: 2838, name: '上地', text: 'left' },
        { x: 3654, y: 2584, name: '西二旗', text: 'left', isExchange: true, to: ['LineCHANGPING'] },
        { x: 3851.5, y: 2453, name: '龙泽', text: 'top' },
        { x: 4074.5, y: 2453, name: '回龙观', text: 'top' },
        { x: 4388, y: 2453, name: '霍营', text: 'top', isExchange: true, to: ['Line8'] },
        { x: 5049, y: 2453, name: '立水桥', text: 'top', isExchange: true, to: ['Line5'] },
        { x: 5452, y: 2606, name: '北苑', text: 'right' },
        { x: 5452, y: 2908.5, name: '望京西', text: 'right', isExchange: true, to: ['Line15'] },
        { x: 5452, y: 3191, name: '芍药居', text: 'right', isExchange: true, to: ['Line10'] },
        { x: 5452, y: 3394, name: '光熙门', text: 'right' },
        { x: 5452, y: 3532, name: '柳芳', text: 'right' },
        { x: 5362, y: 3699, name: '东直门', text: 'left', isExchange: true, to: ['Line2', 'AirportExpress'] }
      ]
    })

    // Line 15:
    this.drawLine(svg, {
      d: `M3795 2908.5 H6455.5
        C6465.5 2908.5, 6485 2892.5, 6485 2882.5 V1985.5
        C6485 1968.5, 6495.5 1952.5, 6512.5 1952.5 H7895.5
        `,
      color: '#603471',
      stationsData: [
        { x: 3795, y: 2908.5, name: '清华东路西口', text: 'top' },
        { x: 4038, y: 2908.5, name: '六道口', text: 'top' },
        { x: 4260, y: 2908.5, name: '北沙滩', text: 'top' },
        { x: 4554, y: 2908.5, name: '奥林匹克公园', text: 'bottom-left', isExchange: true, to: ['Line8'] },
        { x: 4795, y: 2908.5, name: '安立路', text: 'top' },
        { x: 5049, y: 2908.5, name: '大屯路东', text: 'top-right', isExchange: true, to: ['Line5'] },
        { x: 5245, y: 2908.5, name: '关庄', text: 'bottom' },
        { x: 5452, y: 2908.5, name: '望京西', text: 'top-right', isExchange: true, to: ['Line13'] },
        { x: 5869.5, y: 2908.5, name: '望京', text: 'bottom-left', isExchange: true, to: ['Line14'] },
        { x: 6241.5, y: 2908.5, name: '望京东', text: 'top' },
        { x: 6485, y: 2767.5, name: '崔各庄', text: 'right' },
        { x: 6485, y: 2620.5, name: '马泉营', text: 'right' },
        { x: 6485, y: 2467.5, name: '孙河', text: 'right' },
        { x: 6485, y: 2321.5, name: '国展', text: 'left' },
        { x: 6485, y: 2173.5, name: '花梨坎', text: 'left' },
        { x: 6485, y: 2017.5, name: '后沙峪', text: 'left' },
        { x: 6775, y: 1952.5, name: '南法信', text: 'bottom' },
        { x: 7143, y: 1952.5, name: '石门', text: 'top' },
        { x: 7493.5, y: 1952.5, name: '顺义', text: 'bottom' },
        { x: 7895.5, y: 1952.5, name: '俸伯', text: 'top' }
      ]
    })
  }

  drawLine (svg: Object, options: Object) {
    const { d, color, stationsData = [] } = options
    const line = svg.append('g')
    line.append('path')
      // x/y the same, x/y +- X (30 ~ 70)
      .attr('d', d)
      .attr('stroke', color || 'black')
      .attr('fill', 'none')
      .attr('stroke-width', lineWidth)

    const stations = line.selectAll('g')
      .data(stationsData)
      .enter()
      .append('g')
      // .attr('class', styles['station'])

    stations.append('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', stationR)
      .attr('class', styles['station--circle'])

    stations.append('text')
      .attr('x', (d) => d.x + this.textX(d.text))
      .attr('y', (d) => d.y + this.textY(d.text))
      .attr('class', styles['station--text'])
      .attr('text-anchor', (d) => this.textAnchor(d.text))
      .text((d) => d.isExchange ? '' : d.name)
  }

  textX (position: string): number {
    switch (position) {
      case 'left':
        return -40
      case 'top': case 'bottom':
        return 0
      case 'right':
        return 40
      default:
        return 40
    }
  }

  textY (position: string): number {
    switch (position) {
      case 'left': case 'right':
        return 0
      case 'top':
        return -40
      case 'bottom':
        return 60
      default:
        return 40
    }
  }

  textAnchor (position: string): string {
    switch (position) {
      case 'left':
        return 'end'
      case 'top': case 'bottom':
        return 'middle'
      case 'right':
        return 'start'
      default:
        return 'start'
    }
  }

  handleClickOnCanvas (e: MouseEvent) {
    const rect = this.refs.canvas.getBoundingClientRect()
    const coor = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    console.log(coor)
  }

  render () {
    return (
      <div className={styles['canvas']} ref='canvas'
        onClick={this.handleClickOnCanvas}
      >
        <img src='/images/subway_map.jpg' className={styles['img-layer']} />
        <svg className={styles['svg-layer']}
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='6719'
          height='9448'
          viewBox='0 0 9448 6719'
          ref='svg'
        />
      </div>
    )
  }
}

export default Subways
