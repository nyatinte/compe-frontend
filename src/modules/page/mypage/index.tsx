import LoginButton from '@/components/common/Button/LoginButton'
import { useMypageQuery } from '@/generated/graphql'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'

export const Mypage: NextPage = () => {
  const { data: session } = useSession()
  const { data, loading } = useMypageQuery({
    skip: !session?.user?.id,
    variables: {
      userId: session?.user?.id as string,
    },
  })
  if (loading) {
    return <div>loading...</div>
  }
  return (
    <>
      <LoginButton />
      <div>{data?.user?.name}</div>
      <div>{data?.user?.email}</div>
    </>
  )
}

export default Mypage
