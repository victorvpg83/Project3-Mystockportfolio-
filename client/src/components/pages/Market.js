import React from 'react'
import { Container, Row } from 'react-bootstrap'
import ValueMarket from '../values/ValueMarket'

const Index = () => {

    return (
        <Container>
            <section>
                <h1>Market</h1>
                <Row>
                    <ValueMarket />
                </Row>
            </section>
        </Container>
    )
}

export default Index