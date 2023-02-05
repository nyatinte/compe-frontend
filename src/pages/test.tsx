import { Button } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'

const Page: NextPage = () => {
  const { data: session } = useSession()
  console.log(session)

  return <></>
}

export default Page
