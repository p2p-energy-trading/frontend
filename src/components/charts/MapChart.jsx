import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { AppContext } from "../../context/context";
import { getColor, useContainerWidth } from "./chartUtils";

/**
 * MapChart component renders a choropleth map using D3.js to visualize regional data (e.g., ETK, IDRS, etc.) on a map.
 *
 * @component
 * @param {Object[]} data - Array of region data objects to visualize.
 * @param {string} data[].id - Unique identifier matching the region's HASC_1 property.
 * @param {string} data[].name - Display name of the region.
 * @param {number} [height=260] - Height of the SVG map in pixels.
 * @param {string} [firstColor='primary'] - CSS variable name for the primary color (used for high values).
 * @param {string} [secondColor='base-200'] - CSS variable name for the secondary color (used for low values).
 * @param {Object} mapJSON - GeoJSON object containing map features.
 * @param {Object[]} mapJSON.features - Array of GeoJSON features (regions).
 * @param {string[]} mapFilter - Array of HASC_1 codes to filter which regions are displayed.
 * @param {string} [valueKey] - The key in data objects to use for coloring (default: first numeric key found).
 * @returns {JSX.Element} Choropleth map with interactive tooltips and a legend.
 */
const MapChart = ({
  data,
  mapJSON,
  mapFilter,
  height = 260,
  firstColor = "primary",
  secondColor = "base-200",
  valueKey, // optional: which key to use for coloring
}) => {
  const ref = useRef();
  const tooltipRef = useRef();
  const width = useContainerWidth(ref);
  const context = useContext(AppContext);

  // Determine which numeric key to use for coloring (default: first numeric key found)
  const regionKeys = data.length > 0
    ? Object.keys(data[0]).filter(
        (k) => k !== "id" && k !== "name" && typeof data[0][k] === "number"
      )
    : [];
  const colorKey = valueKey && regionKeys.includes(valueKey)
    ? valueKey
    : regionKeys[0];

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    const svg = d3.select(ref.current);
    const primaryColor = getColor(`--color-${firstColor}`)?.trim() || "#2563eb";
    const baseColor = getColor(`--color-${secondColor}`)?.trim() || "#f3f4f6";

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMid meet");

    // Filter regions based on mapFilter (e.g., only Java provinces)
    const mapFeatures = mapJSON.features.filter((f) =>
      mapFilter.includes(f.properties.HASC_1)
    );

    // 1. Create projection and path generator
    const projection = d3
      .geoMercator()
      .fitSize([width, height], {
        type: "FeatureCollection",
        features: mapFeatures,
      });
    const path = d3.geoPath().projection(projection);

    // 2. Color scale based on selected key
    const maxValue = d3.max(data, (d) => d[colorKey]);
    const color = d3
      .scaleSequential()
      .domain([0, maxValue])
      .interpolator(d3.interpolate(baseColor, primaryColor));

    // 3. Tooltip
    const tooltip = d3.select(tooltipRef.current);

    // 4. Draw regions
    svg
      .append("g")
      .selectAll("path")
      .data(mapFeatures)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => {
        const found = data.find((x) => x.id === d.properties.HASC_1);
        return found && typeof found[colorKey] === "number"
          ? color(found[colorKey])
          : "#e5e7eb";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .on("mousemove", function (event, d) {
        const found = data.find((x) => x.id === d.properties.HASC_1);
        const parentRect = ref.current.getBoundingClientRect();
        const mouseX = event.clientX - parentRect.left;
        const mouseY = event.clientY - parentRect.top;

        tooltip
          .style("display", "block")
          .style("position", "absolute")
          .style("left", mouseX + 12 + "px")
          .style("top", mouseY - 8 + "px")
          .html(
            found
              ? `<div class="font-semibold">${found.name}</div>
                ${regionKeys
                  .map(
                    (key) =>
                      `<div>${key.charAt(0).toUpperCase() + key.slice(1)}: <b>${found[key]}</b></div>`
                  )
                  .join("")}`
              : `<div class="font-semibold">${d.properties.NAME_1}</div>
                 <div class="text-xs text-gray-500">No data</div>`
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
    width,
    context.theme,
    firstColor,
    secondColor,
    mapJSON,
    mapFilter,
    colorKey,
    regionKeys,
  ]);

  // Helper to get color for legend gradient
  function getLegendGradient() {
    const primaryColor = getColor(`--color-${firstColor}`)?.trim() || "#2563eb";
    const baseColor = getColor(`--color-${secondColor}`)?.trim() || "#f3f4f6";
    return `linear-gradient(to right, ${baseColor}, ${primaryColor})`;
  }

  return (
    <>
      <div className="relative w-full">
        <svg
          ref={ref}
          className="w-full"
          style={{ display: "block", height: `${height}px` }}
        />
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            pointerEvents: "none",
            display: "none",
            zIndex: 50,
            minWidth: 120,
            background: "rgba(30,41,59,0.95)",
            color: "#fff",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 14,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
        {/* Legend */}
        <div className="flex gap-2 items-center mt-4">
          <span className="text-xs">Low</span>
          <div
            style={{
              width: 80,
              height: 10,
              background: getLegendGradient(),
              borderRadius: 4,
            }}
          />
          <span className="text-xs">High</span>
        </div>
      </div>
      <div className="mt-4">
        <ul className="text-sm space-y-1">
          {data.map((region) => (
            <li key={region.id} className="flex flex-col md:flex-row md:justify-between">
              <span>{region.name}</span>
              <span>
                {regionKeys.map((key, i) => (
                  <span key={key}>
                    <span className={`font-semibold ${i === 0 ? "text-primary" : "text-secondary"}`}>
                      {region[key]}
                    </span>{" "}
                    {key}
                    {i < regionKeys.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MapChart;