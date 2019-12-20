import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import ValueMarket from '../values/ValueMarket'
import ValueMostActive from '../values/ValueMostActive'
import ValueIndexes from '../values/ValueIndexes'
import ValueSectors from '../values/ValueSectors'

const Index = () => {

    return (
        <Container>
            <section>
                <h1 className='txtS' >Mercado</h1>
                <Row>
                    <Col md={6}>
                    <ValueMarket />
                    </Col>
                    <Col md={6}>
                    <ValueMostActive />
                    <ValueIndexes/>
                    <ValueSectors/>
                    </Col>

                </Row>
            </section>
        </Container>
    )
}

export default Index