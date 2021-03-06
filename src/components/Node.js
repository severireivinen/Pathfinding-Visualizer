import React from 'react'
import '../styles/Node.css'

const Node = ({ row, col, handleMouseDown, handleMouseEnter, handleMouseUp, isWall, isStart, isFinish }) => {


    const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : ''

    return (
        <td
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
        </td>
    )
}

export default Node