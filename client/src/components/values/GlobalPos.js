import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
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

        render () {
            return (
                <Container>
                    <Row className="PosglobalRow">
                        <Col className="table-index" md={6}>
                            <h1>Posición Global</h1>
                        </Col>

                        <Col className="table-index" md={2}>
                        </Col>
                    </Row>    
                    <Row>
                    
                    
                        <Col className="table-index" md={8}>
                            <Table striped bordered hover size="sm">
                                <thead>
                                  <tr>
                                    <th>Inversión inicial €</th>
                                    <th>Valor de la cartera</th>
                                    <th>Efectivo</th>
                                    <th>Inversión total</th>
                                    <th>Beneficio/perdida</th>
                                  </tr>
                                </thead>
                                 <tbody> 
                                     <td>{this.props.loggedInUser.initI}</td>
                                     <td>{this.props.values.portValue}</td>
                                     <td>{this.props.values.cash}</td>
                                     <td>{this.props.values.totalValue}</td>
                                     <td>{this.props.values.profitLose}</td>                 
                                  </tbody>
                            </Table>
                        </Col>
                    
                    
                    </Row>

                </Container>
        )
    }   
                
}


export default GlobalPos