import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import apiService from "../../service/Value_service"
import Service from "../../service/ValueCreate_service"

import RegOp from '../values/RegOp'
import ValuePort from '../values/ValuePort'
import GlobalPos from '../values/GlobalPos'


class Portfolio extends React.Component {

    constructor(props) {                                                        
        super(props)
        this._service = new Service()
        this._apiService = new apiService()
        this.state = {
            GlP : {
            portValue: undefined,
            cash: undefined,
            totalValue: undefined,
            profitLose: undefined,
        },
            valuesN: [],

            ROp: [] 
        
        }
    }

    componentDidMount = () => this.updateValuesList()

    updateValuesList = () => {
        this._service.getAllValues()
            .then(allValuesFromDB =>{
                console.log(allValuesFromDB.data.registroOP)
                const copyValues = []
                allValuesFromDB.data.cartera.forEach(value => {
                    copyValues.push({
                        BDValue: value.buyPrice,
                        BDSymbol: value.symbol,
                        BDQuantity: value.qty,
                        APIPrice: null,
                        bpa: undefined,
                        plv: undefined,
                        portValue: undefined,
                        cash: undefined,
                        totalValue: undefined,
                        profitLose: undefined

                    })

            })
            
                 this.setState({ 
                     valuesN: copyValues,
                     ROp:allValuesFromDB.data.registroOP
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
        }).catch(err => console.log(err, "error de respuesta promises"))
    }

    bpaCalc = () => {
        console.log(this.state.ROp)
        let copyValuesN = [...this.state.valuesN.map(elm => { return { ...elm } })]

        let calcValues = copyValuesN.map(value => {
            let numberBpa = value.APIPrice - value.BDValue
            let numberPlv = numberBpa * value.BDQuantity
            value.bpa = numberBpa.toFixed(3)
            value.plv = numberPlv.toFixed(3)
            
            return value
        })
        
        let portValue = copyValuesN.map(elm => elm.APIPrice*elm.BDQuantity).reduce((a, b) => a + b, 0)
        let cashinv = copyValuesN.map(elm => elm.BDQuantity*elm.BDValue).reduce((a, b) => a + b, 0)
        let cash = this.props.loggedInUser.initI-cashinv
        let totalValue = cash+portValue
        let profitLose = totalValue-this.props.loggedInUser.initI

        let copyROp =[...this.state.ROp.map(elm => { return { ...elm } })] 
            let calc = copyROp.map(value =>{
                let calcB = (value.sellPrice-value.buyPrice)* value.qty
                let calcN = (value.sellPrice-value.buyPrice)* value.qty
            })

        this.setState({
            valuesN: calcValues,
            GlP:{ portValue: portValue.toFixed(2),
            cash: cash.toFixed(2),
            totalValue: totalValue.toFixed(2),
            profitLose: profitLose.toFixed(2)
            }
        })

    }

        render () {
            console.log(this.state.ROp)
            return (
                <Container>
                    <Row>
                    <Col className="table-index" md={12}>
                        <GlobalPos loggedInUser={this.props.loggedInUser} setTheUser={this.props.setTheUser} values={this.state.GlP} updateValuesList={this.updateValuesList}/>
                        </Col>
                    </Row>
                    
                    <Row>
                    <Col className="table-index" md={12}>
                        <tr>
                        <ValuePort setTheUser={this.props.setTheUser} values={this.state.valuesN} updateValuesList={this.updateValuesList}/>
                        </tr>
                        </Col>  
                    </Row>

                    <Row>
                        <Col className="table-index" md={12}>
                            <RegOp setTheUser={this.props.setTheUser} updateValuesList={this.updateValuesList} ROp ={this.state.ROp} />
                        </Col>
                    </Row>
                </Container>
        )
    }   
                
}

export default Portfolio