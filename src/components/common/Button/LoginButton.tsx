import { Button, ButtonProps } from '@chakra-ui/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { FC } from 'react'

const LoginButton: FC<ButtonProps> = (props) => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Button onClick={() => signOut()} {...props}>
          Sign out
        </Button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()} {...props}>
        Sign in
      </Button>
    </>
  )
}

export default LoginButton
