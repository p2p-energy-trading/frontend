import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useContainerWidth } from './chartUtils'

/**
 * Renders a responsive line chart using D3.js with tooltips and customizable color.
 *
 * @component
 * @param {Object} props
 * @param {Array<{label: string, value: number}>} props.data - The data to plot, each item must have a `label` (x-axis) and `value` (y-axis).
 * @param {number} [props.height=260] - The height of the chart in pixels.
 * @param {string} [props.color='primary'] - The color theme for the line and dots (used as a CSS class suffix).
 * @returns {JSX.Element} The rendered line chart component.
 */
const LineChart = ({ data, height = 260, color = 'primary'}) => {
  const ref = useRef()
  const containerWidth = useContainerWidth(ref)
  const tooltipRef = useRef()

  useEffect(() => {
    d3.select(ref.current).selectAll('*').remove()
    const svg = d3.select(ref.current)
    const width = containerWidth

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMid meet')

    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const x = d3.scalePoint()
      .domain(data.map(d => d.label))
      .range([0, chartWidth])
      .padding(0.5)

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 1])
      .nice()
      .range([chartHeight, 0])

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5))

    // Line
    const line = d3.line()
      .x(d => x(d.label))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX)

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      // .attr('class', `stroke-${color}`)
      .attr('stroke', `var(--color-${color}, #64748b)`)
      .attr('stroke-width', 3)
      .attr('d', line)

    // Tooltip
    const tooltip = d3.select(tooltipRef.current)

    // Dots with tooltip
    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.label))
      .attr('cy', d => y(d.value))
      .attr('r', 5)
      .attr('fill', `var(--color-${color}, #64748b)`)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('mousemove', function (event, d) {
        const parentRect = ref.current.getBoundingClientRect()
        const mouseX = event.clientX - parentRect.left
        const mouseY = event.clientY - parentRect.top

        tooltip
          .style('display', 'block')
          .style('position', 'absolute')
          .style('left', (mouseX + 12) + 'px')
          .style('top', (mouseY - 8) + 'px')
          .html(
            `<div class="font-semibold">${d.label}</div>
             <div class="font-bold">${d.value}</div>`
          )
        d3.select(this).attr('opacity', 0.7)
      })
      .on('mouseleave', function () {
        tooltip.style('display', 'none')
        d3.select(this).attr('opacity', 1)
      })
  }, [data, height, containerWidth, color])

  return (
    <div className="relative w-full">
      <svg
        ref={ref}
        className="w-full"
        style={{ display: 'block', height: `${height}px` }}
      />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          display: 'none',
          zIndex: 50,
          minWidth: 90,
          background: 'rgba(30,41,59,0.95)',
          color: '#fff',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: 14,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
      />
    </div>
  )
}

export default LineChart