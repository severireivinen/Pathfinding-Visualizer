import React from 'react'
import { Button, Card } from 'react-bootstrap'

const Footer = () => {
    const goTohub = () => {
        window.open('https://github.com/severireivinen', '_blank').focus()
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>How to use?</Card.Title>
                <Card.Text>
                    Set start and end location by moving green and red nodes.
                    Optionally drag walls by clicking and holding mouse on white nodes.
                    Pick an algorithm from the dropdown menu and see the magic!
                </Card.Text>
                <Button onClick={goTohub} variant='primary'>GitHub</Button>
            </Card.Body>
            <Card.Footer>
                Severi Reivinen 2021
            </Card.Footer>

        </Card>
    )
}

export default Footer