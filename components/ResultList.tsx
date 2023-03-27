import React from 'react';
import styles from './ResultList.module.css';

const ResultList = ({ result }) => {
  return (
    <>
      {result &&
        result.map((name, index) => (
          <li className={styles.result} key={index}>
            {name}
          </li>
        ))}
    </>
  );
};

export default ResultList;
