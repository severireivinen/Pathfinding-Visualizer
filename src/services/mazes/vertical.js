export const verticalMaze = (grid, startNode, finishNode) => {
    const walls = []
    const allCols = getGridCols(grid)

    const startCol = Math.floor(Math.random() * 2)

    for (const col of allCols) {
        const path = Math.floor(Math.random() * col.length)
        if ((startCol % 2 === 0 && allCols.indexOf(col) % 2 !== 0) ||
            (startCol % 2 !== 0 && allCols.indexOf(col) % 2 === 0)) {
            for (const node of col) {
                if (node === startNode || node === finishNode) continue
                if (col.indexOf(node) !== path) {
                    walls.push(node)
                }
            }
        }
    }
    console.log('Walls: ', walls)
    return walls
}

const getGridCols = (grid) => {
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