import {
  FormControl,
  FormLabel,
  forwardRef,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  FormHelperText,
  Box,
  AspectRatio,
  Icon,
} from '@chakra-ui/react'
import { FaFileUpload } from 'react-icons/fa'

type FileUploadProps = {
  preview?: string
  label?: string
  error?: string | undefined
  description?: string
  isRequired?: boolean
} & Omit<ChakraInputProps, 'type' | 'hidden'>
export const FileUpload = forwardRef<FileUploadProps, 'input'>(
  ({ preview, label, error, description, isRequired = false, ...props }, ref) => {
    return (
      <>
        <FormControl isInvalid={!!error} isRequired={isRequired} maxW={'container.sm'}>
          {label && <FormLabel color='gray.600'>{label}</FormLabel>}
          <ChakraInput id='file-input' type='file' hidden {...props} ref={ref} />
          <label htmlFor='file-input' role={'button'} tabIndex={0}>
            <AspectRatio
              ratio={16 / 9}
              w='full'
              bg='gray.100'
              _hover={{ bg: 'gray.200' }}
              transition='200ms'
              rounded='md'
              overflow='hidden'
            >
              {preview ? (
                <Box as='img' src={preview} alt='preview' objectFit='cover' />
              ) : (
                <Box>
                  <Icon as={FaFileUpload} w={12} h={12} color='gray.400' />
                </Box>
              )}
            </AspectRatio>
          </label>
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
