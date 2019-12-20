import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


import ValueMostActive from '../values/ValueMostActive'
import ValueGainers from '../values/ValueGainers'
import ValueLosers from '../values/ValueLosers'




const Index = () => {

    return (
        <Container>
            <section>

                <h1 className='iH1 txtS' >My Stock Portfolio</h1>
                <Row>
                    <Col className="table-index" md={5}>
                        <div className='iDiv'>
                        <h4>Incrementa los beneficios de tus inversiones utilizando nuestros servicios de datos y registros de operaciones</h4>
                        <img className='iImg' src={'https://res.cloudinary.com/de7pqle35/image/upload/v1576747303/mygoodportfolio/growth-3078544_1280_zo3sgm.png'} ></img>
                        </div>
                        <p className='iP'>Te facilitamos herramientas fáciles de utilizar, que te ayudaran a mejorar en tus decisiones</p>
                    </Col>
                    <Col className="table-index" md={7}>
                        <h3>Ganadores / Perdedores</h3>
                        <ValueGainers />
                        <ValueLosers />
                    </Col>



                </Row>
            </section>
        </Container>
    )
}

export default Index