export const greedyBfs = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = []
    const unvisitedNodes = []
    startNode.distance = 0
    unvisitedNodes.push(startNode)

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()

        if (closestNode.isWall) continue
        if (closestNode === finishNode) return visitedNodesInOrder

        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)

        const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid)

        for (const neighbor of unvisitedNeighbors) {
            const distance = closestNode.distance + 1
            if (!unvisitedNodes.includes(neighbor)) {
                unvisitedNodes.unshift(neighbor)
                neighbor.distance = distance
                neighbor.totalDistance = manhattanDistance(neighbor, finishNode)
                neighbor.previousNode = closestNode
            } else if (distance < neighbor.distance) {
                neighbor.distance = distance
                neighbor.totalDistance = manhattanDistance(neighbor, finishNode)
                neighbor.previousNode = closestNode
            }
        }
    }
    return visitedNodesInOrder
}

const manhattanDistance = (node, finishNode) => {
    const row = Math.abs(node.row - finishNode.row)
    const col = Math.abs(node.col - finishNode.col)
    return row + col
}

const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = []
    const { row, col } = node
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    return neighbors.filter(neighbor => !neighbor.isVisited)
}

const sortNodesByDistance = (nodes) => (
    nodes.sort((a, b) => a.totalDistance - b.totalDistance)
)

export default { greedyBfs } // eslint-disable-line