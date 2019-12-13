import React from 'react'
// import Col from 'react-bootstrap/Col'
import { Col, Table} from 'react-bootstrap'

import { Link } from 'react-router-dom'

const ValueCardPrice = ({ price }) => {

    return (
        // <Col className="coaster-card" md={4}>
<>

            <tr>
                <td>{price}</td>
           

            </tr>


        {/* // </Col > */}
</>
    )
}


export default ValueCardPrice