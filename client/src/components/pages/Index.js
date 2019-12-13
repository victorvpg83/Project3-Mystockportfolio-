import React from 'react'
import { Container, Row } from 'react-bootstrap'

import ValueMostActive from '../values/ValueMostActive'
import ValueGainers from '../values/ValueGainers'
import ValueLosers from '../values/ValueLosers'




const Index = () => {

    return (
        <Container>
            <section>

                <h1>My Stock Portfolio</h1>
                <Row>
                    <ValueMostActive />
                    <ValueGainers />
                    <ValueLosers />


                </Row>
            </section>
        </Container>
    )
}

export default Index