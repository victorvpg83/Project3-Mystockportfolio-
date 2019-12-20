import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import apiService from "../../service/Value_service"
import DBService from "../../service/ValueCreate_service"


class RegOp extends React.Component {

    constructor(props) {
        super(props)
        this._dbservice = new DBService()
        this._apiService = new apiService()
        this.state = {
            showModalWindow: false,
        }
    }


    handleShow = () => this.setState({ showModalWindow: true })
    handleClose = () => this.setState({ showModalWindow: false })


    render() {
        return (
            <>
                <Col md={12}>
                <h2>Registro de operaciones</h2>
                </Col>
                    <Col md={12}>
                        <Table className='shadow bckg' striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Símbolo</th>
                                    <th>Nº de Acciones</th>
                                    <th>Precio de compra $</th>
                                    <th>Precio de venta $</th>
                                    <th>comision $</th>
                                    <th>B/P Bruto $</th>
                                    <th>B/P Neto $</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.ROp ?
                                    this.props.ROp.map(prices => {
                                            console.log(parseInt(prices.calcB))
                                        return (
                                            <>
                                                <tr>
                                                    <td>{prices.symbol}</td>
                                                    <td>{prices.qty}</td>
                                                    <td>{prices.buyPrice}</td>
                                                    <td>{prices.sellPrice}</td>
                                                    <td>{prices.comision}</td>
                                                   {parseInt(prices.calcB) >= 0 ? <td className="positive"> {prices.calcB} </td> :
                                                   <td className="negative"> {prices.calcB} </td> 
                                                    } 
                                                    {parseInt(prices.calcN) >= 0 ? <td className="positive"> {prices.calcN} </td> :
                                                   <td className="negative"> {prices.calcN} </td> 
                                                    } 
                                                </tr>
                                            </>
                                        )
                                    }) :
                                    null}
                            </tbody>
                        </Table>
                    </Col>
            </>
        )
    }
}


export default RegOp 