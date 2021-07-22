export const dijkstra = (grid, startNode, finishNode) => {
    const visitedNotesOrdered = []

    startNode.distance = 0
    const unvisitedNodes = getAllNodes(grid)

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()

        if (!closestNode.isWall) {
            if (closestNode.distance === Infinity) return visitedNotesOrdered
            closestNode.isVisited = true
            visitedNotesOrdered.push(closestNode)
            if (closestNode === finishNode) return visitedNotesOrdered
            updateUnvisitedNeighbors(closestNode, grid)

        }
    }
}

const getAllNodes = (grid) => {
    const nodes = []
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node)
        }
    }
    return nodes
}

const sortNodesByDistance = (nodes) => (
    nodes.sort((a, b) => a.distance - b.distance)
)

const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = []
    const { row, col } = node
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid.length - 1) neighbors.push(grid[row][col + 1])
    return neighbors.filter(neighbor => !neighbor.isVisited)
}

const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1
        neighbor.previousNode = node
    }
}

export default { dijkstra }