import React from 'react'

const Profile = props => {

    return (
        <h1>Perfil {props.loggedInUser.username}</h1>
    )
}


export default Profile