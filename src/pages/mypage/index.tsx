import Layout from '@/modules/components/Layout'
import Mypage from '@/modules/page/mypage'
import { NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>マイページ</title>
      </Head>
      <Layout>
        <Mypage />
      </Layout>
    </>
  )
}

export default Page
