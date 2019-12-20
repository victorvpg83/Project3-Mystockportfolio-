import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import apiService from "../../service/Value_service"
import Service from "../../service/ValueCreate_service"

import RegOp from '../values/RegOp'
import ValuePort from '../values/ValuePort'
import GlobalPos from '../values/GlobalPos'
import PieChart from '../values/PieChart'


class Portfolio extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this._apiService = new apiService()
        this.state = {
            GlP: {
                portValue: undefined,
                cash: undefined,
                totalValue: undefined,
                profitLose: undefined,
            },
            valuesN: [],
            ROp: [],
        }
    }

    componentDidMount = () => this.updateValuesList()

    updateValuesList = () => {
        this._service.getAllValues()
            .then(allValuesFromDB => {
                const copyValues = []
                const copyRop = []
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
                allValuesFromDB.data.registroOP.forEach(value => {
                    copyRop.push({
                        symbol: value.symbol,
                        qty: value.qty,
                        comision: value.comision,
                        buyPrice: value.buyPrice,
                        sellPrice: value.sellPrice,
                        calcB: undefined,
                        calcN: undefined
                    })

                })

                this.setState({
                    valuesN: copyValues,
                    ROp: copyRop
                }, () => this.updatePrice(this.state.valuesN))
            })
            .catch(err => console.log("Error", err))
    }

    updatePrice = (array) => {
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
            this.setState({ valuesN: res }, () => this.bpaCalc())
        }).catch(err => console.log(err, "error de respuesta promises"))
    }

    bpaCalc = () => {
        let copyValuesN = [...this.state.valuesN.map(elm => { return { ...elm } })]

        let calcValues = copyValuesN.map(value => {
            let numberBpa = value.APIPrice - value.BDValue
            let numberPlv = numberBpa * value.BDQuantity
            value.bpa = numberBpa.toFixed(3)
            value.plv = numberPlv.toFixed(3)

            return value
        })

        let portValue = copyValuesN.map(elm => elm.APIPrice * elm.BDQuantity).reduce((a, b) => a + b, 0)
        let cashinv = copyValuesN.map(elm => elm.BDQuantity * elm.BDValue).reduce((a, b) => a + b, 0)
        let cash = this.props.loggedInUser.initI - cashinv
        let totalValue = cash + portValue
        let profitLose = totalValue - this.props.loggedInUser.initI


        let copyROp = [...this.state.ROp.map(elm => { return { ...elm } })]
        let calc = copyROp.map(value => {
            let calcB = (value.sellPrice - value.buyPrice) * value.qty
            let calcN = ((value.sellPrice - value.buyPrice) * value.qty) - value.comision
            value.calcB = calcB.toFixed(2)
            value.calcN = calcN.toFixed(2)
            return value
        })


        this.setState({
            valuesN: calcValues,
            GlP: {
                portValue: portValue.toFixed(2),
                cash: cash.toFixed(2),
                totalValue: totalValue.toFixed(2),
                profitLose: profitLose.toFixed(2),
            },
            ROp: calc

        })

    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="table-index" md={12}>
                        <GlobalPos loggedInUser={this.props.loggedInUser} setTheUser={this.props.setTheUser} values={this.state.GlP} updateValuesList={this.updateValuesList} />
                    </Col>
                </Row>

                <Row>
                    <Col className="table-index" md={12}>
                        <ValuePort setTheUser={this.props.setTheUser} values={this.state.valuesN} updateValuesList={this.updateValuesList} />
                    </Col>
                </Row>

                <Row>
                    <Col className="table-index" md={12}>
                        <RegOp setTheUser={this.props.setTheUser} updateValuesList={this.updateValuesList} ROp={this.state.ROp} />
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default Portfolio