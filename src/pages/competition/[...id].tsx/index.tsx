import Loading from '@/components/common/Layout/Loading'
import { pagesPath } from '@/lib/$path'
import Layout from '@/modules/components/Layout'
import CompetitionDetail from '@/modules/page/competition/detail'
import errorToast from '@/utils/toast/errorToast'
import { useToast } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const CompetitionDetailPage = () => {
  const toast = useToast()
  const router = useRouter()
  const { id } = router.query
  if (!z.string().safeParse(id).success) {
    errorToast(toast, '無効なIDです。リダイレクトします')
    router.push(pagesPath.competition.$url())
    return <Loading />
  }
  return (
    <>
      <Head>
        <title>コンペティション詳細</title>
      </Head>
      <Layout>
        <CompetitionDetail id={id as string} />
      </Layout>
    </>
  )
}

export default CompetitionDetailPage
