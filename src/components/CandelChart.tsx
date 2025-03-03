import {
  ChartCanvas,
  Chart,
  CandlestickSeries,
  XAxis,
  YAxis,
  discontinuousTimeScaleProviderBuilder,
} from "react-financial-charts";
import { useEffect, useRef, useState, useMemo } from "react";
import { last } from "lodash";
import { mockData, CandleData } from "@/components/ui/mockData"; // Ensure this path is correct
import { select } from "d3-selection"; // Import d3's select function

export default function CandleChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Auto Resize for Responsive Charts
  useEffect(() => {
    const updateSize = () => {
      if (chartContainerRef.current) {
        setDimensions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    // Set initial size
    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Memoizing the xScaleProvider to avoid unnecessary re-calculations
  const { data, xScale, xAccessor, displayXAccessor } = useMemo(() => {
    const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d: CandleData) => d.date
    );
    return xScaleProvider(mockData);
  }, []);

  // Apply custom styles to XAxis labels
  useEffect(() => {
    if (typeof window !== "undefined" && chartContainerRef.current) {
      const svg = chartContainerRef.current.querySelector("svg");
      if (svg) {
        select(svg)
          .selectAll(".tick text")
          .style("fill", "#FF5733") // Apply color
          .style("font-size", "12px") // Apply font size
          .style("font-weight", "bold"); // Apply font weight
      }
    }
  }, [data]);

  return (
    <div ref={chartContainerRef} className="w-full h-full flex justify-center items-center">
      <ChartCanvas
        height={dimensions.height}
        width={dimensions.width}
        ratio={1}
        seriesName="InvestmentChart"
        data={data}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={[xAccessor(data[0]), xAccessor(last(data) ?? data[data.length - 1])]} // Added fallback
      >
        <Chart id={1} yExtents={(d: CandleData) => [d.high, d.low]}>
          {/* Explicitly typing the tickFormat function */}
          <XAxis
            showGridLines
            tickFormat={(d: number) => new Date(d).toLocaleDateString()} // Corrected type
          />
          <YAxis showGridLines />
          <CandlestickSeries />
        </Chart>
      </ChartCanvas>
    </div>
  );
}
