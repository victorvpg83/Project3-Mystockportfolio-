import React from 'react'
import Service from '../../service/Value_service'

import { Container, Row, Table, Col } from 'react-bootstrap'

import ValueCardSectors from './ValueCardSectors'

class ValueSectors extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            values: [],
        }
    }
    componentDidMount = () => this.updateSectors()

    updateSectors = () => {
        this._service.getSectors()
            .then(sectors =>this.setState({values: sectors.data.sectorPerformance}))
            .catch(err => console.log("Error", err))
    }

    render() {
        return (
            <section>
                <Container>
                <h3 className='marTop'>Índices sectoriales</h3>
                    <Row>
                        <Col className="table-index" md={12}>
                            <Table className='shadow bckg' striped bordered hover size="sm">
                              <thead>
                                <tr>
                                  <th>Sector</th>
                                  <th>Variación</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.values.map(values => <ValueCardSectors key={values.ticker} {...values} />)}
                              </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default ValueSectors