import { useMypageQuery } from '@/generated/graphql'
import { NextPage } from 'next'

export const Mypage: NextPage = () => {
  const { data, loading } = useMypageQuery({
    variables: {
      userId: 1,
    },
  })
  if (loading) {
    return <div>loading...</div>
  }
  return (
    <>
      <div>{data?.user?.name}</div>
      <div>{data?.user?.email}</div>
    </>
  )
}

export default Mypage
