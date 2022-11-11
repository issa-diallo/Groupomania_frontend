import React from 'react'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useIsLoggedIn, useLogout } from '../utils/hook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const logout = useLogout()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onLogoutClick = (e: React.MouseEvent<HTMLElement>): void => {
    logout()
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image
            width="100"
            height="90"
            className="d-inline-block align-top"
            src="/icon-left-font-monochrome-white.png"
            alt="Logo groupomania"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {useIsLoggedIn() === true ? (
            <Nav className="ms-auto">
              <Nav.Link href="/profile">
                <FontAwesomeIcon icon={faUser} />
                Profile
              </Nav.Link>
              <Nav.Link onClick={onLogoutClick}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Deconnexion
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link href="/register">Inscription</Nav.Link>
              <Nav.Link href="/login">Connexion</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
