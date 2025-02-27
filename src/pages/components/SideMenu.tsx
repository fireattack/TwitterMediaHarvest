import React from 'react'

import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Link, useBoolean, useBreakpointValue, VStack } from '@chakra-ui/react'
import { i18n } from '@pages/utils'
import { Link as RouterLink } from 'react-router-dom'

type MenuItemProps = {
  name: string
  target: string
  closeMenu: () => void
}

const NavItem = (props: MenuItemProps) => {
  return (
    <Link to={props.target} as={RouterLink} onClick={props.closeMenu} _hover={{ textDecoration: 'none' }}>
      <Box
        p="0.5em 0 0.5em 1.5em"
        _hover={{ bg: 'rgba(255, 255, 255, 0.33)' }}
        style={{ transition: 'background 300ms' }}
      >
        {props.name}
      </Box>
    </Link>
  )
}

type NavProps = {
  closeMenu: () => void
}

const Nav = ({ closeMenu }: NavProps) => {
  return (
    <VStack spacing={6} align="normal">
      <NavItem name={i18n('options_sidemenu_general')} target="/" closeMenu={closeMenu} />
      <NavItem name={i18n('options_sidemenu_features')} target="/features" closeMenu={closeMenu} />
      <NavItem name={i18n('options_sidemenu_integrations')} target="/integrations" closeMenu={closeMenu} />
      {/* <NavItem name="History" target="/history" />
      <NavItem name="Statistics" target="/statistics" /> */}
      <NavItem name={i18n('options_sidemenu_about')} target="/about" closeMenu={closeMenu} />
    </VStack>
  )
}

const SideMenu = () => {
  const [isActive, setActive] = useBoolean(false)

  return (
    <>
      <Box pos="fixed" top={0} zIndex={'overlay'}>
        <Flex
          pos={'fixed'}
          top={0}
          bg={'brand.bg'}
          width={'full'}
          display={useBreakpointValue({
            base: 'inherit',
            lg: 'none',
          })}
        >
          <IconButton
            aria-label="Side menu"
            size={'lg'}
            variant="ghost"
            bg="transparent"
            color="white"
            _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
            _active={{ bg: 'rgba(255, 255, 255, 0.2)' }}
            icon={<HamburgerIcon />}
            onClick={() => setActive.on()}
          />
        </Flex>
        <Box
          height={'full'}
          width={'full'}
          pos={'fixed'}
          bg={'blackAlpha.600'}
          style={{ transition: 'background 300ms' }}
          hidden={!isActive}
          onClick={() => setActive.off()}
        ></Box>
      </Box>
      <Flex
        fontSize={'1.5rem'}
        direction="column"
        width="240px"
        bg="brand.bg"
        left={useBreakpointValue({
          base: isActive ? '0px' : '-240px',
          lg: '0px',
        })}
        borderRight={useBreakpointValue({
          base: 'unset',
          lg: '1px solid gray',
        })}
        top="0"
        position={['fixed', 'fixed', 'fixed', 'relative', 'relative']}
        height={'full'}
        zIndex={'modal'}
        style={{
          transition: 'left 200ms',
        }}
        overflowX={'hidden'}
        overflowY={'auto'}
      >
        <Box height="150px" />
        <Nav closeMenu={setActive.off} />
      </Flex>
    </>
  )
}

export default SideMenu
