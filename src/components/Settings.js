import { useState } from 'react'
import axios from 'axios'

const Settings = (props) => {
    
    const [changedUser, setChangedUser] = useState({username: props.user, password: ''})
    const [buttonActive, setButtonActive] = useState(true)
    const [changeSuccessful, setChangeSuccessful] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)
    
    const handleChange = (event) => {
        setChangeSuccessful(false)
        setChangedUser({...changedUser, [event.target.name]: event.target.value})
    }

    const changePassword = (event) => {
        event.preventDefault()
        axios.put(`https://civil-discourse-backend.herokuapp.com/users/${props.user}`, changedUser).then((response) => {
            setChangeSuccessful(true)
        })
    }

    const toggleDeleteWarning = () => {
        if (!deleteWarning) {
            setDeleteWarning(true)
        } else {
            setDeleteWarning(false)
        }
    }

    const deleteAccount = (event) => {
        event.preventDefault()
        axios.delete(`https://civil-discourse-backend.herokuapp.com/users/${props.user}`).then((response) => {
            props.setUser()
            props.setView('login')
        })
    }

    return (
        <section className='settings'>
            <h3>Account Settings</h3>
            <p>Change password or delete your account here.</p>
            <form onSubmit={(event) => changePassword(event)}>
                <input type="password" name="password" placeholder='New Password' onChange={handleChange} /><br />
                {buttonActive ?
                    <input className='button' type="submit" value="Change Password" />
                : <h3>Processing...</h3>}
                {changeSuccessful ?
                    <h3>Password changed successfully!</h3>
                : null}
            </form>
            {deleteWarning ?
                <>
                    <h3 className='username-error'>Are you sure you want to delete your account? This cannot be undone.</h3>
                    <button className='delete-button' onClick={(event) => deleteAccount(event)}>Yes, delete my account!</button>
                    <button onClick={toggleDeleteWarning}>No, don't delete my account!</button>
                </>
            : <button className='delete-button' onClick={toggleDeleteWarning}>Delete Account</button>}
        </section>
    )
}

export default Settings