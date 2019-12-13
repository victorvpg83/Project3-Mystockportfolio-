import React from 'react'
import Service from '../../service/Value_service'

import { Container, Row, Button, Table, Col } from 'react-bootstrap'

import ValueCardProfile from './ValueCardProfile'
import ValueCardIndex from './ValueCardIndex'

class ValueProfile extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            values: [],
            // showModalWindow: false
        }
    }

    componentDidMount = () => this.updateProfileValue()

    updateProfileValue = () => {
        this._service.getProfile()
            .then(ValueProfile => {
                console.log(ValueProfile.data.symbol)
                this.setState({
                    values: ValueProfile.data.profile,
                    symbol: ValueProfile.data.symbol
                })
            })
            
            .catch(err => console.log("Error", err))
    }

    // handleShow = () => this.setState({ showModalWindow: true })
    // handleClose = () => this.setState({ showModalWindow: false })

    render() {
        // console.log(this.state.values)
        return (


            <section>

                <Container>
                <h3>Perfil</h3>


                    {/* {
                        this.props.loggedInUser && <Button variant="dark" onClick={this.handleShow}>Nueva montaña rusa</Button>
                    } */}

                    <Row>
                        <Col className="table-index" md={6}>
                            {/* <Table striped bordered hover size="sm">
                              <thead>
                                <tr>
                                  <th>Ticker</th>
                                  <th>Precio $</th>
                                  <th>Variación</th>
                                </tr>
                              </thead>
                              <tbody>

                                    <ValueCardProfile key={values.symbol} {...values} />
                                    {this.state.values.map(values => <ValueCardProfile key={values.symbol} {...values} />)}
                              </tbody>
                            </Table> */}
                            {this.state.values ?  
                            <>
                                 <p>{this.state.symbol} </p>
                              <img src={this.state.values.image} ></img>
                              <p> {this.state.values.companyName} </p>
                              <p>Precio: {this.state.values.price} $ </p>
                              <p> {this.state.values.description} </p>
                              <p> Mercado: {this.state.values.exchange} </p>
                              <p> Sector: {this.state.values.sector} </p> 
                              </>   :
                              null}
                            
                        </Col>
                    </Row>
                </Container>


                {/* <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nueva montaña rusa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CoasterForm closeModalWindow={this.handleClose} updateCoastersList={this.updateCoastersList} />
                    </Modal.Body>
                </Modal> */}

            </section>

        )
    }
}


export default ValueProfile