import React from 'react'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import Service from '../../service/Value_service'

import DataChart from '../values/DataChart'


class ValueDetail extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            symbol: '',
            closeValues: [],
            maxPrice: undefined,
            minPrice: undefined,
            showModalWindowQ: false

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
                let histPrices = Hist.data.historical.map(e => {
                    arrayComplet.push({ date: e.date, close: e.close })
                })
                let maxPrice = Math.max(...arrayComplet.map(e => e.close))
                let minPrice = Math.min(...arrayComplet.map(e => e.close))
                this.setState({
                    closeValues: arrayComplet,
                    maxPrice: maxPrice,
                    minPrice: minPrice
                })

            })

            .catch(err => console.log("Error", err))

    }

    handleInputChange = e => {
        let { value } = e.target
        this.setState({ symbol: value })
    }

    handleShowQ = (value) => this.setState({ showModalWindowQ: true, clickedValueQ: value })
    handleCloseQ = () => this.setState({ showModalWindowQ: false, clickedValueQ: {} })


    render() {

        return (
            <Container>

                <Row>
                    <Col className="table-index h1DetailCol" md={6}>
                        <h1 className='h1Detail txtS' >Detalles</h1>
                    </Col>
                 
                    <Col className="table-index searchBar" md={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label> <h4>Busca por símbolo</h4></Form.Label>
                                <Form.Control type="text" name="symbol" onChange={this.handleInputChange} value={this.state.symbol} />
                            </Form.Group>

                            <Button variant="primary" size="sm" type="submit">Buscar valor</Button>
                        </Form>
                    </Col>
                </Row>

                <section>

                    <Row>
                        <Col className="table-index" md={6}>
                            
                            {this.state.values ?
                                <>
                                    <div className='shadow bckg bRnd paddingB marTop'>
                                    <h3 className='h3Detail'>{this.state.values.companyName}</h3>
                                    <Row>
                                    <Col className="table-index" md={4}>
                                    <img src={this.state.values.image} ></img>
                                    </Col>
                                    <Col className="table-index padTop" md={8}>
                                    <p><strong>Símbolo: </strong> {this.state.symbol} </p>
                                    <p><strong> Mercado: </strong>{this.state.values.exchange} </p>
                                    <p> <strong>Sector: </strong> {this.state.values.sector} </p>
                                    </Col>
                                    </Row>
                                    <p className='desc'> {this.state.values.description} </p>
                                    </div>
                                </> :
                                null}
                            
                        </Col>

                        <Col className="table-index" md={6}>
                            {this.state.valuesR && this.state.values ?
                                <>
                                    <div className='shadow bckg bRnd marTop padBot'>                               
                                    <h3 className='h3Detail'>Análisis fundamental</h3>
                                    <Row>
                                    <Col md={2}></Col> 
                                    <Col md={4}>   
                                    <p><strong>Score: </strong>{this.state.valuesR.score} </p>
                                    <p><strong>Rating:</strong> {this.state.valuesR.rating} </p>
                                    </Col>
                                    <Col md={6}>
                                    <p className='center'><strong>Recomendación</strong></p>
                                    <h4 className='center'>{this.state.valuesR.recommendation} </h4>
                                    </Col> 
                                    </Row>
                                    <h3 className='h3Detail'>Análisis técnico</h3>
                                    <Row>
                                    <Col md={2}></Col>
                                    <Col md={4}>
                                    <h5>Precio actual</h5>
                                    <h4>{this.state.values.price} $</h4>
                                    </Col>
                                    <Col md={6}>
                                    <h5 className='padBot'>Rango en el último año</h5>
                                    <p><strong>Máximo:</strong> {this.state.maxPrice} $ </p>
                                    <p><strong>Mínimo:</strong> {this.state.minPrice} $ </p>
                                    </Col> 
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Button className='centBut' variant='primary' onClick={this.handleShowQ}>Ver gráfico</Button>
                                        </Col>
                                    </Row>
                                    </div> 
                                </> :
                                null}
                        </Col>
            

                        <Modal size="lg" show={this.state.showModalWindowQ} onHide={this.handleCloseQ}>
                            <Modal.Header closeButton>
                                <Modal.Title>Evolución anual </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <DataChart dataClose={this.state.closeValues} />
                            </Modal.Body>
                        </Modal>

                    </Row>
                </section>
            </Container>
        )
    }
}

export default ValueDetail