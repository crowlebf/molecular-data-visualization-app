import styles from './Header.module.scss';

interface IHeaderProps {
  chemblId: string;
  results: number;
  headerData: {
    [key: string]: {
      displayName: string;
      calcValue: number;
    };
  };
}

export default function Header({ chemblId, results, headerData }: IHeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.title}>
        <h1>ChEMBL{chemblId}</h1>
        <h3>({results} results)</h3>
      </div>
      <div className={styles.stats}>
        <table>
          <tbody>
            {Object.keys(headerData).length > 0 &&
              Object.values(headerData).map((value) => (
                <tr key={value.displayName}>
                  <td className={styles.stat}>{value.displayName}</td>
                  <td className={styles.value}>{value.calcValue}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
