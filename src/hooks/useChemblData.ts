import { useState } from 'react';
import useSWR from 'swr';
import { IChemblData, Hits, IChemblResponseData } from '../types/chemblData';

interface IQuery {
  target_chembl_id: string;
  size?: string;
}

export function useChemblData(query: IQuery) {
  const [noResults, setNoResults] = useState(false);
  const { target_chembl_id, ...rest } = query;
  const q = `target_chembl_id:CHEMBL${target_chembl_id} AND standard_type:("IC50")`;
  const queryObj = { q, ...rest };

  const queryString = new URLSearchParams(queryObj);
  const searchUrl = `https://www.ebi.ac.uk/chembl/elk/es/chembl_activity/_search?${queryString.toString()}`;

  const fetcher = async (searchUrl: string): Promise<IChemblData[]> => {
    if (!target_chembl_id) return [];
    const response = await fetch(searchUrl);
    const json: IChemblResponseData = await response.json();
    const responseHits: Hits = json.hits;
    if (responseHits.hits.length === 0) setNoResults(true);
    return responseHits.hits;
  };

  const { data, error, isLoading } = useSWR(searchUrl, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const getPchemblValueData = (data: IChemblData[] | undefined) => {
    if (!data || data.length === 0) return [];
    return data.map((data: IChemblData) => (data._source.pchembl_value ? parseFloat(data._source.pchembl_value) : 0));
  };

  return {
    chemblData: data,
    pchemblValueData: getPchemblValueData(data),
    loading: isLoading,
    error,
    noResults,
  };
}
