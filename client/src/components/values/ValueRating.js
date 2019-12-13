import React from 'react'
import Service from '../../service/Value_service'

import { Container, Row, Button, Table, Col } from 'react-bootstrap'

import ValueCardRating from './ValueCardRating'

class ValueRating extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            values: [],
            // showModalWindow: false
        }
    }

    componentDidMount = () => this.updateRatingValue()

    updateRatingValue = () => {
        this._service.getRating()
            .then(ValueRating => {
                // console.log(ValueRating)
                this.setState({
                    values: ValueRating.data.rating
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
                <h3>Fundamental</h3>


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
                                    <ValueCardRating key={values.symbol} {...values} />
                                {this.state.values.map(values => <ValueCardRating key={values.symbol} {...values} />)}
                              </tbody>
                            </Table> */}
                            <p> {this.state.values.recommendation} </p>
                            <p> {this.state.values.score} </p>
                            <p> {this.state.values.rating} </p>
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


export default ValueRating