export const bfs = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = []
    const unvisitedNodes = []
    unvisitedNodes.push(startNode)

    while (unvisitedNodes.length) {
        const closestNode = unvisitedNodes.shift()

        if (closestNode.isWall) continue
        if (closestNode === finishNode) return visitedNodesInOrder

        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)

        const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid)
        for (const neighbor of unvisitedNeighbors) {
            neighbor.previousNode = closestNode
            if (!unvisitedNodes.includes(neighbor)) {
                unvisitedNodes.push(neighbor)
            }
        }
    }
    return visitedNodesInOrder
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

export default { bfs } // eslint-disable-line