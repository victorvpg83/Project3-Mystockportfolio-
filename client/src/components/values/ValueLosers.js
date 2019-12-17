import React from 'react'
import Service from '../../service/Value_service'

import { Container, Row, Table, Col } from 'react-bootstrap'

import ValueCardIndex from './ValueCardIndex'

class ValueLosers extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            values: []
        }
    }

    componentDidMount = () => this.updateLosers()

    updateLosers = () => {
        this._service.getLoser()
            .then(Losers => this.setState({values: Losers.data.mostLoserStock}))
            .catch(err => console.log("Error", err))
    }

    render() {
        return (
            <section>
                <Container>
                <h3>Perdedores del día</h3>
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
                                {this.state.values.map(values => <ValueCardIndex key={values.ticker} {...values} />)}
                              </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}


export default ValueLosers