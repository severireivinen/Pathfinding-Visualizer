import React from 'react'
import { Button, Card } from 'react-bootstrap'
import '../styles/Footer.css'

const Footer = () => {
    const goTohub = () => {
        window.open('https://github.com/severireivinen/Pathfinding-Visualizer', '_blank').focus()
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>How to use?</Card.Title>
                <div className='tutorial-box'>
                    <div className='info-wrapper'>
                        <div className='node' id='node-start'></div>
                        <span className='info-text'>You start here</span>
                    </div>
                    <div className='info-wrapper'>
                        <div className='node' id='node-finish'></div>
                        <span className='info-text'>Finish line</span>
                    </div>
                    <div className='info-wrapper'>
                        <div className='node'></div>
                        <span className='info-text'>Unvisited Node</span>
                    </div>
                    <div className='info-wrapper'>
                        <div className='node' id='wall-node'></div>
                        <span className='info-text'>Wall Node</span>
                    </div>
                    <div className='info-wrapper'>
                        <div className='node' id='visited-node'></div>
                        <span className='info-text'>Visited Node</span>
                    </div>
                    <div className='info-wrapper'>
                        <div className='node' id='shortest-path'></div>
                        <span className='info-text'>Shortest Path</span>
                    </div>
                </div>
                <Card.Text>
                    Set start and end location by moving green and red nodes.
                    Optionally drag walls by clicking and holding mouse on unvisited nodes.
                    You can also generate a random maze.
                    Pick an algorithm from the drop-down menu and see the magic!

                </Card.Text>
                <Button onClick={goTohub} variant='primary'>GitHub project</Button>
            </Card.Body>
            <Card.Footer>
                Severi Reivinen 2021
            </Card.Footer>

        </Card>
    )
}

export default Footer