import React from 'react'

const ValueCardSectors = ({ sector, changesPercentage }) => {

    return (
<>
    <tr>
        <td>{sector}</td>
        {/* {parseInt(changesPercentage) >= 0 ? <td className="positive"> {chachangesPercentagenges} $</td> :
        <td className="negative"> {changesPercentage} $ </td> 
        } */}
        <td>{changesPercentage}</td>

    </tr>
</>
    )
}

export default ValueCardSectors