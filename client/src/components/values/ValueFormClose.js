import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import ValuesService from '../../service/ValueCreate_service'

class ValueFormClose extends Component {

    constructor(props) {
        super(props)
        this._valuesService = new ValuesService()

        this.state = {
            disabledButton: false,
            registroOP: {
                sellPrice: "",      
                comision: "",         
                symbol: this.props.value.BDSymbol, 
                buyPrice: this.props.value.BDValue,       
                qty: this.props.value.BDQuantity,            
                bruto: undefined,          
                neto: undefined,           
            },
            accion: {

            }        
        }

    }

    handleSubmit = e => {
        e.preventDefault()

        this._valuesService.closeValue(this.state.registroOP)
            .then(x => {
                this.props.closeModalWindow()
                this.props.updateValuesList()
                this.props.setTheUser(x.data.user)
            })
            .catch(err => console.log(err))
        }
        
        handleInputChange = e => {

            let { name, value } = e.target

            this.setState(
                {registroOP: { ...this.state.registroOP, [name]: value }
            })
          
        }
        render() {
            console.log(this.props)
            return (
                <Form onSubmit={this.handleSubmit}>

                <Form.Group>
                    <Form.Label>Precio de venta</Form.Label>
                    <Form.Control type="number" name="sellPrice" onChange={this.handleInputChange} value={this.state.registroOP.sellPrice} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Comisión</Form.Label>
                    <Form.Control type="number" name="comision" onChange={this.handleInputChange} value={this.state.registroOP.comision} />
                </Form.Group>

                <Button variant="dark" size="sm" type="submit">Cerrar posición</Button>

            </Form>
        )
    }
}


export default ValueFormClose