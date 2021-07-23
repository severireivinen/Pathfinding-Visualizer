import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

const GridSettings = ({ clearWalls, clearGrid, visualizeAstar, visualizeDijkstra }) => {
    return (
        <div>
            <h1>Pathfinder</h1>
            <div>
                <ButtonGroup aria-label="Settings for grid">
                    <Button onClick={clearWalls} variant='secondary'>Clear Walls</Button>
                    <Button onClick={clearGrid} variant='secondary'>Clear Grid</Button>
                    <Button onClick={visualizeAstar} variant='secondary'>Astar!</Button>
                    <Button onClick={visualizeDijkstra} variant='secondary'>Dijkstra!</Button>
                </ButtonGroup>
            </div>
        </div>

    )
}

export default GridSettings