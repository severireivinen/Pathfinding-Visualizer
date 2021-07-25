export const verticalMaze = (grid, startNode, finishNode) => {
    const walls = []
    const allNodes = getGrid(grid)
    let index = 0

    for (const col of allNodes) {
        index++
        const rand = Math.floor(Math.random() * (col.length))
        for (const node of col) {
            if (index % 2 === 0) {
                if (node === startNode || node === finishNode) continue
                if (col.indexOf(node) !== rand) {
                    walls.push(node)
                }
            }
        }
    }
    return walls
}

const getGrid = (grid) => {
    const newGrid = []
    for (let i = 0; i < grid[0].length; i++) {
        const currentCol = []
        for (const row of grid) {
            currentCol.push(row[i])
        }
        newGrid.push(currentCol)
    }
    return newGrid
}

export default { verticalMaze } //eslint-disable-line