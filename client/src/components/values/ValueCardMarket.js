import React from 'react'

const ValueCardMarket = ({ symbol, name, price }) => {

    return (
<>
    <tr>
        <td>{symbol}</td>
        <td>{name}</td>
        <td>{price}</td>
    </tr>
</>
    )
}

export default ValueCardMarket