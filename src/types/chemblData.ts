export interface IChemblData {
  _source: {
    pchembl_value: string;
    activity_id: number;
    molecule_chembl_id: number;
    canonical_smiles: string;
    _metadata: MetaData;
  };
}

export interface IChemblResponseData {
  took: number;
  timed_out: boolean;
  hits: Hits;
  _shards: {};
}

export type Hits = {
  hits: IChemblData[];
  max_score: number;
  total: {
    value: number;
    relation: string;
  };
};

export type MetaData = {
  parent_molecule_data: {
    full_mwt: string;
    alogp: string;
    num_ro5_violations: number;
  };
  document_data: {
    year: number;
  };
};
