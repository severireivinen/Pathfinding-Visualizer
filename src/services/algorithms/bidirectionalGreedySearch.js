export const bidirectionalGreedySearch = (grid, startNode, finishNode) => {
    const visitedNodesInOrderStart = []
    const visitedNodesInOrderFinish = []
    const unvisitedNodesStart = []
    const unvisitedNodesFinish = []
    startNode.distance = 0
    finishNode.distance = 0
    unvisitedNodesStart.push(startNode)
    unvisitedNodesFinish.push(finishNode)

    while (unvisitedNodesStart.length && unvisitedNodesFinish.length) {
        sortNodesByDistance(unvisitedNodesStart)
        sortNodesByDistance(unvisitedNodesFinish)
        const closestNodeStart = unvisitedNodesStart.shift()
        const closestNodeFinish = unvisitedNodesFinish.shift()

        //if (closestNodeStart.isWall || closestNodeFinish.isWall) continue
        if (isNeighbors(closestNodeStart, closestNodeFinish)) return [visitedNodesInOrderStart, visitedNodesInOrderFinish]

        closestNodeStart.isVisited = true
        closestNodeFinish.isVisited = true
        visitedNodesInOrderStart.push(closestNodeStart)
        visitedNodesInOrderFinish.push(closestNodeFinish)

        //Search
        const unvisitedNeighborsStart = getUnvisitedNeighbors(closestNodeStart, grid)
        const unvisitedNeighborsFinish = getUnvisitedNeighbors(closestNodeFinish, grid)

        for (const neighbor of unvisitedNeighborsStart) {
            const distance = closestNodeStart.distance + 1
            if (unvisitedNodesFinish.includes(neighbor)) {
                visitedNodesInOrderStart.push(closestNodeStart)
                visitedNodesInOrderFinish.push(neighbor)
                return [visitedNodesInOrderStart, visitedNodesInOrderFinish]
            }
            if (!unvisitedNodesStart.includes(neighbor)) {
                unvisitedNodesStart.unshift(neighbor)
                neighbor.distance = distance
                neighbor.totalDistance = manhattanDistance(neighbor, finishNode)
                neighbor.previousNode = closestNodeStart
            } else if (distance < neighbor.distance) {
                neighbor.distance = distance
                neighbor.totalDistance = manhattanDistance(neighbor, finishNode)
                neighbor.previousNode = closestNodeStart
            }
        }

        for (const neighbor of unvisitedNeighborsFinish) {
            const distance = closestNodeFinish.distance + 1
            if (unvisitedNodesStart.includes(neighbor)) {
                visitedNodesInOrderStart.push(closestNodeFinish)
                visitedNodesInOrderStart.push(neighbor)
                return [visitedNodesInOrderStart, visitedNodesInOrderFinish]
            }
            if (!unvisitedNodesFinish.includes(neighbor)) {
                unvisitedNodesFinish.unshift(neighbor)
                neighbor.distance = distance
                neighbor.totalDistance = manhattanDistance(neighbor, startNode)
                neighbor.previousNode = closestNodeFinish
            } else if (distance < neighbor.distance) {
                neighbor.distance = distance
                neighbor.totalDistance = manhattanDistance(neighbor, startNode)
                neighbor.previousNode = closestNodeFinish
            }
        }
    }
    return [visitedNodesInOrderStart, visitedNodesInOrderFinish]
}

const isNeighbors = (nodeA, nodeB) => {
    if (nodeA.row === nodeB.row && nodeA.col === nodeB.col) return true
    return false
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
    return neighbors.filter(neighbor => !neighbor.isWall && !neighbor.isVisited)
}

const sortNodesByDistance = (nodes) => (
    nodes.sort((a, b) => a.totalDistance - b.totalDistance)
)

export default { bidirectionalGreedySearch } // eslint-disable-line