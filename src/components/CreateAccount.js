import { useState } from 'react'
import axios from 'axios'

const CreateAccount = (props) => {
    
    const [newUser, setNewUser] = useState()
    
    const createNewUser = (event) => {
        event.preventDefault()
        axios.post('http://civil-discourse-backend.herokuapp.com/users', newUser).then((response) => {
            props.setUser(newUser.username)
            props.setView('main')
        })
    }

    const handleChange = (event) => {
        event.preventDefault()
        setNewUser({...newUser, [event.target.name]: event.target.value})
    }

    return (
        <div className="create-container">
            <h3>Create a new account:</h3>
            <form onSubmit={createNewUser}>
                <label htmlFor="new-username">Username:</label>
                <input type="text" id="new-username" name="username" onChange={handleChange} />
                <label htmlFor="new-password">Password:</label>
                <input type="new-password" id="new-password" name="password" onChange={handleChange} />
                <input type="submit" value="Sign Up" />
            </form>
            <h3>Already have an account?</h3>
            <button onClick={() => props.setView('login')}>Log In</button>
        </div>
    )
}

export default CreateAccount