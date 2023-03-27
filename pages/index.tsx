import ResultList from '@/components/ResultList';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [identifierInput, setIdentifierInput] = useState('');
  const [result, setResult] = useState();

  const onSubmithandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: identifierInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result.split('\n').splice(2));
      setIdentifierInput('');
      console.log(result);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>identifier Naming Box!</title>
        <link rel='icon' href='/box-logo.svg' />
      </Head>
      <main className={styles.main}>
        <Image src='/box-logo.svg' width={100} height={100} alt='로고 이미지' />
        <h1>Naming Box</h1>
        <form onSubmit={onSubmithandler}>
          <input
            type='text'
            name='identifier'
            value={identifierInput}
            onChange={(e) => {
              setIdentifierInput(e.target.value);
            }}
            placeholder='What is the role of the variable?'
          />
          <input className={styles.button} type='submit' value='Generate names ✨' />
        </form>
        <ul>
          <ResultList result={result} />
        </ul>
      </main>
    </>
  );
}
