import LoginButton from '@/components/common/Button/LoginButton'
import Layout from '@/modules/components/Layout'
import { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ぷちこん</title>
      </Head>
      <Layout>
        <LoginButton />
      </Layout>
    </>
  )
}

export default Home
