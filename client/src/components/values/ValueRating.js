import React from 'react'
import Service from '../../service/Value_service'

import { Container, Row, Col } from 'react-bootstrap'

class ValueRating extends React.Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            values: [],
        }
    }

    componentDidMount = () => this.updateRatingValue()

    updateRatingValue = () => {
        this._service.getRating()
            .then(ValueRating => this.setState({values: ValueRating.data.rating}))
            
            .catch(err => console.log("Error", err))
    }

    render() {
        return (

            <section>

                <Container>
                <h3>Fundamental</h3>

                    <Row>
                        <Col className="table-index" md={6}>
                            <p> {this.state.values.recommendation} </p>
                            <p> {this.state.values.score} </p>
                            <p> {this.state.values.rating} </p>
                        </Col>
                    </Row>
                </Container>


            </section>

        )
    }
}


export default ValueRating