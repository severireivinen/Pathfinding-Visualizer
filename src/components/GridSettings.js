import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const GridSettings = ({ updateBoard }) => {
    const [width, setWidth] = useState('')
    const [heigth, setHeigth] = useState('')

    const style = {
        'textAlign': 'center',
        'margin': '5px',
    }

    const submit = (event) => {
        event.preventDefault()
        updateBoard(width, heigth)
        setWidth('')
        setHeigth('')

    }

    return (
        <div style={style}>
            <h1>Pathfinder</h1>
            <div>
                <button>Start</button>
                <button>Finish</button>
                <button>Wall</button>
                <div>Currently selected:</div>

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