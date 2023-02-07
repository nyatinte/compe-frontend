import LoginButton from '@/components/common/Button/LoginButton'
import Loading from '@/components/common/Layout/Loading'
import { useMypageQuery } from '@/generated/graphql'
import { Title } from '@/modules/components/Text/Title'
import {
  Avatar,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { sign } from 'crypto'
import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'

export const Mypage: NextPage = () => {
  const { data: session } = useSession()
  const { data, loading, error } = useMypageQuery({
    skip: !session?.user?.id,
    variables: {
      userId: session?.user?.id as string,
    },
  })
  if (loading) {
    return <Loading />
  }
  if (error) {
    signIn()
    return <Loading />
  }
  if (!data) {
    return <Loading />
  }
  const { user } = data
  return (
    <Container maxW='container.xl'>
      <Title>マイページ</Title>
      <TableContainer border='1px' borderRadius='lg'>
        <Table>
          <Thead>
            <Tr>
              <Th>名前</Th>
              <Th>メールアドレス</Th>
              <Th>アイコン</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{user?.name}</Td>
              <Td>{user?.email}</Td>
              <Td>
                <Avatar src={user?.image || ''} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Mypage
