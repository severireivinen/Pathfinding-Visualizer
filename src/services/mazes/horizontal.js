export const horizontalMaze = (grid, startNode, finishNode) => {
    const walls = []
    const allNodes = getGrid(grid)
    let index = 0

    for (const row of allNodes) {
        index++
        const rand = Math.floor(Math.random() * (row.length))
        for (const node of row) {
            if (index % 2 === 0) {
                if (node === startNode || node === finishNode) continue
                if (row.indexOf(node) !== rand) {
                    walls.push(node)
                }
            }
        }
    }
    return walls
}

const getGrid = (grid) => {
    const newGrid = []
    for (const row of grid) {
        const currentRow = []
        for (const node of row) {
            currentRow.push(node)
        }
        newGrid.push(currentRow)
    }
    return newGrid
}

export default { horizontalMaze } // eslint-disable-line