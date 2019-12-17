import React from 'react'
import Service from '../../service/Value_service'
import { Container, Row, Table, Col } from 'react-bootstrap'
import ValueCardMarket from './ValueCardMarket'

class ValueMarkets extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            values: []
        }
    }

    componentDidMount = () => this.updateMarket()

    updateMarket = () => {
        this._service.getMarketList()
            .then(Markets => this.setState({values: Markets.data.symbolsList}))    
            .catch(err => console.log("Error", err))
    }

    render() {
        return (
            <section>
                <Container>
                <h3>Mercado</h3>
                    <Row>
                        <Col className="table-index" md={4}>
                            <Table striped bordered hover size="sm">
                              <thead>
                                <tr>
                                  <th>Ticker</th>
                                  <th>Precio $</th>
                                  <th>Variación</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.values ? this.state.values.map(values => <ValueCardMarket key={values.symbol} {...values} /> ) : null }
                              </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default ValueMarkets