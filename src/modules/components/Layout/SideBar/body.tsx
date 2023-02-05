import { pagesPath } from '@/lib/$path'
import { StackDivider, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { UrlObject } from 'url'

const SideBarBody = () => {
  const links: {
    label: string
    href: UrlObject | string
  }[] = [
    {
      label: 'ホーム',
      href: pagesPath.$url(),
    },
    {
      label: 'マイページ',
      href: pagesPath.mypage.$url(),
    },
    {
      label: '設定',
      href: pagesPath.mypage.config.$url(),
    },
    {
      label: 'コンペを作る',
      href: pagesPath.competition.create.$url(),
    },
  ]
  return (
    <VStack as={'nav'} divider={<StackDivider borderColor='gray.200' />} spacing='4'>
      {links.map(({ href, label }) => (
        <Link href={href} key={label}>
          <Text cursor={'pointer'} textAlign='left'>
            {label}
          </Text>
        </Link>
      ))}
    </VStack>
  )
}

export default SideBarBody
