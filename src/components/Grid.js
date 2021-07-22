import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import Node from './Node'

const Grid = ({ boardWidth, boardHeigth }) => {
    const [grid, setGrid] = useState([])
    const [startRow, setStartRow] = useState(0)         // Static for now
    const [startCol, setStartCol] = useState(0)         // Static for now
    const [finishRow, setFinishRow] = useState(5)       // Static for now
    const [finishCol, setfinishCol] = useState(5)       // Static for now
    const [mouseIsPressed, setMouseIsPressed] = useState(false)
    const [startPressed, setStartPressed] = useState(false)
    const [finishPressed, setFinishPressed] = useState(false)

    useEffect(() => {
        const initialGrid = []
        for (let row = 0; row < boardWidth; row++) {
            const currenRow = []
            for (let col = 0; col < boardHeigth; col++) {
                currenRow.push(createNode(row, col))
            }
            initialGrid.push(currenRow)
        }
        setGrid(initialGrid)
    }, [boardHeigth, boardWidth])  // eslint-disable-line

    const createNode = (row, col) => {
        return {
            row,
            col,
            isWall: false,
            isStart: row === startRow && col === startCol,
            isFinish: row === finishRow && col === finishCol
        }
    }

    const updateStart = (row, col) => {
        setStartRow(row)
        setStartCol(col)
    }

    const updateFinish = (row, col) => {
        setFinishRow(row)
        setfinishCol(col)
    }

    const updateWalls = (grid, row, col) => {
        const newGrid = grid.slice()
        const node = newGrid[row][col]
        const newNode = node.isStart ? { ...node } : node.isFinish ? { ...node } : { ...node, isWall: !node.isWall }    // Make sure walls don't overwrite start or finish
        newGrid[row][col] = newNode
        return newGrid
    }

    const handleMouseDown = (row, col) => {
        //const node = grid[row][col]
        //const newGrid = node.isStart ? updateStart(grid, row, col) : node.isFinish ? updateFinish(grid, row, col) : updateWalls(grid, row, col)
        const newGrid = updateWalls(grid, row, col);
        setGrid(newGrid)
        setMouseIsPressed(true)
    }

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) {
            return
        }
        const newGrid = updateWalls(grid, row, col);
        setGrid(newGrid)
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false)
    }


    return (
        <div>
            <Container>
                {grid.map((row, rowIndex) => {
                    return (
                        <Row className='justify-content-md-center' key={rowIndex}>
                            {row.map((node, nodeIndex) => {
                                const { row, col, isWall, isStart, isFinish } = node
                                return (
                                    <Node
                                        key={nodeIndex}
                                        row={row}
                                        col={col}
                                        isWall={isWall}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        mouseIsPressed={mouseIsPressed}
                                        handleMouseDown={(row, col) => handleMouseDown(row, col)}
                                        handleMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                        handleMouseUp={() => handleMouseUp()}
                                    />
                                )
                            })}
                        </Row>
                    )
                })}
            </Container>
        </div>
    )
}

export default Grid