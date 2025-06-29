import React, { useEffect, useMemo, useRef } from 'react';
import { AreaSeries, createChart, ColorType } from 'lightweight-charts';

const defaultColors = {
    backgroundColor: 'transparent',
    lineColor: '#2962FF',
    textColor: 'black',
    areaTopColor: '#2962FF',
    areaBottomColor: 'rgba(41, 98, 255, 0.28)',
};

const ChartPrice = ({ data, colors: propColors }) => {
    const colors = useMemo(() => ({
        ...defaultColors,
        ...propColors
    }), [propColors]);

    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: colors.backgroundColor },
                    textColor: colors.textColor,
                    attributionLogo: false
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addSeries(AreaSeries, {
                lineColor: colors.lineColor,
                topColor: colors.areaTopColor,
                bottomColor: colors.areaBottomColor
            });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        },
        [data, colors]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    )
}

export default ChartPrice