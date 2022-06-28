import { useState } from 'react'
import axios from 'axios'

const LogIn = (props) => {

    const [userQuery, setUserQuery] = useState({username: '', password: ''})

    const authenticateUser = (event) => {
        event.preventDefault()
        axios.get(`http://civil-discourse-backend.herokuapp.com/users/${userQuery.username}`).then((response) => {
            if (response.data.length !== 0) {
                if (userQuery.password === response.data[0].password) {
                    props.handleAuthenticatedUser(response.data[0].username)
                } else {
                    console.log('incorrect password')
                }
            } else {
                console.log('incorrect username')
            }
        })
    }

    const handleChange = (event) => {
        event.preventDefault()
        setUserQuery({...userQuery, [event.target.name]: event.target.value})
    }

    return (
        <div className="login-container">
            <h3>Log in to existing account:</h3>
            <form onSubmit={authenticateUser}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={userQuery.username} onChange={handleChange} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={userQuery.password} onChange={handleChange} />
                <input type="submit" value="Log In" />
            </form>
            <h3>Don't have an account?</h3>
            <button onClick={() => props.setView('create')}> Create Account</button>
        </div>
    )
}

export default LogIn