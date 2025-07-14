import React, { useEffect, useMemo, useRef } from "react";
import { AreaSeries, createChart, ColorType } from "lightweight-charts";

const defaultColors = {
  backgroundColor: "transparent",
  lineColor: "#2962FF",
  textColor: "black",
  areaTopColor: "#2962FF",
  areaBottomColor: "rgba(41, 98, 255, 0.28)",
};

const ChartPrice = ({ data, colors: propColors }) => {
  const colors = useMemo(
    () => ({
      ...defaultColors,
      ...propColors,
    }),
    [propColors]
  );

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
        attributionLogo: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000);
          return date.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        },
        // Disable zoom and pan interactions
        rightOffset: 0,
        barSpacing: 6,
        fixLeftEdge: true,
        fixRightEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
      },
      rightPriceScale: {
        // Disable price scale interactions
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      leftPriceScale: {
        visible: false,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      crosshair: {
        // Keep crosshair but disable zoom
        mode: 0, // Normal crosshair mode
      },
      handleScroll: false,
      handleScale: false,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addSeries(AreaSeries, {
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, colors]);

  return <div ref={chartContainerRef} />;
};

export default ChartPrice;
