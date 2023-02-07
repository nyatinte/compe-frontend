import Layout from '@/modules/components/Layout'
import CompetitionList from '@/modules/page/competition'
import Head from 'next/head'

const CompetitionPage = () => {
  return (
    <>
      <Head>
        <title>参加中のコンペティション一覧</title>
      </Head>
      <Layout>
        <CompetitionList />
      </Layout>
    </>
  )
}

export default CompetitionPage
