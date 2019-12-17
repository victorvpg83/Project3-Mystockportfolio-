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
            registroOP: {
                sellPrice: "",      //viene del formulario
                comision: "",       //viene del formulario  
                symbol: this.props.value.BDSymbol, //viene de cartera
                buyPrice: this.props.value.BDValue,       //viene de cartera
                qty: this.props.value.BDQuantity,            //viene de cartera
                bruto: undefined,          //hay que calcularlo
                neto: undefined,           //hay que calcularlo
            },
            accion: {

            }        
        }

    }

    handleSubmit = e => {
        e.preventDefault()

        this._valuesService.closeValue(this.state.registroOP)
            .then(x => {
// console.log(x.data)
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