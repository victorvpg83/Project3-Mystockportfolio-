import React from 'react'
import Service from '../../service/Value_service'

import { Container, Row, Col } from 'react-bootstrap'
import CalendarMarkets from '../values/CalendarMarket '


class Profile extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            
        }
    }
    
    
    render() {

        return (
            <section>
                <Container>
                    <Row>
                        <Col className="table-index" md={6}>
                            <h1 className='txtS'>Perfil {this.props.loggedInUser.username}</h1>
                            <h5> Nombre y apellidos:</h5>
                            <p className='pProfile bckg shadow'>{this.props.loggedInUser.lastName}</p>
                            <h5>Teléfono:</h5>
                            <p className='pProfile bckg shadow'>{this.props.loggedInUser.phone}</p>
                            <h5>Dirección:</h5>
                            <p className='pProfile bckg shadow'>{this.props.loggedInUser.direction}</p>

                        </Col>
                        <Col md={6}>
                        <img className='imgProf shadow' src={'https://res.cloudinary.com/de7pqle35/image/upload/v1576747309/mygoodportfolio/stock-1863880_1920_cmpqhg.jpg'}></img>
                        </Col>
                        {/* <CalendarMarkets /> */}

                    </Row>
                </Container>
            </section>
        )
    }
}


export default Profile