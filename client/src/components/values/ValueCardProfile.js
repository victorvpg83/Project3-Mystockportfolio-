import React from 'react'

const ValueCardProfile = ({ price, companyName, exchange, description, sector,imgURL }) => {

    return (
<>
        
    <p>{price}</p>
    <p>{companyName}</p>
    <p>{exchange}</p>
    <p>{description}</p>
    <p>{sector}</p>
    <p>{imgURL}</p>

</>
    )
}

export default ValueCardProfile