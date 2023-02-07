import { Button } from '@/components/common/Button/Button'
import { Input } from '@/components/common/FormField/Input'
import { RangeDatepicker } from '@/components/common/FormField/RangeDatepicker'
import { Textarea } from '@/components/common/FormField/Textarea'
import { useCreateCompetionMutation } from '@/generated/graphql'
import { CreateCompetitionInputSchema } from '@/generated/validate'
import { Title } from '@/modules/components/Text/Title'
import errorToast from '@/utils/toast/errorToast'
import successToast from '@/utils/toast/successToast'
import { invalidMessage, requiredMessage } from '@/utils/validationMessage'
import { Container, useToast, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { useRouter } from 'next/router'

// 既存のzodスキーマにルールを追加する
const schema = CreateCompetitionInputSchema()
  .extend({
    title: z.string().min(1, requiredMessage('タイトル')),
    description: z.string().min(1, requiredMessage('説明')),
    startDate: z
      .string({
        required_error: requiredMessage('開始日'),
      })
      .regex(/^\d{4}-\d{2}-\d{2}$/, invalidMessage('開始日')),
    endDate: z
      .string({
        required_error: requiredMessage('終了日'),
      })
      .regex(/^\d{4}-\d{2}-\d{2}$/, invalidMessage('終了日')),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (start >= end) {
      ctx.addIssue({
        code: 'invalid_date',
        message: '開始日は終了日より前に設定してください',
        path: ['startDate'],
      })
    }
  })

type FormFields = z.infer<typeof schema>

const CreateCompetitionPage = () => {
  const router = useRouter()
  const toast = useToast()
  const [createCompetition] = useCreateCompetionMutation({
    onCompleted: () => {
      successToast(toast, 'コンペを作成しました')
    },
    onError: (e) => {
      errorToast(toast, 'コンペの作成に失敗しました')
      console.error(e)
    },
  })
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(), new Date()])
  useEffect(() => {
    try {
      z.array(z.date()).parse(selectedDates)
      const formattedDates = selectedDates.map((date) => format(date, 'yyyy-MM-dd')) as [
        string,
        string,
      ]
      setValue('startDate', formattedDates[0])
      setValue('endDate', formattedDates[1])
    } catch (e) {
      errorToast(toast, '日付の入力に失敗しました')
    }
  }, [selectedDates])

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      schema.parse(data)
      console.log(data)
      await createCompetition({
        variables: {
          input: {
            ...data,
          },
        },
      })
      reset()
      await router.push('/competition')
    } catch (e) {
      errorToast(toast, '入力内容に誤りがあります')
      return
    }
  }
  return (
    <Container>
      <Title>コンペを作る</Title>
      <VStack as={'form'} spacing='4'>
        <Input
          isRequired
          label='コンペ名'
          placeholder='コンペのタイトルを決めましょう！'
          error={errors.title?.message}
          {...register('title')}
        />
        <Textarea
          isRequired
          label='説明'
          placeholder='データの詳細や、評価方法などを書きましょう！'
          error={errors.description?.message}
          {...register('description')}
        />
        <RangeDatepicker
          isRequired
          label='開始･終了日'
          description='一度クリックで開始日、二度目で終了日を選択できます'
          error={errors.startDate?.message || errors.endDate?.message}
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
        />
        {/* <FileUpload
          isRequired
          label='学習用データ'
          accept='.csv'
          description='CSVファイルのみアップロードできます'
          error={errors.trainDataset?.message}
          {...register('trainDataset')}
        />
        <FileUpload
          isRequired
          label='テスト用データ'
          accept='.csv'
          description='CSVファイルのみアップロードできます'
          error={errors.testDataset?.message}
          {...register('testDataset')}
        /> */}
        <Button type='submit' isLoading={isSubmitting} onClick={handleSubmit(onSubmit)}>
          作成
        </Button>
      </VStack>
    </Container>
  )
}

export default CreateCompetitionPage
