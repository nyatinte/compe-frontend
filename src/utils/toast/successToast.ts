import { useToast } from '@chakra-ui/react'

const successToast = (toast: ReturnType<typeof useToast>, message: string) => {
  toast({
    title: message,
    status: 'success',
    duration: 3000,
    isClosable: true,
  })
}

export default successToast
