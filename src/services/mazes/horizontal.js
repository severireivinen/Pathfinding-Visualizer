export const horizontalMaze = (grid, startNode, finishNode) => {
    const walls = []
    const allRows = getGridRows(grid)

    const startRow = Math.floor(Math.random() * 2)

    for (const row of allRows) {
        const path = Math.floor(Math.random() * row.length)
        if ((startRow % 2 === 0 && allRows.indexOf(row) % 2 !== 0) ||
            (startRow % 2 !== 0 && allRows.indexOf(row) % 2 === 0)) {
            for (const node of row) {
                if (node === startNode || node === finishNode) continue
                if (row.indexOf(node) !== path) {
                    walls.push(node)
                }
            }
        }
    }
    return walls
}

const getGridRows = (grid) => {
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