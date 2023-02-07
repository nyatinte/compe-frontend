import { HeaderFragment } from '@/generated/graphql'
import { pagesPath } from '@/lib/$path'
import { Avatar, Flex, HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'
import SideBar from '../SideBar'

type HeaderProps = {
  user: HeaderFragment | null
}
const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <header>
      <Flex bg='gray.200' alignItems={'center'} justifyContent='space-between' p={'3'}>
        <Text as={'h1'} fontSize='4xl'>
          <Link href={pagesPath.$url()}>ぷちこん</Link>
        </Text>
        <HStack spacing='4'>
          <Link href={pagesPath.mypage.$url()}>
            <Avatar src={user?.image || 'https://bit.ly/broken-link'} />
          </Link>
          <SideBar />
        </HStack>
      </Flex>
    </header>
  )
}

export default Header
