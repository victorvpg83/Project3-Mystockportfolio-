import React from 'react'
// import Col from 'react-bootstrap/Col'
import { Col, Table} from 'react-bootstrap'

import { Link } from 'react-router-dom'

const ValueCardIndex = ({ ticker, changes, price, changesPercentage, companyName }) => {

    return (
        // <Col className="coaster-card" md={4}>
<>

            <tr>
                <td>{ticker}</td>
                <td>{price}</td>
                <td>{changesPercentage}</td>
            </tr>


        {/* // </Col > */}
</>
    )
}


export default ValueCardIndex