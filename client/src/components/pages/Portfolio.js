import React from 'react'
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import apiService from "../../service/Value_service"
import Service from "../../service/ValueCreate_service"

import ValueFormAdd from '../values/ValueFormAdd'
import ValueCardCartera from '../values/ValueCardCartera'
import ValueCardPrice from '../values/ValueCardPrice'


class Portfolio extends React.Component {

    constructor(props) {                                                        
        super(props)
        this._service = new Service()
        this._apiService = new apiService()
        this.state = {
            values: [],
            showModalWindow: false,
            prices: [],
            bpa:[],
            bpv: [],
            vc :undefined,
            efect: undefined, 
        }
    }

    componentDidMount = () => {
        this.updateValuesList()
        // this.bpaCalc()
        // this.updatePrice()
    }

    updateValuesList = () => {
        this._service.getAllValues()
            .then(allValuesFromDB =>{
                // console.log(allValuesFromDB)
                 this.setState({ values: allValuesFromDB.data
                }, () => this.updatePrice(this.state.values.cartera))
            })
            .catch(err => console.log("Error", err))
    }

    updatePrice = (array) =>{

        array.forEach(elm => {
  
            this._apiService.getRealTime(elm.symbol)
            .then(Markets => {
                console.log(Markets.data)
                const copyPrices = [...this.state.prices]
                copyPrices.push(Markets.data)
                this.setState({
                    prices: copyPrices
                }, () => this.bpaCalc())
                // console.log(this.state.values)
            })
            
            .catch(err => console.log("Error", err))
        })

    }
    bpaCalc = () => {
        console.log('entra')
        let bpa =[]
        let bpv =[]
        let vc =0
        let efect=0
        let pct =0
        let pc =this.state.values.cartera.map(a => a.buyPrice)
        let qty =this.state.values.cartera.map(b => b.qty)
        let ptr=this.state.prices.map(a=>a.price)

         for (let i = 0; i < ptr.length; i++) {
            bpa[i]= ptr[i]-pc[i]   
            }
         for (let i = 0; i < qty.length; i++) {
            bpv[i] = qty[i]*bpa[i]  
            }
        vc = bpv.reduce((a, b) => a + b, 0)
        pct = pc.reduce((a, b) => a + b, 0)
        
        efect= this.props.loggedInUser.initI-pct

        console.log(efect)
            this.setState({
                bpa:bpa,
                bpv:bpv,
                vc:vc
            })
            
         
        console.log(bpv)
        
        
    }





    handleShow = () => this.setState({ showModalWindow: true })
    handleClose = () => this.setState({ showModalWindow: false })


        render () {
            console.log(this.state.values.cartera)
            console.log(this.state.bpv)
            console.log(this.state.vc)
            return (
                <Container>
                    <Row>
                        <Col className="table-index" md={6}>
                            {/* <h1>Posición Global {this.props.loggedInUser.username}</h1> */}
                            <h1>Posición Global</h1>
                        </Col>

                        <Col className="table-index" md={6}>
                        <Button variant="dark" onClick={this.handleShow}>Añadir valor</Button>
                        </Col>
                    </Row>    
                    <Row>
                    
                    
                        <Col className="table-index" md={4}>
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
                                         
                                         
                                         {/* <td>2200</td>
                                         <td>10254</td>
                                         <td>254</td> */}
                                     
                    
                                  </tbody>
                            </Table>
                        </Col>
                    
                    
                    </Row>
                    
                        <h2>Valores en cartera: </h2>
                    <Row>
                    <Col className="table-index" md={4}>
                            <Table striped bordered hover size="sm">
                                <thead>
                                  <tr>
                                    <th>Valor</th>
                                    <th>Nº de Acciones</th>
                                    <th>Precio de compra</th>
                                    <th>aaaaavalor</th>
                                    <th>B/P Acción</th>
                                    <th>B/P Total</th>
                                  </tr>
                                </thead>
                                 <tbody>

                            
                                         {this.state.values.cartera ? 
                                         this.state.values.cartera.map(values => <ValueCardCartera key={values.symbol} {...values}  /> ) :
                                         null  }
                                    
                                         {this.state.prices ? 
                                         this.state.prices.map(prices => <ValueCardPrice key={prices.symbol} {...prices} /> ) :
                                         null  }
                                         
                                         {/* <td>AAPL</td>
                                         <td>Apple</td>
                                         <td>2200</td>
                                         <td>10254</td>
                                         <td>254</td>
                                         <td>254</td> */}
                                     
                    
                                  </tbody>
                            </Table>
                        </Col>
                    </Row>
                    
                    {/* <h2>Registro de operaciones:{props.loggedInUser.initI} </h2>
                    <Row>
                    <Col className="table-index" md={4}>
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
                                         <td>AAPL{props.loggedInUser.initI}</td>
                                         <td>Apple</td>
                                         <td>2200</td>
                                         <td>10254</td>
                                         <td>254</td>
                                         <td>254</td>
                                     </tr>
                    
                                  </tbody>
                            </Table>
                        </Col>
                    </Row> */}
                    <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Añadir valor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ValueFormAdd setTheUser={this.props.setTheUser} closeModalWindow={this.handleClose} updateValuesList={this.updateValuesList}/>
                            </Modal.Body>
                    </Modal>

                    {/* Cerrar Posición
                    <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Cerrar Posición</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ValueFormClose setTheUser={this.props.setTheUser} closeModalWindow={this.handleClose} updateValuesList={this.updateValuesList}/>
                            </Modal.Body>
                    </Modal> */}

                </Container>
        )
    }   
                
}


export default Portfolio