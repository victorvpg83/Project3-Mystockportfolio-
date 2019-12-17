import React from 'react'

const ValueCardIndex = ({ ticker, price, changesPercentage }) => {

    return (
<>
    <tr>
        <td>{ticker}</td>
        <td>{price}</td>
        <td>{changesPercentage}</td>
    </tr>
</>
    )
}

export default ValueCardIndex