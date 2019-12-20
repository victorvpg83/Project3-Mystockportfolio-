import React from 'react'
import { Container, Col, Table } from 'react-bootstrap'
import apiService from "../../service/Value_service"
import Service from "../../service/ValueCreate_service"

class GlobalPos extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this._apiService = new apiService()
        this.state = {

            valuesN: []
        }
    }

    render() {
        return (
            <>
                    <Col  md={12}>
                        <h1 className ='txtS'>Posición Global</h1>
                    </Col>
                    <Col className="table-index"  md={12}>
                        <div className='tablePos'>                              
                        <Table className='shadow bckg' striped bordered hover size="lg">
                            <thead>
                                <tr>
                                    <th>Inversión inicial $</th>
                                    <th>Valor de la cartera $</th>
                                    <th>Efectivo $</th>
                                    <th>Inversión total $</th>
                                    <th>Beneficio/perdida $</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>{this.props.loggedInUser.initI} </td>
                                <td>{this.props.values.portValue} </td>
                                <td>{this.props.values.cash} </td>
                                <td>{this.props.values.totalValue} </td>
                                {parseInt(this.props.values.profitLose) >= 0 ? <td className="positive"> {this.props.values.profitLose} </td> :
                                <td className="negative"> {this.props.values.profitLose}  </td> 
                                }
                            </tbody>
                        </Table>
                        </div>
                    </Col>
            </>
        )
    }
}

export default GlobalPos