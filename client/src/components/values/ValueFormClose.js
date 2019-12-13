 
import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

import ValuesService from '../../service/ValueCreate_service'


class ValueFormClose extends Component {

    constructor(props) {
        super(props)
        this._valuesService = new ValuesService()

        this.state = {
            disabledButton: false,
            buttonText: 'Cerrar posición',
            value: {
                comision: undefined,
                sellPrice: undefined
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this._valuesService.postValue(this.state.value)
            .then(x => {

                this.props.closeModalWindow()
                this.props.updateValuesList()
                this.props.setTheUser(x.data.user)
            })
            .catch(err => console.log(err))
    }


    handleInputChange = e => {
        let { name, value } = e.target
        this.setState({
            value: { ...this.state.value, [name]: value }
        })
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                {/* <Form.Group>
                    <Form.Label>Símbolo</Form.Label>
                    <Form.Control type="text" name="symbol" onChange={this.handleInputChange} value={this.state.value.symbol} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nº de acciones</Form.Label>
                    <Form.Control type="number" name="qty" onChange={this.handleInputChange} value={this.state.value.qty} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio de compra</Form.Label>
                    <Form.Control type="number" name="buyPrice" onChange={this.handleInputChange} value={this.state.value.buyPrice} />
                </Form.Group> */}
                <Form.Group>
                    <Form.Label>Precio de venta</Form.Label>
                    <Form.Control type="number" name="sellPrice" onChange={this.handleInputChange} value={this.state.value.sellPrice} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Comisión</Form.Label>
                    <Form.Control type="number" name="comision" onChange={this.handleInputChange} value={this.state.value.comision} />
                </Form.Group>

                <Button variant="dark" size="sm" type="submit">Cerrar posición</Button>
            </Form>
        )
    }
}


export default ValueFormClose