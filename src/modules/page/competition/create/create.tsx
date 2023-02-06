import { Button } from '@/components/common/Button/Button'
import { FileUpload } from '@/components/common/FormField/FileUpload'
import { Input } from '@/components/common/FormField/Input'
import { RangeDatepicker } from '@/components/common/FormField/RangeDatepicker'
import { Textarea } from '@/components/common/FormField/Textarea'
import { Title } from '@/modules/components/Text/Title'
import errorToast from '@/utils/toast/errorToast'
import { requiredMessage } from '@/utils/validationMessage'
import { Container, useToast, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  title: z
    .string({
      required_error: requiredMessage('名前'),
    })
    .max(50, '50文字以内で入力してください'),
  description: z.string({
    required_error: requiredMessage('説明'),
  }),
  image: z.union([z.string().url(), z.custom<File>((v) => v instanceof File)]).optional(),
  startDate: z.date({ required_error: requiredMessage('開始日') }),
  endDate: z.date({ required_error: requiredMessage('終了日') }),
  trainDataset: z.union([z.string().url(), z.custom<File>((v) => v instanceof File)]),
  testDataset: z.union([z.string().url(), z.custom<File>((v) => v instanceof File)]),
})
type FormFields = z.infer<typeof schema>

const CreateCompetitionPage = () => {
  const toast = useToast()
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
      setValue('startDate', selectedDates[0] as Date)
      setValue('endDate', selectedDates[1] as Date)
    } catch (e) {
      errorToast(toast, '日付の入力に失敗しました')
    }
  }, [selectedDates])

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data)
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
        <FileUpload
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
        />
        <Button type='submit' isLoading={isSubmitting} onClick={handleSubmit(onSubmit)} />
      </VStack>
    </Container>
  )
}

export default CreateCompetitionPage
