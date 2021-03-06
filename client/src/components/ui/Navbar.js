import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Service from '../../service/Auth_service'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this._service = new Service()

    }

    logoutUser = () => {
        this._service.logout()
            .then(x => this.props.setUser(false))
            .catch(err => console.log(err))
    }

    render() {

        const saludo = this.props.loggedInUser ? this.props.loggedInUser.username : 'invitado'

        return (

            this.props.loggedInUser ?

                <Navbar bg="dark" variant="dark" expand="md">
                    <Navbar.Brand>Charts</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link as="li"><Link to="/">Inicio</Link></Nav.Link>
                            <Nav.Link as="li"><Link to="/profile">Mi perfil</Link></Nav.Link>
                            <Nav.Link as="li"><Link to="/details">Detalles</Link></Nav.Link>
                            <Nav.Link as="li"><Link to="/portfolio">Posición Global</Link></Nav.Link>
                            <Nav.Link as = "li" > < Link to = "/market" > Mercado </Link></Nav.Link >
                            <Nav.Link as="li" onClick={this.logoutUser}>Logout</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Navbar.Text>Bienvenid@ {saludo}</Navbar.Text>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                :

                <Navbar bg="dark" variant="dark" expand="md">
                    <Navbar.Brand>Charts</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link as="li"><Link to="/">Inicio</Link></Nav.Link>
                            <Nav.Link as="li"><Link to="/signup">Registro</Link></Nav.Link>
                            <Nav.Link as="li"><Link to="/login">Login</Link></Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Navbar.Text>Mi perfil: {saludo}</Navbar.Text>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        )
    }
}

export default Navigation