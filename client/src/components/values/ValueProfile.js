import React from 'react'
import Service from '../../service/Value_service'

import { Container, Row, Col } from 'react-bootstrap'


class ValueProfile extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            values: [],
        }
    }

    componentDidMount = () => this.updateProfileValue()

    updateProfileValue = () => {
        this._service.getProfile(this.state.symbol)
            .then(ValueProfile => {
                console.log(ValueProfile)
                this.setState({
                    values: ValueProfile.data.profile,
                    symbol: ValueProfile.data.symbol
                })
            })
            
            .catch(err => console.log("Error", err))
    }

    render() {
        console.log(this.state.values)
        return (

            <section>

                <Container>
                <h3>Perfil</h3>

                    <Row>
                        <Col className="table-index" md={6}>

                            {this.state.values ?  
                            <>
                            <p>{this.state.symbol} </p>
                            <img src={this.state.values.image} ></img>
                            <p> {this.state.values.companyName} </p>
                            <p>Precio: {this.state.values.price} $ </p>
                            <p> {this.state.values.description} </p>
                            <p> Mercado: {this.state.values.exchange} </p>
                            <p> Sector: {this.state.values.sector} </p> 
                            </>   :
                            null}
                            
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default ValueProfile