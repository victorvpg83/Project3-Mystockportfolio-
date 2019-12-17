import React from 'react'
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import apiService from "../../service/Value_service"
import Service from "../../service/ValueCreate_service"

import ValueFormAdd from './ValueFormAdd'


class GlobalPos extends React.Component {

    constructor(props) {                                                        
        super(props)
        this._service = new Service()
        this._apiService = new apiService()
        this.state = {
            // values: [],
            // showModalWindow: false,
            // prices: [],
            // portVal: null,
            // portValV: [],


            valuesN: []
        
        }
    }
    updateValuesList = () => {
        this._service.getAllValues()
            .then(allValuesFromDB =>{
                console.log("SI QUE ENTRAAAAA", allValuesFromDB)
                const copyValues = []
                allValuesFromDB.data.cartera.forEach(value => {
                    copyValues.push({
                        BDValue: value.buyPrice,
                        BDSymbol: value.symbol,
                        BDQuantity: value.qty,
                        APIPrice: null,

                    })


                })
                console.log(copyValues)
                 this.setState({ valuesN: copyValues
                }, () => this.updatePrice(this.state.valuesN))
            })
            .catch(err => console.log("Error", err))
    }

    updatePrice = (array) =>{
        console.log(array)
        const copyArray = [...array.map(elm => {return {...elm}})]
        const promisesArr = copyArray.map(elm => {

            return this._apiService.getRealTime(elm.BDSymbol)
            .then(Markets => {
               elm.APIPrice = Markets.data.price
              
               return elm
            } )
            
            .catch(err => console.log("Error", err))
        })

        Promise.all(promisesArr).then((res) => {
            console.log(res, "respuesta promises")
            this.setState({ valuesN: res }, () => this.bpaCalc())
        }).catch(err => console.log(err))

       

    }
    bpaCalc = () => {
        console.log(this.state.valuesN)

        let portValue = this.state.valuesN.map(elm => elm.APIPrice*elm.BDQuantity).reduce((a, b) => a + b, 0)
        let cash = this.state.valuesN.map(elm => elm.BDQuantity*elm.BDValue).reduce((a, b) => a + b, 0)

        console.log(cash)


        // let copyValuesN = [...this.state.valuesN.map(elm => { return { ...elm } })]

        // let calcValues = copyValuesN.map(value => {
        //     let portValV= value.BDQuantity*value.APIPrice
        //     let portVal = value.portValV.sort(a+b,0)
        //     value.portValV= portValV
        //     value.portVal = portVal 


        //     let numberBpa = value.APIPrice - value.BDValue
        //     let numberPlv = numberBpa * value.BDQuantity
        //     value.bpa = numberBpa
        //     value.plv = numberPlv
        //     return value
        // })
        // console.log(calcValues)

        // this.setState({
        //     portVal : portVal,
        //     portValV : portValV

        // })

    }

    // componentDidMount = () => this.props.updateValuesList()

    


    // handleShow = () => this.setState({ showModalWindow: true })
    // handleClose = () => this.setState({ showModalWindow: false })


        render () {

            return (
                <Container>
                    <Row className="PosglobalRow">
                        <Col className="table-index" md={6}>
                            <h1>Posición Global</h1>
                        </Col>

                        <Col className="table-index" md={2}>
                        {/* <Button variant="dark" onClick={this.handleShow}>Añadir posición</Button> */}
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
                                     {/* <td>{this.prices.portValV}</td> */}
                                     <td>{this.state.efect}</td>
                                     <td>{this.state.valorTotalCartera}</td>
                                     <td>{this.state.beneficioPerdidaCartera}</td>                 
                                  </tbody>
                            </Table>
                        </Col>
                    
                    
                    </Row>

                    {/* open position */}
                    {/* <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Añadir posición</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ValueFormAdd setTheUser={this.props.setTheUser} closeModalWindow={this.handleClose} updateValuesList={this.props.updateValuesList}/>
                            </Modal.Body>
                    </Modal> */}

                </Container>
        )
    }   
                
}


export default GlobalPos