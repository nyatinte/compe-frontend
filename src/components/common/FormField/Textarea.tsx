import {
  FormControl,
  FormLabel,
  forwardRef,
  TextareaProps as ChakraTextareaProps,
  Textarea as ChakraTextarea,
  FormHelperText,
} from '@chakra-ui/react'

type TextareaProps = {
  label?: string
  error?: string | undefined
  description?: string
  isRequired?: boolean
} & ChakraTextareaProps
export const Textarea = forwardRef<TextareaProps, 'textarea'>(
  ({ label, error, description, isRequired = false, ...props }, ref) => {
    return (
      <>
        <FormControl isInvalid={!!error} isRequired={isRequired} maxW={'container.sm'}>
          {label && <FormLabel color='gray.600'>{label}</FormLabel>}
          <ChakraTextarea {...props} ref={ref} />
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
