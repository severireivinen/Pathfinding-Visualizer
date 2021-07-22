import React, { useState } from 'react'
import { Button, ButtonGroup, Form } from 'react-bootstrap'

const GridSettings = ({ updateBoard, clearWalls, visualize, clearGrid }) => {
    const [width, setWidth] = useState('')
    const [heigth, setHeigth] = useState('')

    const submit = (event) => {
        event.preventDefault()
        updateBoard(width, heigth)
        setWidth('')
        setHeigth('')

    }

    return (
        <div>
            <h1>Pathfinder</h1>
            <div>
                <ButtonGroup aria-label="Settings for grid">
                    <Button onClick={clearWalls} variant='secondary'>Clear Walls</Button>
                    <Button onClick={clearGrid} variant='secondary'>Clear Grid</Button>
                    <Button onClick={visualize} variant='secondary'>Visualize!</Button>
                </ButtonGroup>
            </div>
            <div>
                <h2>Board size</h2>
                <Form onSubmit={submit}>
                    <Form.Group>
                        <Form.Label>Board Width:</Form.Label>
                        <Form.Control
                            type='number'
                            value={width}
                            onChange={(event) => setWidth(event.target.value)}
                        />
                        <Form.Label>Board Heigth:</Form.Label>
                        <Form.Control
                            type='number'
                            value={heigth}
                            onChange={(event) => setHeigth(event.target.value)}
                        />
                        <Button variant='primary' type='submit'>Update</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>

    )
}

export default GridSettings