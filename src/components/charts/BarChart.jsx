import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useContainerWidth } from './chartUtils'

/**
 * BarChart component renders a responsive bar chart using D3.js.
 *
 * @component
 * @param {Object[]} data - Array of data objects to be displayed in the bar chart.
 * @param {string|number} data[].label - The label for each bar (displayed on the x-axis).
 * @param {number} data[].value - The numeric value for each bar (displayed as bar height).
 * @param {number} [height=260] - The height of the chart in pixels.
 * @param {string} [color='primary'] - The color theme for the bars (used as a CSS class suffix).
 * @returns {JSX.Element} The rendered bar chart component with interactive tooltips.
 *
 * @example
 * <BarChart
 *   data={[
 *     { label: 'Jan', value: 30 },
 *     { label: 'Feb', value: 45 },
 *     { label: 'Mar', value: 20 }
 *   ]}
 *   height={300}
 *   color="secondary"
 * />
 */
const BarChart = ({ data, height = 260, color = 'primary' }) => {
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

    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, chartWidth])
      .padding(0.2)

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 1])
      .nice()
      .range([chartHeight, 0])

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))

    g.append('g')
      .call(d3.axisLeft(y).ticks(5))

    // Tooltip
    const tooltip = d3.select(tooltipRef.current)

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => chartHeight - y(d.value))
      .attr('rx', 6)
      .attr('fill', `var(--color-${color}, #64748b)`)
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

export default BarChart