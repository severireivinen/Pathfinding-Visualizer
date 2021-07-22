import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import GridSettings from './GridSettings'
import Node from './Node'
import { dijkstra } from '../services/dijkstra'
import Togglable from './Togglable'

const Grid = () => {
    const [grid, setGrid] = useState([])
    const [startRow, setStartRow] = useState(0)
    const [startCol, setStartCol] = useState(0)
    const [finishRow, setFinishRow] = useState(5)
    const [finishCol, setfinishCol] = useState(5)
    const [currentRow, setCurrentRow] = useState(0)
    const [currentCol, setCurrentCol] = useState(0)
    const [boardWidth, setBoardWidth] = useState(15)
    const [boardHeigth, setBoardHeigth] = useState(15)

    const [mouseIsPressed, setMouseIsPressed] = useState(false)
    const [isWallNode, setIsWallNode] = useState(false)
    const [isStartNode, setIsStartNode] = useState(false)
    const [isFinishNode, setIsFinishNode] = useState(false)
    const [isRunning, setIsRunning] = useState(false)


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
            isFinish: row === finishRow && col === finishCol,
            distance: Infinity,
            distanceToFinishNode: Math.abs(finishRow - row) + Math.abs(finishCol - col),
            isVisited: false,
            previousNode: null,
            isNode: true
        }
    }

    const handleMouseDown = (row, col) => {
        if (!isRunning) {
            if (isGridClear()) {
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
            } else {
                clearGrid()
            }
        }
    }

    const handleMouseEnter = (row, col) => {
        if (mouseIsPressed) {
            const nodeClassName = document.getElementById(`node-${row}-${col}`).className;
            if (isStartNode) {
                if (nodeClassName !== 'node node-wall') {
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
                if (nodeClassName !== 'node node-wall') {
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


    const updateWalls = (grid, row, col) => {
        const newGrid = grid.slice()
        const node = newGrid[row][col]
        const newNode = node.isStart ? { ...node } : node.isFinish ? { ...node } : { ...node, isWall: !node.isWall }    // Make sure walls don't overwrite start or finish
        newGrid[row][col] = newNode
        return newGrid
    }

    const updateBoard = (width, heigth) => {
        setBoardWidth(width)
        setBoardHeigth(heigth)
    }

    const clearWalls = () => {
        const newGrid = grid.slice()
        for (const row of newGrid) {
            for (const node of row) {
                let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className
                if (nodeClassName === 'node node-wall') {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node'
                    node.isWall = false
                }
            }
        }
        setGrid(newGrid)
    }

    const clearGrid = () => {
        if (!isRunning) {
            const newGrid = grid.slice()
            for (const row of newGrid) {
                for (const node of row) {
                    let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className
                    if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish' && nodeClassName !== 'node node-wall') {

                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node'
                        node.isVisited = false
                        node.distance = Infinity
                        node.distanceToFinishNode = Math.abs(finishRow - node.row) + Math.abs(finishCol - node.col)
                    }
                    if (nodeClassName === 'node node-finish') {
                        node.isVisited = false
                        node.distance = Infinity
                        node.distanceToFinishNode = 0
                    }
                    if (nodeClassName === 'node node-start') {
                        node.isVisited = false
                        node.distance = Infinity
                        node.distanceToFinishNode = Math.abs(finishRow - node.row) + Math.abs(finishCol - node.col)
                        node.isStart = true
                        node.isWall = false
                        node.previousNode = null
                        node.isNode = true
                    }
                }
            }
        }
    }

    const isGridClear = () => {
        for (const row of grid) {
            for (const node of row) {
                const nodeClassName = document.getElementById(
                    `node-${node.row}-${node.col}`).className
                if (nodeClassName === 'node node-visited' || nodeClassName === 'node node-shortest-path') {
                    return false
                }
            }
        }
        return true
    }

    // visuals
    const visualize = (algorithm) => {
        if (!isRunning) {
            clearGrid()
            setIsRunning(true)
            const startNode = grid[startRow][startCol]
            const finishNode = grid[finishRow][finishCol]
            let visitedNodesOrdered

            switch (algorithm) {
                case 'Dijkstra':
                    visitedNodesOrdered = dijkstra(grid, startNode, finishNode)
                    break;
                default:
                    break;
            }
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
            nodesInShortestPathOrder.push('finish')
            animate(visitedNodesOrdered, nodesInShortestPathOrder)
        }
    }

    const animate = (visitedNodesOrdered, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesOrdered.length; i++) {
            if (i === visitedNodesOrdered.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder)
                }, 10 * i)
                return
            }
            setTimeout(() => {
                const node = visitedNodesOrdered[i]
                const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className
                if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish') {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
                }
            }, 10 * i)
        }
    }

    const getNodesInShortestPathOrder = (finishNode) => {
        const nodesInShortestPathOrder = []
        let currentNode = finishNode
        while (currentNode !== null) {
            nodesInShortestPathOrder.unshift(currentNode)
            currentNode = currentNode.previousNode
        }
        return nodesInShortestPathOrder
    }

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            if (nodesInShortestPathOrder[i] === 'finish') {
                setTimeout(() => {
                    setIsRunning(false)
                }, i * 50)
            } else {
                setTimeout(() => {
                    const node = nodesInShortestPathOrder[i]
                    const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className
                    if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish') {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
                    }
                }, i * 40)
            }
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
            <Container>
                <Togglable buttonLabel='Settings' className='justify-content-md-center'>
                    <GridSettings
                        updateBoard={updateBoard}
                        clearWalls={clearWalls}
                        visualize={() => visualize('Dijkstra')}
                        clearGrid={() => clearGrid()}
                    />
                </Togglable>
            </Container>
        </div>
    )
}

export default Grid