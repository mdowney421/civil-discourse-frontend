import { useState } from 'react'
import axios from 'axios'

const LogIn = (props) => {

    const [userQuery, setUserQuery] = useState({username: '', password: ''})
    const [credentialsIncorrect, setCredentialsIncorrect] = useState(false)
    const [buttonActive, setButtonActive] = useState(true)

    const authenticateUser = (event) => {
        event.preventDefault()
        setButtonActive(false)
        setCredentialsIncorrect(false)
        axios.get(`https://civil-discourse-backend.herokuapp.com/users/${userQuery.username}`).then((response) => {
            if (response.data.length !== 0) {
                if (userQuery.password === response.data[0].password) {
                    props.handleAuthenticatedUser(response.data[0].username)
                } else {
                    setButtonActive(true)
                    setCredentialsIncorrect(true)
                }
            } else {
                setButtonActive(true)
                setCredentialsIncorrect(true)
            }
        })
    }

    const handleChange = (event) => {
        event.preventDefault()
        setCredentialsIncorrect(false)
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
                    {buttonActive ?
                        <input className='button' type="submit" value="Log In" />
                    : <h3>Processing...</h3>}
                    {credentialsIncorrect ?
                    <h3 className='username-error'>Wrong username or password!</h3>
                    : null}
                </form>
            </div>
            <div className='no-account'>
                <h3>Don't have an account?</h3>
                <button onMouseOver={() => props.setLoggedOut(false)} onClick={() => props.setView('create')}> Create Account</button>
            </div>
        </section>
    )
}

export default LogIn