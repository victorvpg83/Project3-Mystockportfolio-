import React from 'react'
import Service from '../../service/Value_service'

import { Container, Row, Button, Table, Col } from 'react-bootstrap'

import ValueCardIndex from './ValueCardIndex'

class ValueGainers extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            values: [],
            // showModalWindow: false
        }
    }

    componentDidMount = () => this.updateGainers()

    updateGainers = () => {
        this._service.getGainer()
            .then(Gainers => {
                // console.log(mostActive)
                this.setState({
                    values: Gainers.data.mostGainerStock
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
                <h3>Ganadores del día</h3>


                    {/* {
                        this.props.loggedInUser && <Button variant="dark" onClick={this.handleShow}>Nueva montaña rusa</Button>
                    } */}

                    <Row>
                        <Col className="table-index" md={4}>
                            <Table striped bordered hover size="sm">
                              <thead>
                                <tr>
                                  <th>Ticker</th>
                                  <th>Precio $</th>
                                  <th>Variación</th>
                                </tr>
                              </thead>
                              <tbody>

                                {this.state.values.map(values => <ValueCardIndex key={values.ticker} {...values} />)}
                              </tbody>
                            </Table>
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


export default ValueGainers