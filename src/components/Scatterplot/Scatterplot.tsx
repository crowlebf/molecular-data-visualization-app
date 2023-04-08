import { useState, useEffect } from 'react';
import styles from './Scatterplot.module.scss';
import { ScatterChart, Scatter, XAxis, YAxis, Label, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IChemblData } from '../../types/chemblData';

interface IScatterplotProps {
  data: IChemblData[];
}

interface IFilterValues {
  full_mwt: { name: string };
  alogp: { name: string };
  year: { name: string };
  num_ro5_violations: { name: string };
}

type DataPoints = {
  x: number;
  y: number;
};

const FILTER_VALUES: IFilterValues = {
  full_mwt: { name: 'Weight' },
  alogp: { name: 'Lipophilicity' },
  year: { name: 'Year of experiment' },
  num_ro5_violations: { name: 'Rule of 5 violations' },
};

export default function Scatterplot({ data }: IScatterplotProps) {
  const [scatterPlotData, setScatterPlotData] = useState<DataPoints[]>([]);
  const [filterValue, setFilterValue] = useState(Object.keys(FILTER_VALUES)[0]);

  useEffect(() => {
    if (data.length > 0) {
      const getScatterPlotData = () => {
        const dataPoints: DataPoints[] = [];

        data.forEach((data: IChemblData) => {
          if (!data._source.pchembl_value) return;
          let yVal: number;
          if (filterValue === 'year') {
            yVal = data._source._metadata.document_data[filterValue];
          } else if (typeof filterValue === 'string') {
            yVal = parseFloat(
              data._source._metadata.parent_molecule_data[
                filterValue as keyof Pick<IFilterValues, 'full_mwt' | 'alogp'>
              ],
            );
          } else {
            yVal = data._source._metadata.parent_molecule_data[filterValue];
          }
          const pchembl_value = parseFloat(data._source.pchembl_value);

          dataPoints.push({
            x: pchembl_value,
            y: yVal,
          });
        });

        return dataPoints;
      };

      setScatterPlotData(getScatterPlotData());
    }
  }, [data, filterValue]);

  return (
    <div className={styles.scatterplotContainer}>
      <div className={styles.selectContainer}>
        <label className={styles.label}>Filter: </label>
        <select className={styles.select} onChange={(e) => setFilterValue(e.target.value)} value={filterValue}>
          {Object.entries(FILTER_VALUES).map(([filterKey, filterValue]) => (
            <option key={filterKey} value={filterKey}>
              {filterValue.name}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, left: 0, right: 20, bottom: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="IC50">
            <Label value="IC50" offset={-15} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={['dataMin', 'auto']}
            allowDecimals={false}
            type="number"
            dataKey="y"
            name={FILTER_VALUES[filterValue as keyof IFilterValues].name}
          >
            <Label
              value={FILTER_VALUES[filterValue as keyof IFilterValues].name}
              angle={-90}
              offset={5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={scatterPlotData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
