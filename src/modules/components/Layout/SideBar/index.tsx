import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'
import SideBarBody from './body'
import SideBarFooter from './footer'

const SideBar = () => {
  const { isOpen, onClose, onToggle } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <button ref={btnRef} onClick={onToggle}>
        <HamburgerIcon boxSize={'2rem'} />
      </button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>メニュー</DrawerHeader>

          <DrawerBody>
            <SideBarBody />
          </DrawerBody>

          <DrawerFooter p={0}>
            <SideBarFooter />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideBar
