import Loading from '@/components/common/Layout/Loading'
import { useCompetitionQuery } from '@/generated/graphql'
import { usePagination } from '@/hooks/usePagination'
import { pagesPath } from '@/lib/$path'
import { Title } from '@/modules/components/Text/Title'
import errorToast from '@/utils/toast/errorToast'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  AspectRatio,
  Badge,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  useToast,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const CompetitionList = () => {
  const toast = useToast()
  const { offset, limit, next, prev, page } = usePagination(0, 6)
  const { data: session } = useSession()
  const { data, loading, error } = useCompetitionQuery({
    skip: !session?.user?.id,
    variables: {
      userId: session?.user?.id as string,
      offset,
      limit,
    },
  })
  if (loading) return <Loading />
  if (error) {
    errorToast(toast, 'エラーが発生しました。再度お試しください。')
    console.error(error)
    return <Loading />
  }
  return (
    <Container maxW='container.xl'>
      <Title>参加中のコンペティション一覧</Title>
      {data?.user?.competitions ? (
        <>
          <Wrap spacing={4} justify='center'>
            {data.user.competitions.map(({ id, title, description, image, isOpen }) => (
              <Card
                key={id}
                w='full'
                maxW='sm'
                m='auto'
                boxShadow={'lg'}
                borderRadius={'lg'}
                borderWidth={'1px'}
                colorScheme={'blue'}
                _hover={{ opacity: 0.7 }}
                transition='all 0.2s'
              >
                <Link href={pagesPath.competition._id([id]).$url()}>
                  <CardBody>
                    <AspectRatio ratio={16 / 9}>
                      {image ? (
                        <Image src={image} alt='コンペティションの画像' w='full' />
                      ) : (
                        <Image
                          src='/noimage.png'
                          alt='NO IMAGE'
                          width={'300'}
                          height={'300'}
                          w='full'
                        />
                      )}
                    </AspectRatio>
                  </CardBody>
                  <CardFooter w='full' h='full'>
                    <VStack align={'left'} p={2} w='full' overflow={'hidden'}>
                      <HStack justify='space-between' w='full'>
                        <Text as={'h2'} fontWeight='bold' fontSize='xl'>
                          {title}
                        </Text>
                        <Badge colorScheme={isOpen ? 'green' : 'red'}>
                          {isOpen ? '募集中' : '募集終了'}
                        </Badge>
                      </HStack>
                      <Text noOfLines={3}>{description}</Text>
                    </VStack>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </Wrap>
          <HStack justify='center' mt={4}>
            <IconButton
              colorScheme={'blue'}
              aria-label='前へ'
              icon={<ChevronLeftIcon />}
              onClick={prev}
              disabled={offset === 0}
            />
            <IconButton colorScheme={'blue'} aria-label='次へ' icon={<p>{page}</p>} />
            <IconButton
              colorScheme={'blue'}
              aria-label='次へ'
              icon={<ChevronRightIcon />}
              onClick={next}
              disabled={data.user.competitions.length < limit}
            />
          </HStack>
        </>
      ) : (
        <Center w={'full'} h={'full'}>
          <Text>参加中のコンペティションはありません。</Text>
        </Center>
      )}
    </Container>
  )
}

export default CompetitionList
