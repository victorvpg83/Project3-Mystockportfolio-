import React from 'react'
import { Container, Row, Col, Table, Modal } from 'react-bootstrap'
import apiService from "../../service/Value_service"
import DBService from "../../service/ValueCreate_service"

import ValueFormClose from './ValueFormClose'



class RegOp extends React.Component {

    constructor(props) {                                                        
        super(props)
        this._dbservice = new DBService()
        this._apiService = new apiService()
        this.state = {
            showModalWindow: false,            
        }
    }

    // componentDidMount = () => this.updateCloseList()

    // updateCloseList = () => {
    //     this._dbservice.getRegOp()
    //         .then(regOpDB =>{
    //             console.log(regOpDB)
    //              this.setState({ 
    //                  regOp: regOpDB.data
    //             }, () => this.updatePrice(this.state.regOp.closevalues))
    //         })
    //         .catch(err => console.log("Error", err))
    // }

    handleShow = () => this.setState({ showModalWindow: true })
    handleClose = () => this.setState({ showModalWindow: false })


        render () {

            return (
                <Container>
                    
                    <h2>Registro de operaciones: </h2>
                    <Row>
                    <Col className="table-index" md={12}>
                            <Table striped bordered hover size="sm">
                                <thead>
                                  <tr>
                                    <th>Símbolo</th>
                                    <th>Nº de Acciones</th>
                                    <th>Precio de compra</th>
                                    <th>Precio de venta</th>
                                    <th>comision</th>
                                    <th>B/P Bruto</th>
                                    <th>B/P Neto</th>
                                  </tr>
                                </thead>
                                 <tbody>
                                     <tr>
                                         <td>AAPL</td>
                                         <td>Apple</td>
                                         <td>2200</td>
                                         <td>10254</td>
                                         <td>254</td>
                                         <td>254</td>
                                     </tr>
                    
                                  </tbody>
                            </Table>
                        </Col>
                    </Row>

                    {/* Close Position */}
                    <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Cerrar posición</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ValueFormClose setTheUser={this.props.setTheUser} closeModalWindow={this.handleClose} updateValuesList={this.updateValuesList}/>
                            </Modal.Body>
                    </Modal>

                </Container>
        )
    }                   
}


export default RegOp 