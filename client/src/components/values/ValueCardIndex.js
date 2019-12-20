import React from 'react'

const ValueCardIndex = ({ ticker, price, changes, changesPercentage,companyName }) => {

    return (
<>
    <tr>
        <td>{ticker}</td>
        <td>{companyName}</td>
        <td>{price}</td>
        {parseInt(changes) >= 0 ? <td className="positive"> {changes} </td> :
        <td className="negative"> {changes}  </td> 
        }
        {/* <td>{changes}</td> */}
        {/* {parseInt(changesPercentage) >= 0 ? <td className="positive"> {chachangesPercentagenges} $</td> :
        <td className="negative"> {changesPercentage} $ </td> 
        } */}
        <td>{changesPercentage}</td>
    </tr>
</>
    )
}

export default ValueCardIndex