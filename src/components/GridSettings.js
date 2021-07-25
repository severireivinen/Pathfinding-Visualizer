import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const GridSettings = ({ clearWalls, clearGrid, visualizeAstar, visualizeDijkstra, visualizeRandomMaze, visualizeHorizontalMaze, visualizeVerticalMaze }) => (
    <Navbar bg='primary' variant='dark' expand='lg' sticky='top'>
        <Container>
            <Navbar.Brand>Pathfinding Visualizer</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                    <NavDropdown title='Board Settings'>
                        <NavDropdown.Item onClick={clearWalls}>Clear Walls</NavDropdown.Item>
                        <NavDropdown.Item onClick={clearGrid}>Clear Grid</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title='Pick an Algorithm'>
                        <NavDropdown.Item onClick={visualizeAstar}>A*</NavDropdown.Item>
                        <NavDropdown.Item onClick={visualizeDijkstra}>Dijkstra</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title='Maze Settings'>
                        <NavDropdown.Item onClick={visualizeRandomMaze}>Random maze</NavDropdown.Item>
                        <NavDropdown.Item onClick={visualizeHorizontalMaze}>Horizontal maze</NavDropdown.Item>
                        <NavDropdown.Item onClick={visualizeVerticalMaze}>Vertical maze</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)

export default GridSettings