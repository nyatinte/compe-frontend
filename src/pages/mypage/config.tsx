import Layout from '@/modules/components/Layout'
import Config from '@/modules/page/mypage/config/config'
import { NextPage } from 'next'

import Head from 'next/head'

const ConfigPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>設定</title>
      </Head>
      <Layout>
        <Config />
      </Layout>
    </>
  )
}

export default ConfigPage
