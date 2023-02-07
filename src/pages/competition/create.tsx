import { NextPage } from 'next'
import CreateCompetitionPage from '@/modules/page/competition/create'
import Head from 'next/head'
import Layout from '@/modules/components/Layout'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>コンペ作成</title>
      </Head>
      <Layout>
        <CreateCompetitionPage />
      </Layout>
    </>
  )
}

export default Page
