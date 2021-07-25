import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import '../styles/Grid.css'
import GridSettings from './GridSettings'
import Node from './Node'
import { dijkstra } from '../services/algorithms/dijkstra'
import { astar } from '../services/algorithms/astar'
import { randomMaze } from '../services/mazes/random'
import { horizontalMaze } from '../services/mazes/horizontal'
import { verticalMaze } from '../services/mazes/vertical'
import { bfs } from '../services/algorithms/breadthFirstSearch'
import { greedyBfs } from '../services/algorithms/greedyBestFirstSearch'


const ROW_COUNT = 25
const COL_COUNT = 43

const Grid = () => {
    const [grid, setGrid] = useState([])
    const [startRow, setStartRow] = useState(0)
    const [startCol, setStartCol] = useState(0)
    const [finishRow, setFinishRow] = useState(5)
    const [finishCol, setfinishCol] = useState(7)
    const [currentRow, setCurrentRow] = useState(0)
    const [currentCol, setCurrentCol] = useState(0)
    const [speed, setSpeed] = useState(10)

    const [mouseIsPressed, setMouseIsPressed] = useState(false)
    const [isWallNode, setIsWallNode] = useState(false)
    const [isStartNode, setIsStartNode] = useState(false)
    const [isFinishNode, setIsFinishNode] = useState(false)
    const [isRunning, setIsRunning] = useState(false)


    useEffect(() => {
        const initialGrid = []
        for (let row = 0; row < ROW_COUNT; row++) {
            const currenRow = []
            for (let col = 0; col < COL_COUNT; col++) {
                currenRow.push(createNode(row, col))
            }
            initialGrid.push(currenRow)
        }
        setGrid(initialGrid)
    }, []) //eslint-disable-line

    const createNode = (row, col) => {
        return {
            row,
            col,
            isWall: false,
            isStart: row === startRow && col === startCol,
            isFinish: row === finishRow && col === finishCol,
            distance: Infinity,
            totalDistance: Infinity,
            isVisited: false,
            previousNode: null,
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

    const updateMaze = (grid, walls) => {
        const newGrid = grid.slice()
        for (const wall of walls) {
            const node = grid[wall.row][wall.col]
            const newNode = { ...node, isWall: true }
            newGrid[wall.row][wall.col] = newNode
        }
        return newGrid
    }

    const updateSpeed = (newSpeed) => {
        setSpeed(Number(newSpeed))
    }

    const clearWalls = () => {
        const newGrid = grid.slice()
        for (const row of newGrid) {
            for (const node of row) {
                let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className
                if (nodeClassName === 'node node-wall' || nodeClassName === 'node node-wall-animated') {
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
                    if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish' && nodeClassName !== 'node node-wall' && nodeClassName !== 'node node-wall-animated') {

                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node'
                        node.isVisited = false
                        node.distance = Infinity
                        node.totalDistance = Infinity
                    }
                    if (nodeClassName === 'node node-finish') {
                        node.isVisited = false
                        node.distance = Infinity
                        node.totalDistance = Infinity
                        node.distanceToFinishNode = 0
                    }
                    if (nodeClassName === 'node node-start') {
                        node.isVisited = false
                        node.distance = Infinity
                        node.totalDistance = Infinity
                        node.isStart = true
                        node.previousNode = null
                    }
                }
            }
            setGrid(newGrid)
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
        if (isRunning === false) {
            clearGrid()
            setIsRunning(true)
            const startNode = grid[startRow][startCol]
            const finishNode = grid[finishRow][finishCol]
            let visitedNodesOrdered

            switch (algorithm) {
                case 'Dijkstra':
                    visitedNodesOrdered = dijkstra(grid, startNode, finishNode)
                    break
                case 'Astar':
                    visitedNodesOrdered = astar(grid, startNode, finishNode)
                    break
                case 'Bfs':
                    visitedNodesOrdered = bfs(grid, startNode, finishNode)
                    break
                case 'GreedyBfs':
                    visitedNodesOrdered = greedyBfs(grid, startNode, finishNode)
                    break
                default:
                    break
            }
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
            nodesInShortestPathOrder.push('finish')
            animateAlgorithm(visitedNodesOrdered, nodesInShortestPathOrder)
        }
    }

    const visualizeMaze = (maze) => {
        if (isRunning === false) {
            clearGrid()
            setIsRunning(true)
            const startNode = grid[startRow][startCol]
            const finishNode = grid[finishRow][finishCol]
            let walls

            switch (maze) {
                case 'Random':
                    walls = randomMaze(grid, startNode, finishNode)
                    break
                case 'Horizontal':
                    walls = horizontalMaze(grid, startNode, finishNode)
                    break
                case 'Vertical':
                    walls = verticalMaze(grid, startNode, finishNode)
                    break
                default:
                    break
            }
            animateMaze(walls)
        }
    }

    const animateMaze = (walls) => {
        clearWalls()
        clearGrid()
        for (let i = 0; i <= walls.length; i++) {
            if (i === walls.length) {
                setTimeout(() => {
                    const newGrid = updateMaze(grid, walls)
                    setGrid(newGrid)
                    setIsRunning(false)
                }, i * speed)
                return
            }
            const wall = walls[i]
            const node = grid[wall.row][wall.col]
            setTimeout(() => {
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-wall-animated'
            }, i * speed)
        }
    }

    const animateAlgorithm = (visitedNodesOrdered, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesOrdered.length; i++) {
            if (i === visitedNodesOrdered.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder)
                }, i * speed)
                return
            }
            setTimeout(() => {
                const node = visitedNodesOrdered[i]
                const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className
                if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish') {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
                }
            }, i * speed)
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
                }, i * speed * 5)
            } else {
                setTimeout(() => {
                    const node = nodesInShortestPathOrder[i]
                    const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className
                    if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish') {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
                    }
                }, i * speed * 4)
            }
        }
    }


    return (
        <Container className='grid'>

            <GridSettings
                clearWalls={clearWalls}
                visualizeDijkstra={() => visualize('Dijkstra')}
                visualizeAstar={() => visualize('Astar')}
                visualizeBfs={() => visualize('Bfs')}
                visualizeGreedyBfs={() => visualize('GreedyBfs')}
                visualizeRandomMaze={() => visualizeMaze('Random')}
                visualizeHorizontalMaze={() => visualizeMaze('Horizontal')}
                visualizeVerticalMaze={() => visualizeMaze('Vertical')}
                clearGrid={() => clearGrid()}
                updateSpeed={updateSpeed}
            />
            <Table responsive className='grid-container'>
                <tbody className='grid'>
                    {grid.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
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
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}

export default Grid