import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// import ValueMostActive from '../values/ValueMostActive'
// import ValueGainers from '../values/ValueGainers'
// import ValueLosers from '../values/ValueLosers'
import ValueMarket from '../values/ValueMarket'

const Index = () => {

    return (
        <Container>
            <section>

                <h1>Market</h1>
                <Row>
                    {/* <ValueMostActive />
                    <ValueGainers />
                    <ValueLosers /> */}
                    <ValueMarket />
                </Row>
            </section>
        </Container>
    )
}

export default Index