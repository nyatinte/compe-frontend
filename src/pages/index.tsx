import Layout from '@/modules/components/Layout'
import { Title } from '@/modules/components/Text/Title'
import { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ぷちこん</title>
      </Head>
      <Layout>
        <Title>みんなで作るデータコンペ</Title>
      </Layout>
    </>
  )
}

export default Home
