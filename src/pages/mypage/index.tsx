import Mypage from '@/components/page/mypage'
import { NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>マイページ</title>
      </Head>
      <Mypage />
    </>
  )
}

export default Page
