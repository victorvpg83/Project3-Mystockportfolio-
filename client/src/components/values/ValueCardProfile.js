import React from 'react'
// import Col from 'react-bootstrap/Col'
import { Col, Table} from 'react-bootstrap'

import { Link } from 'react-router-dom'

const ValueCardProfile = ({ price, companyName, exchange, description, sector,imgURL }) => {

    return (
        // <Col className="coaster-card" md={4}>
<>

            
                <p>{price}</p>
                <p>{companyName}</p>
                <p>{exchange}</p>
                <p>{description}</p>
                <p>{sector}</p>
                <p>{imgURL}</p>

            


        {/* // </Col > */}
</>
    )
}


export default ValueCardProfile