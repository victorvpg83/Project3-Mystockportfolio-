import React, {Component} from 'react'
import {Button, Form, Container, Row, Col } from 'react-bootstrap'

import Service from '../../service/Auth_service'

class SignupForm extends Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            username: '',
            password: '',
            initI: '',
            lastName: '',
            phone: undefined,
            direction: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const {
            username,
            password,
            initI,
            lastName,
            phone,
            direction
            
        } = this.state

        this._service.signup(username, password, initI, lastName,phone,direction)
            .then(theNewUser => {

                this.props.setUser(theNewUser.data)
                this.setState({
                    username: '',
                    password: '',
                    initI: '',
                    lastName: '',
                    phone: '',
                    direction: ''
                })
                this.props.history.push('/') // REDIRECCIONAMIENTO
            })
            .catch(err => console.log(err.response.data.message))
    }


    handleInputChange = e => {
        let {
            name,
            value
        } = e.target
        this.setState({
            [name]: value
        })

    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                <h1 className='txtS'>Registro</h1>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" name="username" onChange={this.handleInputChange} value={this.state.username} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nombre y apellidos</Form.Label>
                        <Form.Control type="text" name="lastName" onChange={this.handleInputChange} value={this.state.lastName} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="number" name="phone" onChange={this.handleInputChange} value={this.state.phone} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" name="direction" onChange={this.handleInputChange} value={this.state.direction} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.handleInputChange} value={this.state.password} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Inversión inicial</Form.Label>
                        <Form.Control type="number" name="initI" onChange={this.handleInputChange} value={this.state.initI} />
                    </Form.Group>
                    <Button variant="dark" type="submit">Registrarme</Button>
                </Form>
                </Col>
                <Col md={3}></Col>
                </Row>
            </Container>
        )
    }
}


export default SignupForm