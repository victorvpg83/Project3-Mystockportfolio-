import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Service from '../../service/Value_service'


import ValueProfile from '../values/ValueProfile'
import ValueRating from '../values/ValueRating'


class ValueDetail extends React.Component  {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            symbol: '',
            closeValues: [],
            maxPrice: undefined,
            minPrice: undefined

        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this._service.getProfile(this.state.symbol)
            .then(getProfile => {

                this.setState({
                    values: getProfile.data.profile,
                    symbol: getProfile.data.symbol
                })

            })
            .catch(err => console.log(err))
        this._service.getRating(this.state.symbol)
            .then(ValueRating => {

                this.setState({
                    valuesR: ValueRating.data.rating
                })


            })
            
            .catch(err => console.log("Error", err))
        this._service.getHistoric(this.state.symbol)
            .then(Hist => {
                console.log(Hist.data.historical)
                let arrayComplet = []
                let histPrices = Hist.data.historical.map(e =>{
                    arrayComplet.push({date: e.date, close: e.close})
                  })
                let maxPrice =Math.max(...arrayComplet.map(e=>e.close))
                let minPrice =Math.min(...arrayComplet.map(e=>e.close))
                this.setState({
                    closeValues: arrayComplet,
                    maxPrice:maxPrice,
                    minPrice:minPrice
                })
                console.log(maxPrice)

            })
            
            .catch(err => console.log("Error", err))

    }

    handleInputChange = e => {
        let { value } = e.target
        this.setState({symbol: value})
    }


    render () {
        console.log(this.state)
        return (
            <Container>

                <Row> 
                    <Col className="table-index" md={6}>
                    <h1>Detalles del valor</h1>
                    </Col>
                    <Col className="table-index" md={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Símbolo</Form.Label>
                                <Form.Control type="text" name="symbol" onChange={this.handleInputChange} value={this.state.symbol} />
                            </Form.Group>

                            <Button variant="dark" size="sm" type="submit">Buscar valor</Button>
                        </Form>
                    </Col>
                </Row>
        
                <section>
        
                    <Row>
                        <Col className="table-index" md={6}>
                            {/* <ValueProfile/> */}
                            {this.state.values ?  
                            <>
                                <h3>{this.state.values.companyName}</h3>
                              <img src={this.state.values.image} ></img>
                                 <p>Símbolo: {this.state.symbol} </p>
                              
                              <p> {this.state.values.description} </p>
                              <p> Mercado: {this.state.values.exchange} </p>
                              <p> Sector: {this.state.values.sector} </p> 
                              </>   :
                              null}
                        </Col>
        
                        <Col className="table-index" md={6}>
                            {/* <ValueRating /> */}
                            {this.state.values ? 
                            <>
                                <h3>Análisis fundamental</h3>
                                <p>Recomendación: {this.state.valuesR.recommendation} </p>
                                <p>Score: {this.state.valuesR.score} </p>
                                <p>Rating: {this.state.valuesR.rating} </p>
                                <h3>Análisis técnico</h3>
                                <p>Precio: {this.state.values.price} $ </p>
                                <p><strong>Rango últimos 21 días</strong></p>
                                <p>Máximo: {this.state.maxPrice} $ </p>
                                <p>Mínimo: {this.state.minPrice} $ </p>

                              </>   :
                              null}
                        </Col>
                        
                    </Row>
                </section>
            </Container>
        )
    }
}

export default ValueDetail