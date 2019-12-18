import React from 'react'
import { Container, Row, Table, Button, Modal } from 'react-bootstrap'
import apiService from "../../service/Value_service"
import Service from "../../service/ValueCreate_service"
import ValueFormAdd from './ValueFormAdd'


import ValueFormClose from './ValueFormClose'




class ValuePort extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this._apiService = new apiService()
        this.state = {
            values: [],
            showModalWindow: false,
            showModalWindowQ: false,

            showValueFormClose: false,
             clickedValue: {},
             clickedValueQ: {},
            valuesN: []

        }
    }


    showValueFormClose = () => this.setState({showValueFormClose: true})

    handleShow = (value) => this.setState({ showModalWindow: true, clickedValue: value  })
    handleShowQ = (value) => this.setState({ showModalWindowQ: true, clickedValueQ: value  })
   
    handleClose = () => this.setState({ showModalWindow: false, clickedValue: {}})
    handleCloseQ = () => this.setState({ showModalWindowQ: false, clickedValueQ: {}})


    render() {
        console.log(this.props.values)

        return (
            <Container>

                <h2>Valores en cartera: <Button variant="dark" onClick={this.handleShowQ}>Añadir posición</Button> </h2>
                
                <Row>

                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Valor</th>
                                <th>Nº de Acciones</th>
                                <th>Precio de compra</th>
                                <th>Precio</th>
                                <th>B/P acción</th>
                                <th>B/P Valor</th>

                            </tr>

                        </thead>
                        <tbody>
                        

                                {this.props.values ?
                                    this.props.values.map(prices => {

                                        if (prices.APIPrice) {

                                            return (
                                                <>
                                                    <tr>
                                                    <td>{prices.BDSymbol}</td>
                                                    <td>{prices.BDQuantity}</td>
                                                    <td>{prices.BDValue}</td>
                                                    <td>{prices.APIPrice}</td>
                                                    <td>{prices.bpa}</td>
                                                    <td>{prices.plv}</td>
                                                    <Button variant="dark" onClick={() => this.handleShow(prices)}>Cerrar posición</Button>
                                                    </tr>
                                                    <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Cerrar posición</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <ValueFormClose setTheUser={this.props.setTheUser} value={this.state.clickedValue} closeModalWindow={this.handleClose} updateValuesList={this.props.updateValuesList} />
                                                        </Modal.Body>
                                                    </Modal>

                                                </>
                                            )
                                        }
                                        else return null
                                    }) :
                                    null}
                            
                        </tbody>
                    </Table>
                    

                    <Modal show={this.state.showModalWindowQ} onHide={this.handleCloseQ}>
                            <Modal.Header closeButton>
                                <Modal.Title>Añadir posición</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ValueFormAdd setTheUser={this.props.setTheUser} closeModalWindowQ={this.handleCloseQ} updateValuesList={this.props.updateValuesList}/>
                            </Modal.Body>
                    </Modal>

                </Row>

            </Container>
        )
    }

}


export default ValuePort
