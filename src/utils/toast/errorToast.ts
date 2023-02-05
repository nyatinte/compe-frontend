import { useToast } from '@chakra-ui/react'

const errorToast = (toast: ReturnType<typeof useToast>, message: string) => {
  toast({
    title: message,
    status: 'error',
    duration: 3000,
    isClosable: true,
  })
}

export default errorToast
