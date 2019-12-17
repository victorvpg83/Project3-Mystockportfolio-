import React from 'react'
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import apiService from "../../service/Value_service"
import Service from "../../service/ValueCreate_service"


import ValueFormClose from './ValueFormClose'




class ValuePort extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this._apiService = new apiService()
        this.state = {
            values: [],
            showModalWindow: false,
            showModalWindowCierre: false,
            prices: [],
            bpa: [],
            bpv: [],
            vc: undefined,
            efect: undefined,
            pct: undefined,
            valorTotalCartera: undefined,
            beneficioPerdidaCartera: undefined,
            valorCartera: undefined,
            showValueFormClose: false,
             clickedValue: {},
            valuesN: []

        }
    }

    componentDidMount = () => this.updateValuesList()

    updateValuesList = () => {
        this._service.getAllValues()
            .then(allValuesFromDB => {
                const copyValues = []
                allValuesFromDB.data.cartera.forEach(value => {
                    copyValues.push({
                        BDValue: value.buyPrice,
                        BDSymbol: value.symbol,
                        BDQuantity: value.qty,
                        APIPrice: null,
                        bpa: undefined,
                        plv: undefined
                    })


                })
                this.setState({
                    valuesN: copyValues
                }, () => this.updatePrice(this.state.valuesN))
            })
            .catch(err => console.log("Error", err))
    }

    updatePrice = (array) => {
        console.log(array)
        const copyArray = [...array.map(elm => { return { ...elm } })]
        const promisesArr = copyArray.map(elm => {

            return this._apiService.getRealTime(elm.BDSymbol)
                .then(Markets => {
                    elm.APIPrice = Markets.data.price

                    return elm
                })

                .catch(err => console.log("Error", err))
        })

        Promise.all(promisesArr).then((res) => {
            console.log(res, "respuesta promises")
            this.setState({ valuesN: res }, () => this.bpaCalc())
        }).catch(err => console.log(err))



    }
    bpaCalc = () => {
        console.log(this.state.valuesN)
        let pla = []
        let plv = []

        let copyValuesN = [...this.state.valuesN.map(elm => { return { ...elm } })]

        let calcValues = copyValuesN.map(value => {
            let numberBpa = value.APIPrice - value.BDValue
            let numberPlv = numberBpa * value.BDQuantity
            value.bpa = numberBpa
            value.plv = numberPlv
            return value
        })
        console.log(calcValues)

        this.setState({
            valuesN: calcValues

        })

    }

    showValueFormClose = () => this.setState({showValueFormClose: true})


    handleShow = (value) => this.setState({ showModalWindow: true, clickedValue: value  })
   
    handleClose = () => this.setState({ showModalWindow: false, clickedValue: {}})


    render() {
        console.log(this.state.valuesN)

        return (
            <Container>

                <h2>Valores en cartera: </h2>
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
                        

                                {this.state.valuesN ?
                                    this.state.valuesN.map(prices => {

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
                                                    {/* {this.state.showValueFormClose && <ValueFormClose setTheUser={this.props.setTheUser} symbol={prices.BDSymbol} qty={prices.BDQuantity} buyPrice={prices.BDValue} closeModalWindow={this.handleClose} updateValuesList={this.updateValuesList} />} */}
                                                    <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Cerrar posición</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <ValueFormClose setTheUser={this.props.setTheUser} value={this.state.clickedValue} closeModalWindow={this.handleClose} updateValuesList={this.updateValuesList} />
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

                </Row>

            </Container>
        )
    }

}


export default ValuePort
