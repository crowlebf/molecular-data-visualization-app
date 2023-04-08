import styles from './Smiles.module.scss';
import MoleculeStructure from './MoleculeStructure';
import { IChemblData } from '../../types/chemblData';

interface ISmilesProps {
  data: IChemblData[];
}

export default function Smiles({ data }: ISmilesProps) {
  return (
    <ul className={styles.smilesContainer}>
      {data.map((data: IChemblData) => (
        <li key={data._source.activity_id} className={styles.smilesItem}>
          <div className={styles.smilesTitle}>{data._source.molecule_chembl_id}</div>
          <div className={styles.smilesImage}>
            <MoleculeStructure structure={data._source.canonical_smiles} width={250} height={200} />
          </div>
        </li>
      ))}
    </ul>
  );
}
