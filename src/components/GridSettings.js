import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const GridSettings = ({ clearWalls, clearGrid, visualizeAstar, visualizeDijkstra }) => (
    <Navbar bg='primary' variant='dark' expand='lg' sticky='top'>
        <Container>
            <Navbar.Brand>Pathfinding Visualizer</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link onClick={clearWalls}>Clear Walls</Nav.Link>
                    <Nav.Link onClick={clearGrid}>Clear Grid</Nav.Link>
                    <Nav.Link onClick={visualizeAstar}>Astar!</Nav.Link>
                    <Nav.Link onClick={visualizeDijkstra}>Dijkstra!</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)

export default GridSettings