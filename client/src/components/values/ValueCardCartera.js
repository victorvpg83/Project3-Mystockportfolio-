import React from 'react'

const ValueCardCartera = ({ symbol, qty, buyPrice }) => {

return (
    <>       

        <tr>
            <td>{symbol}</td>
            <td>{qty}</td>
            <td>{buyPrice}</td>
        </tr>

    </>
    )
}

export default ValueCardCartera