let walls = []

export const recursiveDivisionMaze = (grid, startNode, finishNode) => {
    const vertical = range(grid[0].length)   // Vertical
    const horizontal = range(grid.length)   // Horizontal
    walls = []
    divide(vertical, horizontal, startNode, finishNode)
    console.log('Walls End: ', walls)
    return walls

}

// Main function
const divide = (vertical, horizontal, startNode, finishNode) => {
    if (vertical.length < 2 || horizontal.length < 2) return

    const direction = chooseOrientation(horizontal, vertical)   // 0=Horizontal 1=Vertical
    const startIndex = direction === 0 ? randomArrayElement(vertical) : randomArrayElement(horizontal)

    if (direction === 0) {
        addWalls(direction, startIndex, vertical, horizontal, startNode, finishNode)

        divide(vertical.slice(0, vertical.indexOf(startIndex)), horizontal, startNode, finishNode)
        divide(vertical.slice(vertical.indexOf(startIndex) + 1), horizontal, startNode, finishNode)
    } else {
        addWalls(direction, startIndex, vertical, horizontal, startNode, finishNode)

        divide(vertical, horizontal.slice(0, horizontal.indexOf(startIndex)), startNode, finishNode)
        divide(vertical, horizontal.slice(horizontal.indexOf(startIndex) + 1), startNode, finishNode)
    }
}


// Implemented differently than other maze algorithms. Not looping objects, instead creating them based on two values
const addWalls = (direction, startIndex, vertical, horizontal, startNode, finishNode) => {
    let tempWalls = []
    let startOrFinish = false

    if (direction === 0) {  // Horizontal
        for (const element of horizontal) {
            if ((element === startNode.row && startIndex === startNode.col) || (element === finishNode.row && startIndex === finishNode.col)) {
                startOrFinish = true
                continue
            }
            tempWalls.push({ row: element, col: startIndex })
        }
    } else {    // Vertical
        for (const element of vertical) {
            if ((startIndex === startNode.row && element === startNode.col) || (startIndex === finishNode.row && element === finishNode.col)) {
                startOrFinish = true
                continue
            }
            tempWalls.push({ row: startIndex, col: element })
        }
    }
    if (!startOrFinish) {
        tempWalls.splice(generateRandomNumber(tempWalls.length), 1)
    }
    for (const wall of tempWalls) {
        walls.push(wall)
    }
}

const generateRandomNumber = (max) => {
    let randomNum =
        Math.floor(Math.random() * (max / 2)) +
        Math.floor(Math.random() * (max / 2));
    if (randomNum % 2 !== 0) {
        if (randomNum === max) {
            randomNum -= 1;
        } else {
            randomNum += 1;
        }
    }
    return randomNum;
}

const range = (len) => {
    let result = []
    for (let i = 0; i < len; i++) {
        result.push(i)
    }
    return result
}

const randomArrayElement = (array) => {
    const max = array.length - 1
    let randomNum = Math.floor(Math.random() * (max / 2)) + Math.floor(Math.random() * (max / 2))
    if (randomNum % 2 === 0) {
        if (randomNum === max) {
            randomNum -= 1
        } else {
            randomNum += 1
        }
    }
    return array[randomNum]
}

const chooseOrientation = (horizontal, vertical) => {
    if (horizontal.length < vertical.length) {
        return 0 // Horizontal
    } else if (vertical.length < horizontal.length) {
        return 1 // Vertical
    } else {
        return Math.floor(Math.random() * 2) === 0 ? 0 : 1
    }
}

export default { recursiveDivisionMaze } // eslint-disable-line