import { HeaderFragment } from '@/generated/graphql'
import { Avatar, Flex, HStack, Text } from '@chakra-ui/react'
import { FC } from 'react'
import SideBar from '../SideBar'

type HeaderProps = {
  user: HeaderFragment
}
const Header: FC<HeaderProps> = ({ user }) => {
  const { name, image } = user
  return (
    <header>
      <Flex bg='gray.200' alignItems={'center'} justifyContent='space-between' p={'3'}>
        <Text as={'h1'} fontSize='4xl'>
          ぷちこん
        </Text>
        <HStack spacing='4'>
          <Avatar name={name} src={image || 'https://bit.ly/broken-link'} />
          <SideBar />
        </HStack>
      </Flex>
    </header>
  )
}

export default Header
