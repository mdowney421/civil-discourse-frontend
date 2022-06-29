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
        <section className='login'>
            <div className="login-container">
                <div className='welcome-message'>
                    <h2>Welcome back to Civil Discourse - your home for intelligent, fact-based discussion on current events.</h2>
                </div>
                <form onSubmit={authenticateUser}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={userQuery.username} required onChange={handleChange} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={userQuery.password} required onChange={handleChange} /><br />
                    <input type="submit" value="Log In" />
                </form>
            </div>
            <div className='no-account'>
                <h3>Don't have an account?</h3>
                <button onClick={() => props.setView('create')}> Create Account</button>
            </div>
        </section>
    )
}

export default LogIn