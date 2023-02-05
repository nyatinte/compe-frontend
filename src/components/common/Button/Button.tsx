import { ButtonProps as ChakraButtonProps, Button as ChakraButton } from '@chakra-ui/react'
type ButtonProps = {} & ChakraButtonProps
export const Button = (props: ButtonProps) => {
  return <ChakraButton {...props} />
}
