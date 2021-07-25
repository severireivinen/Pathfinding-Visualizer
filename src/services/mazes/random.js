export const randomMaze = (grid, startNode, finishNode) => {
    const walls = []
    const allNodes = getAllNodes(grid)
    for (let node of allNodes) {
        if (node === startNode || node === finishNode) continue
        if (Math.random() < 0.33) {
            walls.push(node)
        }
    }
    walls.sort(() => Math.random() - 0.5)
    return walls
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

export default { randomMaze } // eslint-disable-line