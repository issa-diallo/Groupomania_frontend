import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useIsLoggedIn, useLogout } from '../utils/hook'

const Header = () => {
  const logout = useLogout()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onLogoutClick = (e: React.MouseEvent<HTMLElement>): void => logout()

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Groupomania</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {useIsLoggedIn() === true ? (
            <Nav className="ms-auto">
              <Nav.Link onClick={onLogoutClick}>Deconnexion</Nav.Link>
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
