import React from 'react'
import { Col, Table, Button, Modal, Row } from 'react-bootstrap'
import apiService from "../../service/Value_service"
import Service from "../../service/ValueCreate_service"
import ValueFormAdd from './ValueFormAdd'
import PieChart from './PieChart'

import ValueFormClose from './ValueFormClose'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class ValuePort extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this._apiService = new apiService()
        this.state = {
            values: [],
            showModalWindow: false,
            showModalWindowQ: false,
            showModalWindow3: false,

            showValueFormClose: false,
            clickedValue: {},
            clickedValueQ: {},
            clickedValue3: {},
            valuesN: []
        }
    }

    showValueFormClose = () => this.setState({ showValueFormClose: true })

    handleShow = (value) => this.setState({ showModalWindow: true, clickedValue: value })
    handleShowQ = (value) => this.setState({ showModalWindowQ: true, clickedValueQ: value })
    handleShow3 = () => {this.setState({ showModalWindow3: true })}

    handleClose = () => this.setState({ showModalWindow: false, clickedValue: {} })
    handleCloseQ = () => this.setState({ showModalWindowQ: false, clickedValueQ: {} })
    handleClose3 = () => this.setState({ showModalWindow3: false, clickedValue3: {} })

    render() {
        return (
            <>
                <Row>
                    <Col md={10}>
                        <h2 className='h2Port'>Valores en cartera </h2>
                    </Col>
                    <Col md={2}>
                        <Button variant="primary" onClick={this.handleShowQ}>Añadir posición</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <div className='tablePos2'>
                        <Table className='shadow bckg' striped bordered hover size="sm" md={10}>
                            <thead>
                                <tr>
                                    <th>Valor</th>
                                    <th>Nº de Acciones</th>
                                    <th>Precio de compra $</th>
                                    <th>Precio $</th>
                                    <th>B/P acción $</th>
                                    <th>B/P Valor $</th>
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
                                                            {parseInt(prices.bpa) >= 0 ? <td className="positive"> {prices.bpa} </td> :
                                                            <td className="negative"> {prices.bpa} </td> 
                                                            }        
                                                            {parseInt(prices.plv) >= 0 ? <td className="positive"> {prices.plv} </td> :
                                                            <td className="negative"> {prices.plv} </td> 
                                                            } 
                                                            <td><Button variant="secondary" size='sm' onClick={() => this.handleShow(prices)}>Cerrar posición</Button></td>
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
                    </div>
                    </Col>
                    <Col md={2}> <Button className='butGP' variant="info" onClick={this.handleShow3}>Ver G/P</Button></Col>
                </Row>
                <Modal show={this.state.showModalWindowQ} onHide={this.handleCloseQ}>
                    <Modal.Header closeButton>
                        <Modal.Title>Añadir posición</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ValueFormAdd setTheUser={this.props.setTheUser} closeModalWindowQ={this.handleCloseQ} updateValuesList={this.props.updateValuesList} />
                    </Modal.Body>
                </Modal>
                <Modal size="md" show={this.state.showModalWindow3} onHide={this.handleClose3}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ganadoras/Perdedoras </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PieChart values={this.props.values} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }

}

export default ValuePort
