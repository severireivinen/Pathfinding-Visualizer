import React from 'react'

const Node = ({ row, col, handleMouseDown, handleMouseEnter, handleMouseUp, isWall, isStart, isFinish }) => {

    const style = {
        width: '25px',
        height: '25px',
        outline: '1px solid black',
        background: isWall ? 'gray' : isStart ? 'green' : isFinish ? 'red' : 'white'
    }

    const handleEnter = () => {
        handleMouseEnter(row, col)
    }

    const handleDown = () => {
        handleMouseDown(row, col)
    }

    const handleUp = () => {
        handleMouseUp()
    }

    return (
        <div
            style={style}
            id={`node-${row}-${col}`}
            onMouseEnter={handleEnter}
            onMouseDown={handleDown}
            onMouseUp={handleUp}
        >
        </div>
    )
}

export default Node