import {
  FormControl,
  FormLabel,
  forwardRef,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  FormHelperText,
} from '@chakra-ui/react'

type InputProps = {
  label?: string
  error?: string | undefined
  description?: string
  isRequired?: boolean
} & ChakraInputProps
export const Input = forwardRef<InputProps, 'input'>(
  ({ label, error, description, isRequired = false, ...props }, ref) => {
    return (
      <>
        <FormControl isInvalid={!!error} isRequired={isRequired} maxW={'container.sm'}>
          {label && <FormLabel color='gray.600'>{label}</FormLabel>}
          <ChakraInput colorScheme={'blue'} {...props} ref={ref} />
          {error ? (
            <FormHelperText color='red.500'>{error}</FormHelperText>
          ) : (
            <FormHelperText>{description}</FormHelperText>
          )}
        </FormControl>
      </>
    )
  },
)
