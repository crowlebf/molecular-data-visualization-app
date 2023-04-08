import { useState, useEffect } from 'react';
import styles from './Histogram.module.scss';
import { BarChart, Bar, XAxis, YAxis, Label, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3';

interface IHistogramProps {
  data: number[];
}

type HistogramData = { x0: number | undefined; x1: number | undefined; frequency: number }[];

export default function Histogram({ data }: IHistogramProps) {
  const [histogramData, setHistogramData] = useState<HistogramData>([]);

  useEffect(() => {
    const getHistogramData = () => {
      const filteredPchemblValueData = data.filter((data) => data > 0);
      const max = Math.floor(Math.max(...filteredPchemblValueData));
      const min = Math.min(...filteredPchemblValueData);
      const numOfBins = Math.ceil(Math.cbrt(filteredPchemblValueData.length) * 2);
      const histogram = d3
        .bin()
        .domain([min, max])
        .value((filteredPchemblValueData) => filteredPchemblValueData)
        .thresholds(numOfBins);

      const d3Bins = histogram(filteredPchemblValueData);

      const histogramData = d3Bins.map((bin) => {
        return { x0: bin.x0, x1: bin.x1, frequency: bin.length };
      });

      return histogramData;
    };

    setHistogramData(getHistogramData());
  }, [data]);

  return (
    <div className={styles.histogramContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={histogramData} margin={{ top: 20, left: 0, right: 20, bottom: 20 }} barCategoryGap={0.5}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x1">
            <Label value="IC50" offset={-15} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Frequency" angle={-90} offset={15} position="insideLeft" />
          </YAxis>
          <Tooltip cursor={{ fill: '#dcdcdc83' }} />
          <Bar dataKey="frequency" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
