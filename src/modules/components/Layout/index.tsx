import Loading from '@/components/common/Layout/Loading'
import { HeaderFragment, useLayoutQuery } from '@/generated/graphql'
import { Container } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { FC } from 'react'
import Header from './Header'

type LayoutProps = {
  children: React.ReactNode
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession()
  const { data, loading } = useLayoutQuery({
    skip: !session?.user?.id,
    variables: {
      userId: session?.user?.id as string,
    },
  })

  if (loading) return <Loading />
  return (
    <>
      <Header user={data?.user as HeaderFragment} />
      <Container maxW='container.xl' as='main'>
        {children}
      </Container>
    </>
  )
}

export default Layout
