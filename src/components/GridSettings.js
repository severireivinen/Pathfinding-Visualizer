import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const GridSettings = ({
    clearWalls,
    clearGrid,
    visualizeAstar,
    visualizeDijkstra,
    visualizeBfs,
    visualizeGreedyBfs,
    visualizeDfs,
    visualizeBidirectionalGreedySearch,
    visualizeRandomMaze,
    visualizeHorizontalMaze,
    visualizeVerticalMaze,
    visualizeRecursiveDivision,
    updateSpeed }) => {

    const setSpeed = (speed) => {
        updateSpeed(speed)
    }
    //<NavDropdown.Item onClick={visualizeBidirectionalGreedySearch}>Bidirectional Greedy search</NavDropdown.Item>
    return (
        <Navbar bg='primary' variant='dark' expand='lg' sticky='top'>
            <Container>
                <Navbar.Brand>Pathfinding Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <NavDropdown title='Board Settings'>
                            <NavDropdown.Item onClick={clearWalls}>Clear Walls</NavDropdown.Item>
                            <NavDropdown.Item onClick={clearGrid}>Clear Path</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title='Pick an Algorithm'>
                            <NavDropdown.Item onClick={visualizeAstar}>A*</NavDropdown.Item>
                            <NavDropdown.Item onClick={visualizeDijkstra}>Dijkstra</NavDropdown.Item>
                            <NavDropdown.Item onClick={visualizeBfs}>Breadth-first Search</NavDropdown.Item>
                            <NavDropdown.Item onClick={visualizeDfs}>Depth-first Search</NavDropdown.Item>
                            <NavDropdown.Item onClick={visualizeGreedyBfs}>Greedy Best First Search</NavDropdown.Item>

                        </NavDropdown>
                        <NavDropdown title='Generate Maze'>
                            <NavDropdown.Item onClick={visualizeRandomMaze}>Random maze</NavDropdown.Item>
                            <NavDropdown.Item onClick={visualizeHorizontalMaze}>Horizontal maze</NavDropdown.Item>
                            <NavDropdown.Item onClick={visualizeVerticalMaze}>Vertical maze</NavDropdown.Item>
                            <NavDropdown.Item onClick={visualizeRecursiveDivision}>Recursive Division</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title='Select Speed'>
                            <NavDropdown.Item onClick={() => setSpeed(15)}>Slow</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setSpeed(10)}>Normal</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setSpeed(5)}>Fast</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


export default GridSettings