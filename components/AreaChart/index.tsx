import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { year: '2017', count: 52 },
  { year: '2018', count: 60 },
  { year: '2019', count: 120 },
  { year: '2020', count: 97 },
  { year: '2021', count: 115 },
  { year: '2022', count: 78 },
];

function AreaChart() {
  const areaChart = useRef<any>(null);
  const dimensions = { width: 184, height: 50 };
  useEffect(() => {
    const svg = d3.select(areaChart.current).attr('width', dimensions.width).attr('height', dimensions.height);
    // .style('background-color', 'yellow');

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d: any) => d3.timeParse('%Y')(d.year)))
      .range([0, dimensions.width]);

    svg.append('g').call(d3.axisBottom(x)).attr('transform', 'translate(0,350)');

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d: any) => d.count)])
      .range([dimensions.height, 0]);

    // svg.append('g').call(d3.axisLeft(y)).attr('tranform', 'translate(20,50');

    const area: any = d3
      .area()
      .x((d: any) => x(d3.timeParse('%Y')(d.year)))
      .y0(y(0))
      .y1((d: any) => y(d.count));

    svg
      .append('path')
      .datum(data)
      .attr('d', area)
      .attr('fill', '#f9f9f9')
      .attr('stroke', '#e5e5e5')
      .attr('stroke-width', 1);
    // .attr('transform', 'translate(0,0)');
  });

  return (
    <div id="chartArea">
      <svg ref={areaChart}></svg>
    </div>
  );
}

export default AreaChart;
