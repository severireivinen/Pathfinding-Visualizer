import React, { useState } from 'react'
import Grid from './Grid'
import GridSettings from './GridSettings'

const Board = () => {
    const [boardWidth, setBoardWidth] = useState(15)    //eslint-disable-line
    const [boardHeigth, setBoardHeigth] = useState(15)  //eslint-disable-line

    const updateBoard = (width, heigth) => {
        setBoardWidth(width)
        setBoardHeigth(heigth)
    }

    return (
        <div>
            <GridSettings
                updateBoard={updateBoard}
            />
            <Grid
                boardWidth={boardWidth}
                boardHeigth={boardHeigth}
            />
        </div>
    )
}

export default Board