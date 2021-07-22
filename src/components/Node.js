import React from 'react'

const Node = ({ row, col, handleMouseDown, handleMouseEnter, handleMouseUp, isWall, isStart, isFinish }) => {

    const style = {
        width: '25px',
        height: '25px',
        outline: '1px solid black',
        background: isWall ? 'gray' : isStart ? 'green' : isFinish ? 'red' : 'white'
    }

    return (
        <div
            style={style}
            id={`node-${row}-${col}`}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
        </div>
    )
}

export default Node