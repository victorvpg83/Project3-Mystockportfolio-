import React from 'react'
import Service from '../../service/Value_service'

import { Container, Row, Table, Col } from 'react-bootstrap'

import ValueCardIndexes from './ValueCardIndexes'

class ValueIndexes extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            values: [],
        }
    }
    componentDidMount = () => this.updateIndexes()

    updateIndexes = () => {
        this._service.getIndexes()
            .then(majorIndexes => this.setState({values: majorIndexes.data.majorIndexesList.slice(0,3)}))
            .catch(err => console.log("Error", err))
    }

    render() {
        return (
            <section>
                <Container>
                <h3 className='marTop'>Índices de mercado</h3>
                    <Row>
                        <Col className="table-index" md={12}>
                            <Table className='shadow bckg' striped bordered hover size="sm">
                              <thead>
                                <tr>
                                  <th>Símbolo</th>
                                  <th>Nombre</th>
                                  <th>Precio $</th>
                                  <th>Variación $</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.values.map(values => <ValueCardIndexes key={values.ticker} {...values} />)}
                              </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default ValueIndexes