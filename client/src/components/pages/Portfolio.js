import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import apiService from "../../service/Value_service"
import Service from "../../service/ValueCreate_service"

import RegOp from '../values/RegOp'
import ValuePort from '../values/ValuePort'
import GlobalPos from '../values/GlobalPos'



class Portfolio extends React.Component {

    constructor(props) {                                                        
        super(props)
        this._service = new Service()
        this._apiService = new apiService()
        this.state = {
            values: [],
            showModalWindow: false,
            showModalWindowCierre: false,
            prices: [],
            bpa:[],
            bpv: [],
            vc :undefined,
            efect: undefined,
            pct:undefined,
            valorTotalCartera: undefined,
            beneficioPerdidaCartera: undefined,
            valorCartera: undefined,


            valuesN: []
        
        }
    }


        render () {

            return (
                <Container>
                    <Row>
                    <Col className="table-index" md={12}>
                        <GlobalPos loggedInUser={this.props.loggedInUser} setTheUser={this.props.setTheUser}/>
                        </Col>
                    </Row>
                    
                    <Row>
                    <Col className="table-index" md={12}>
                        <tr>
                        <ValuePort/>
                        </tr>
                        </Col>  
                    </Row>

                    <Row>
                        <Col className="table-index" md={12}>
                            <RegOp/>
                        </Col>
                    </Row>
                </Container>
        )
    }   
                
}


export default Portfolio