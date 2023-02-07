import { Button } from '@/components/common/Button/Button'
import { pagesPath } from '@/lib/$path'
import { StackDivider, Text, VStack } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UrlObject } from 'url'

export type LinkObject = {
  label: string
  href: UrlObject | string
}
const SideBarBody = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const links: LinkObject[] = [
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
    {
      label: '参加中のコンペティション一覧',
      href: pagesPath.competition.$url(),
    },
  ]
  const handleClickSignOut = async () => {
    await router.push(pagesPath.$url())
    await signOut()
  }
  return (
    <VStack as={'nav'} divider={<StackDivider borderColor='gray.200' />} spacing='4'>
      {session ? (
        links.map(({ href, label }) => (
          <Link href={href} key={label}>
            <Text cursor={'pointer'} textAlign='left'>
              {label}
            </Text>
          </Link>
        ))
      ) : (
        <Button colorScheme={'blue'} w='50%' onClick={() => signIn()}>
          ログイン
        </Button>
      )}
      <Button colorScheme={'gray'} w='50%' onClick={handleClickSignOut}>
        ログアウト
      </Button>
    </VStack>
  )
}

export default SideBarBody
