import Loading from '@/components/common/Layout/Loading'
import { useConfigQuery, useUpdateConfigMutation } from '@/generated/graphql'
import errorToast from '@/utils/toast/errorToast'
import successToast from '@/utils/toast/successToast'
import { invalidMessage, requiredMessage } from '@/utils/validationMessage'
import { useToast, VStack } from '@chakra-ui/react'
import { useSession, signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Title } from '@/modules/components/Text/Title'
import { Input } from '@/components/common/FormField/Input'
import { UpdateUserInputSchema } from '@/generated/validate'
import { Button } from '@/components/common/Button/Button'

const schema = z.object({
  id: z.string(),
  name: z.string({
    required_error: requiredMessage('名前'),
  }),
  email: z
    .string({
      required_error: requiredMessage('メールアドレス'),
    })
    .email(invalidMessage('メールアドレス')),
  image: z.string().url(invalidMessage('画像')).nullable(),
})
type FormFields = z.infer<typeof schema>
const Config = () => {
  const toast = useToast()
  const { data: session } = useSession()
  const { data, loading, error } = useConfigQuery({
    skip: !session?.user?.id,
    variables: {
      userId: session?.user?.id as string,
    },
  })

  const [updateUser] = useUpdateConfigMutation({
    onCompleted: () => {
      successToast(toast, '更新しました')
    },
    onError: (e) => {
      errorToast(toast, '更新に失敗しました')
      console.error(e)
    },
  })

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })
  useEffect(() => {
    reset({
      ...data?.user,
    })
  }, [data?.user])

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    try {
      UpdateUserInputSchema().parse(data)
      const { id: userId, ...input } = data
      updateUser({
        variables: {
          userId,
          input,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) return <Loading />
  if (error) {
    errorToast(toast, 'エラーが発生しました')
    signIn()
    return <Loading />
  }
  if (!data?.user) {
    signIn()
    return <Loading />
  }

  return (
    <>
      <Title as={'h1'}>設定</Title>
      <VStack as={'form'} spacing='4' p={4}>
        <Input {...register('id')} hidden />
        <Input label='名前' {...register('name')} error={errors?.name?.message} />
        <Input label='メールアドレス' {...register('email')} error={errors?.email?.message} />
        <Button
          type='submit'
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          更新
        </Button>
      </VStack>
    </>
  )
}

export default Config
