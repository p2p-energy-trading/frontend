import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { getColor, useContainerWidth } from "./chartUtils";
import { AppContext } from "../../context/context";

/**
 * PieChart component renders a responsive donut (pie) chart with interactive tooltips and a legend.
 * Uses D3.js for drawing and animating the chart, and DaisyUI for color theming.
 *
 * @component
 * @param {Object[]} data - Array of data objects to display in the pie chart.
 * @param {string|React.ReactNode} data[].label - The label for each slice.
 * @param {number} data[].value - The numeric value for each slice.
 * @param {React.ReactNode} [data[].icon] - Optional icon to display in the legend for each slice.
 * @param {number} [height=260] - Height of the SVG chart in pixels.
 * @param {string} [firstColor='primary'] - DaisyUI color name for the primary color (start of gradient).
 * @param {string} [secondColor='base-200'] - DaisyUI color name for the secondary color (end of gradient).
 * @returns {JSX.Element} The rendered PieChart component.
 */
const PieChart = ({
  data,
  height = 260,
  firstColor = "primary",
  secondColor = "base-200",
}) => {
  const ref = useRef();
  const containerWidth = useContainerWidth(ref);
  const tooltipRef = useRef();
  const context = useContext(AppContext);

  // Thicker donut
  const donutRatio = 0.75;

  // Calculate total for percentage
  const total = data.reduce((sum, d) => sum + d.value, 0);

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    const svg = d3.select(ref.current);
    const width = Math.min(containerWidth, 400);
    const radius = Math.min(width, height) / 2 - 8;

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMid meet");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    const arc = d3
      .arc()
      .innerRadius(radius * donutRatio)
      .outerRadius(radius);

    // Get base and primary color from DaisyUI
    const primaryColor = getColor(`--color-${firstColor}`)?.trim() || "#2563eb";
    const baseColor = getColor(`--color-${secondColor}`)?.trim() || "#f3f4f6";

    // Interpolate color for each slice
    const interpolator = d3.interpolate(primaryColor, baseColor);
    const color = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 1]);

    const tooltip = d3.select(tooltipRef.current);

    // Draw arcs
    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => interpolator(color(i)))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("mousemove", function (event, d) {
        const parentRect = ref.current.getBoundingClientRect();
        const mouseX = event.clientX - parentRect.left;
        const mouseY = event.clientY - parentRect.top;

        tooltip
          .style("display", "block")
          .style("position", "absolute")
          .style("left", mouseX + 12 + "px")
          .style("top", mouseY - 8 + "px")
          .html(
            `<div class="font-semibold">${d.data.label}</div>
             <div class="font-bold">${d.data.value} (${(
              (d.data.value / total) *
              100
            ).toFixed(1)}%)</div>`
          );
        d3.select(this).attr("opacity", 0.7);
      })
      .on("mouseleave", function () {
        tooltip.style("display", "none");
        d3.select(this).attr("opacity", 1);
      });
  }, [
    data,
    height,
    containerWidth,
    total,
    context.theme,
    firstColor,
    secondColor,
  ]);

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-center gap-6">
      {/* Legend */}
      <div className="flex-1 flex flex-col gap-2 justify-center md:justify-start md:items-start items-center">
        {data.map((d, i) => {
          // Get legend color according to interpolation
          const primaryColor =
            getColor(`--color-${firstColor}`)?.trim() || "#2563eb";
          const baseColor =
            getColor(`--color-${secondColor}`)?.trim() || "#f3f4f6";
          const interpolator = d3.interpolate(primaryColor, baseColor);
          const color = d3
            .scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 1]);
          const legendColor = interpolator(color(i));
          return (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: legendColor,
                  marginRight: 4,
                }}
              />
              <span className="font-medium" style={{ fontSize: 13 }}>
                {d.icon ? <span>{d.icon}</span> : null} {d.label}
              </span>
              <span className="ml-2 text-gray-500" style={{ fontSize: 12 }}>
                {((d.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
      {/* Chart */}
      <div
        className="relative flex-1 flex justify-center items-center"
        style={{ minWidth: 180 }}
      >
        <svg
          ref={ref}
          className="w-full"
          style={{ display: "block", height: `${height}px`, maxWidth: 340 }}
        />
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            pointerEvents: "none",
            display: "none",
            zIndex: 50,
            minWidth: 90,
            background: "rgba(30,41,59,0.95)",
            color: "#fff",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 14,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
