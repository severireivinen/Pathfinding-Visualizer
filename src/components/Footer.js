import React from 'react'
import { Button, Card } from 'react-bootstrap'

const Footer = () => {
    const goTohub = () => {
        window.open('https://github.com/severireivinen', '_blank').focus()
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Thanks for stopping by!</Card.Title>
                <Card.Text>
                    Make sure to check out my GitGub page.
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