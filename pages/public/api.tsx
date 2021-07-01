import React, { useState } from 'react';
import Layout from 'layout/default';
import fetcher from 'utils/fetch';

function Api({ hello }: any) {

  const [data, setData] = useState({} as any);

  const post = async () => {
    const result = await fetcher('/api/hello', { method: 'post' });
    setData(result);
  };

  return (
    <Layout>
      <p>Testing Api</p>
      <pre>
        <code>
          {JSON.stringify(hello)}
        </code>
      </pre>
      <button onClick={() => post()}>Send Data</button>
      <pre>
        <code>
          {JSON.stringify(data)}
        </code>
      </pre>
    </Layout>
  );

}

export async function getStaticProps(props: any) {
  const hello = await fetcher('/api/hello');
  return {
    props: {
      hello
    }
  };
}

export default Api;
