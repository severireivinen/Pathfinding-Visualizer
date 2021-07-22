import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => (
    <Navbar bg="primary" variant="dark">
        <Container>
            <Navbar.Brand href="#home">Pathfinding Visualizer</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">About</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
)

export default Header