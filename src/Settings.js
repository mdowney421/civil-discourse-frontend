import { useState } from 'react'
import axios from 'axios'

const Settings = (props) => {
    
    const [changedUser, setChangedUser] = useState({username: props.user, password: ''})
    
    const handleChange = (event) => {
        setChangedUser({...changedUser, [event.target.name]: event.target.value})
    }

    const changePassword = (event) => {
        event.preventDefault()
        axios.put(`https://civil-discourse-backend.herokuapp.com/users/${props.user}`, changedUser).then((response) => {
            console.log('password changed!')
        })
    }

    const deleteAccount = (event) => {
        event.preventDefault()
        axios.delete(`https://civil-discourse-backend.herokuapp.com/users/${props.user}`).then((response) => {
            props.setUser()
            props.setView('login')
        })
    }

    return (
        <>
            <h3>Account Settings</h3>
            <p>Change password or delete your account here.</p>
            <form onSubmit={(event) => changePassword(event)}>
                Password: <input type="password" name="password" onChange={handleChange} />
                <input type="submit" value="Change Password" />
            </form>
            <button onClick={(event) => deleteAccount(event)}>Delete Account</button>
        </>
    )
}

export default Settings