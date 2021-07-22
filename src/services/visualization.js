import { dijkstra } from "./dijkstra"

export const visualize = (algorithm, grid, startRow, startCol, finishRow, finishCol) => {
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
    nodesInShortestPathOrder.push('end')
    animate(visitedNodesOrdered, nodesInShortestPathOrder)
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
            if (!node.isStart && !node.isFinish) {
                node.className = 'node node-visited'
            }
        }, 10 * i)
    }
}

const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = []
    let currentNode = finishNode
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode)
        currentNode = currentNode.prevousNode
    }
    return nodesInShortestPathOrder
}

const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        if (nodesInShortestPathOrder[i] === 'end') {
            setTimeout(() => {
                // toggleIsRunning()
                console.log('running')
            }, i * 50)
        } else {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i]
                if (!node.isStart && !node.isFinish) {
                    node.className = 'node node-shortest-path'
                }
            }, i * 40)
        }
    }
}

export default { visualize }