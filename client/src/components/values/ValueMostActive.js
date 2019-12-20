import React from 'react'
import Service from '../../service/Value_service'

import { Container, Row, Table, Col } from 'react-bootstrap'

import ValueCardIndex from './ValueCardIndex'

class ValueMostActive extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            values: [],
        }
    }
    componentDidMount = () => this.updateMostActive()

    updateMostActive = () => {
        this._service.getMostActive()
            .then(mostActive => this.setState({values: mostActive.data.mostActiveStock.slice(0,5)}))
            .catch(err => console.log("Error", err))
    }

    render() {
        return (
            <section>
                <Container>
                <h3>Valores más activos</h3>
                    <Row>
                        <Col className="table-index" md={12}>
                            <Table className='shadow bckg' striped bordered hover size="sm">
                              <thead>
                                <tr>
                                  <th>Símbolo</th>
                                  <th>Nombre</th>
                                  <th>Precio $</th>
                                  <th>Variación $</th>
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

export default ValueMostActive