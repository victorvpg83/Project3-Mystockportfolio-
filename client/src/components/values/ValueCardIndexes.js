import React from 'react'

const ValueCardIndexes = ({ ticker, changes, price, indexName }) => {

    return (
<>
    <tr>
        <td>{ticker}</td>
        <td>{indexName}</td>
        <td>{price}</td>
        {parseInt(changes) >= 0 ? <td className="positive"> {changes} </td> :
        <td className="negative"> {changes}  </td> 
        }
        {/* <td>{changes}</td> */}
    </tr>
</>
    )
}

export default ValueCardIndexes