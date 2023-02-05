import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react'
import {
  RangeDatepicker as ChakraRangeDatepicker,
  RangeDatepickerProps as ChakraRangeDatepickerProps,
} from 'chakra-dayzed-datepicker'
import { FC } from 'react'

type RangeDatepickerProps = {
  label?: string
  error?: string | undefined
  description?: string
  isRequired?: boolean
} & ChakraRangeDatepickerProps

export const RangeDatepicker: FC<RangeDatepickerProps> = ({
  label,
  error,
  description,
  isRequired = false,
  ...props
}) => {
  const configs: RangeDatepickerProps['configs'] = {
    dateFormat: 'yyyy/MM/dd',
    dayNames: ['日', '月', '火', '水', '木', '金', '土'],
    monthNames: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    firstDayOfWeek: 0,
  }
  const propsConfigs: ChakraRangeDatepickerProps['propsConfigs'] = {
    dateNavBtnProps: {
      colorScheme: 'blue',
      variant: 'outline',
    },
    dayOfMonthBtnProps: {
      defaultBtnProps: {
        colorScheme: 'blue',
        _hover: {
          background: 'blue.400',
        },
      },
      isInRangeBtnProps: {
        background: 'blue.100',
      },
      selectedBtnProps: {
        background: 'blue.200',
        color: 'black',
      },
      todayBtnProps: {
        background: 'teal.100',
      },
    },
  }
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} maxW={'container.sm'}>
      {label && <FormLabel color='gray.600'>{label}</FormLabel>}
      <ChakraRangeDatepicker propsConfigs={propsConfigs} configs={configs} {...props} />
      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        <FormHelperText>{description}</FormHelperText>
      )}
    </FormControl>
  )
}
