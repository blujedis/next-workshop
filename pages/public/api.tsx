import React from 'react';
import Layout from 'layout/default';
import fetcher from 'utils/fetch';

function Api({ hello }: any) {

  return (
    <Layout>
      <p>Testing Api</p>
      <pre>
        <code>
          {JSON.stringify(hello)}
        </code>
      </pre>
    </Layout>
  );

}

export async function getStaticProps() {
  const hello = await fetcher('/api/hello');
  return {
    props: {
      hello
    }
  };
}

export default Api;
