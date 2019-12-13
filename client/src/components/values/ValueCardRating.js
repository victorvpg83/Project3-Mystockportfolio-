import React from 'react'
// import Col from 'react-bootstrap/Col'
import { Col, Table} from 'react-bootstrap'

import { Link } from 'react-router-dom'

const ValueCardRating = ({ score, rating, recomendation }) => {

    return (
        // <Col className="coaster-card" md={4}>
<>

            
                <p>{score}</p>
                <p>{rating}</p>
                <p>{recomendation}</p>


        {/* // </Col > */}
</>
    )
}


export default ValueCardRating