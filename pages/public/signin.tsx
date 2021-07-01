import React from 'react';
import Layout from 'layout/default';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Page() {

  const [session, loading] = useSession();

  return (
    <>
      <Layout>
        {!session && <>
          <p>Not signed in </p>
          <p>
            <button onClick={() => signIn()}>Sign in</button>
          </p>

        </>}
        {session && <>
          <p>Signed in as {session?.user?.email}</p>
          <p>
            <button onClick={() => signOut()}>Sign out</button>
          </p>

        </>}
      </Layout>
    </>
  );
}