import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useContainerWidth } from './chartUtils'

/**
 * MultipleBarChart renders a responsive grouped bar chart using D3.js.
 * 
 * @component
 * @param {Object[]} data - The chart data array, where each object represents a group with a `label` and values for each series key.
 * @param {Object[]} series - Array of series definitions. Each object should have:
 *   @param {string} series.key - The key in `data` objects for this series' value.
 *   @param {string} series.label - The display label for the series (used in legend and tooltip).
 *   @param {string} series.color - The color name/class for the series (used for bar and legend styling).
 * @param {number} [height=260] - The height of the chart in pixels.
 * 
 * @returns {JSX.Element} The rendered grouped bar chart with tooltips and legend.
 * 
 * @example
 * <MultipleBarChart
 *   data={[
 *     { label: 'Jan', apples: 10, oranges: 20 },
 *     { label: 'Feb', apples: 15, oranges: 25 }
 *   ]}
 *   series={[
 *     { key: 'apples', label: 'Apples', color: 'red-500' },
 *     { key: 'oranges', label: 'Oranges', color: 'orange-400' }
 *   ]}
 *   height={300}
 * />
 */
const MultipleBarChart = ({ data, series, height = 290}) => {
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

    const margin = { top: 60, right: 20, bottom: 30, left: 40 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const x0 = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, chartWidth])
      .padding(0.2)

    const x1 = d3.scaleBand()
      .domain(series.map(s => s.key))
      .range([0, x0.bandwidth()])
      .padding(0.1)

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(series, s => d[s.key])) || 1])
      .nice()
      .range([chartHeight, 0])

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x0))

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5))

    // Tooltip
    const tooltip = d3.select(tooltipRef.current)

    // Bars with tooltip
    g.selectAll('g.bar-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', d => `translate(${x0(d.label)},0)`)
      .selectAll('rect')
      .data(d => series.map(s => ({ key: s.key, value: d[s.key], color: s.color, label: d.label, seriesLabel: s.label })))
      .enter()
      .append('rect')
      .attr('x', d => x1(d.key))
      .attr('y', d => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', d => chartHeight - y(d.value))
      // .attr('class', d => `fill-${d.color}`)
      // .attr('fill', d => `var(--color-${d.color}, #64748b)`)
      .attr('fill', d => `var(--color-${d.color}, #64748b)`)
      .attr('rx', 4)
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
            `<div class="font-semibold">${d.seriesLabel}</div>
       <div class="text-xs text-gray-500">${d.label}</div>
       <div class="font-bold">${d.value}</div>`
          )
        d3.select(this).attr('opacity', 0.7)
      })
      .on('mouseleave', function () {
        tooltip.style('display', 'none')
        d3.select(this).attr('opacity', 1)
      })

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top - 54})`)
    series.forEach((s, i) => {
      const legendItem = legend.append('g').attr('transform', `translate(10,${i * 24})`)
      legendItem.append('rect')
        .attr('width', 18)
        .attr('height', 18)
        // .attr('fill', s.color)
        .attr('fill', `var(--color-${s.color}, #64748b)`)
        // .attr('class', `fill-${s.color}`)
        .attr('rx', 3)
      legendItem.append('text')
        .attr('x', 24)
        .attr('y', 13)
        .attr('font-size', 14)
        .attr('fill', 'currentColor')
        .text(s.label)
    })
  }, [data, series, height, containerWidth])

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
          position: 'fixed',
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

export default MultipleBarChart