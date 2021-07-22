import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import Node from './Node'

const Grid = ({ boardWidth, boardHeigth }) => {
    const [grid, setGrid] = useState([])
    const [startRow, setStartRow] = useState(0)
    const [startCol, setStartCol] = useState(0)
    const [finishRow, setFinishRow] = useState(5)
    const [finishCol, setfinishCol] = useState(5)
    const [currentRow, setCurrentRow] = useState(0)
    const [currentCol, setCurrentCol] = useState(0)

    const [mouseIsPressed, setMouseIsPressed] = useState(false)
    const [isWallNode, setIsWallNode] = useState(false)
    const [isStartNode, setIsStartNode] = useState(false)
    const [isFinishNode, setIsFinishNode] = useState(false)


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

    const updateWalls = (grid, row, col) => {
        const newGrid = grid.slice()
        const node = newGrid[row][col]
        const newNode = node.isStart ? { ...node } : node.isFinish ? { ...node } : { ...node, isWall: !node.isWall }    // Make sure walls don't overwrite start or finish
        newGrid[row][col] = newNode
        return newGrid
    }

    const handleMouseDown = (row, col) => {
        const node = grid[row][col]
        if (node.isStart) {
            setMouseIsPressed(true)
            setIsStartNode(true)
            setCurrentRow(row)
            setCurrentCol(col)
        } else if (node.isFinish) {
            setMouseIsPressed(true)
            setIsFinishNode(true)
            setCurrentRow(row)
            setCurrentCol(col)
        } else {
            const newGrid = updateWalls(grid, row, col);
            setGrid(newGrid)
            setMouseIsPressed(true)
            setIsWallNode(true)
            setCurrentRow(row)
            setCurrentCol(col)
        }
    }

    const handleMouseEnter = (row, col) => {
        if (mouseIsPressed) {
            const node = grid[row][col]
            if (isStartNode) {
                if (!node.isWall) {
                    const previousStartNode = grid[currentRow][currentCol]
                    previousStartNode.isStart = false
                    setCurrentRow(row)
                    setCurrentCol(col)
                    const newStartNode = grid[row][col]
                    newStartNode.isStart = true
                }
                setStartRow(row)
                setStartCol(col)
            } else if (isFinishNode) {
                if (!node.isWall) {
                    const previousFinishNode = grid[currentRow][currentCol]
                    previousFinishNode.isFinish = false
                    setCurrentRow(row)
                    setCurrentCol(col)
                    const newFinishNode = grid[row][col]
                    newFinishNode.isFinish = true
                }
                setFinishRow(row)
                setfinishCol(col)
            } else if (isWallNode) {
                const newGrid = updateWalls(grid, row, col);
                setGrid(newGrid)
            }
        }
    }

    const handleMouseUp = (row, col) => {
        setMouseIsPressed(false)
        if (isStartNode) {
            setIsStartNode(!isStartNode)
            setStartRow(row)
            setStartCol(col)
        } else if (isFinishNode) {
            setIsFinishNode(!isFinishNode)
            setFinishRow(row)
            setfinishCol(col)
        }
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
                                        handleMouseDown={() => handleMouseDown(row, col)}
                                        handleMouseEnter={() => handleMouseEnter(row, col)}
                                        handleMouseUp={() => handleMouseUp(row, col)}
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