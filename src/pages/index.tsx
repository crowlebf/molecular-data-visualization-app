import { useState } from 'react';
import Head from 'next/head';
import { useChemblData } from '../hooks/useChemblData';
import styles from '../styles/index.module.scss';
import Loading from '../components/Loading/Loading';
import Script from 'next/script';
import Histogram from '../components/Histogram/Histogram';
import Scatterplot from '../components/Scatterplot/Scatterplot';
import Smiles from '../components/Smiles/Smiles';
import Header from '../components/Header/Header';
import { calculateMean, calculateMedian, calculateStandardDeviation } from '../utils/calculations';
import Form from '../components/Form/Form';
import { IChemblData } from '../types/chemblData';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [chemblId, setChemblId] = useState('');
  const {
    chemblData = [],
    pchemblValueData = [],
    loading,
    error,
    noResults,
  } = useChemblData({ target_chembl_id: chemblId, size: '500' });

  const submitChemblId = (chemblId: string): void => {
    setChemblId(chemblId);
  };

  return (
    <>
      <Script
        src="https://unpkg.com/@rdkit/rdkit@2022.3.2/Code/MinimalLib/dist/RDKit_minimal.js"
        onLoad={() => setIsMounted(true)}
      />
      <Head>
        <title>Molecular DataViz</title>
        <meta name="description" content="Visualize potency data of protein targets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Form submit={submitChemblId} />
        {loading ? <Loading /> : null}
        {chemblData.length === 0 && noResults ? <div>No Results, please try another ID</div> : null}
        {chemblData && chemblData.length > 0 ? (
          <>
            <Header
              chemblId={chemblId}
              results={chemblData.length}
              headerData={{
                mean: {
                  calcValue: calculateMean(pchemblValueData),
                  displayName: 'Mean',
                },
                median: {
                  calcValue: calculateMedian(pchemblValueData),
                  displayName: 'Median',
                },
                standardDeviation: {
                  calcValue: calculateStandardDeviation(pchemblValueData),
                  displayName: 'Standard Deviation',
                },
              }}
            />
            <div className={styles.chartsWrapper}>
              {pchemblValueData.filter((data) => data > 0).length > 1 && <Histogram data={pchemblValueData} />}
              <Scatterplot data={chemblData} />
            </div>
          </>
        ) : null}
        {isMounted ? <Smiles data={chemblData.slice(0, 6).map((data: IChemblData) => data)} /> : null}
      </main>
    </>
  );
}
