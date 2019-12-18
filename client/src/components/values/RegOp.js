import React from 'react'
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap'
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

    componentDidMount = () => this.updateCloseList()

    updateCloseList = () => {
        this._dbservice.getRegOp()
            .then(regOpDB =>{
                console.log(regOpDB)
                //  this.setState({ 
                //      regOp: regOpDB.data
                // }, () => this.updatePrice(this.state.regOp.closevalues))
            })
            .catch(err => console.log("Error", err))
    }

    handleShow = () => this.setState({ showModalWindow: true })
    handleClose = () => this.setState({ showModalWindow: false })


        render () {
            console.log(this.props.ROp)
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
                        

                        {this.props.ROp ?
                            this.props.ROp.map(prices => {

                                

                                    return (
                                        <>
                                            <tr>
                                            <td>{prices.symbol}</td>
                                            <td>{prices.qty}</td>
                                            <td>{prices.buyPrice}</td>
                                            <td>{prices.sellPrice}</td>
                                            <td>{prices.comision}</td>
                                            <td></td>
                                            <td></td>
                                            </tr>
                                

                                        </>
                                    )
                            
                            }) :
                            null}
                    
                </tbody>
                            </Table>
                        </Col>
                    </Row>


                </Container>
        )
    }                   
}


export default RegOp 