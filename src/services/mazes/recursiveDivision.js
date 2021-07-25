export const recursiveDivisionMaze = (grid, startNode, finishNode) => {
    const walls = []

}

const addOuterWalls = () => {

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

export default { recursiveDivisionMaze } // eslint-disable-line