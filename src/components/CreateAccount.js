import { useState } from 'react'
import axios from 'axios'

const CreateAccount = (props) => {
    
    const [newUser, setNewUser] = useState()
    const [usernameTaken, setUsernameTaken] = useState(false)
    const [buttonActive, setButtonActive] = useState(true)
    
    const createNewUser = (event) => {
        event.preventDefault()
        setUsernameTaken(false)
        setButtonActive(false)
        axios.post('https://civil-discourse-backend.herokuapp.com/users', newUser).then((response) => {
            props.setUser(newUser.username)
            props.setView('main')
        }).catch((error) => {
            if (error) {
                setUsernameTaken(true)
                setButtonActive(true)
            }
        })
    }

    const handleChange = (event) => {
        event.preventDefault()
        setUsernameTaken(false)
        setNewUser({...newUser, [event.target.name]: event.target.value})
    }

    return (
        <section className='create-account'>
            <div className="create-container">
                <div className='create-details'>
                    <h3>Create your free account today!</h3>
                    <p>Here's how Civil Discourse works:</p>
                    <ul>
                        <li>Users are presented with news articles <b>only</b> from reputable sources.</li>
                        <li>You can like, dislike, or comment on them.</li>
                        <li>Comments can be downvoted by other users if they are deemed to be:</li>
                        <ul>
                            <li>Conspiratorial</li>
                            <li>Logically fallacious</li>
                            <li>Highly opinionated</li>
                            <li>Offensive</li>
                            <li>Irrelevant</li>
                            <li>Just downright incorrect</li>
                        </ul>
                        <li>The half of comments with the most downvotes gets hidden from view.</li>
                    </ul>
                </div>
                <form onSubmit={createNewUser}>
                    <label htmlFor="new-username">Username:</label>
                    <input type="text" id="new-username" name="username" required onChange={handleChange} /><br />
                    <label htmlFor="new-password">Password:</label>
                    <input type="password" id="new-password" name="password" required onChange={handleChange} /><br />
                    {buttonActive ?
                        <input className='button' type="submit" value="Sign Up" />
                    : <h3>Processing...</h3>}
                    {usernameTaken ?
                        <h3 className='username-error'>Username "{newUser.username}" already taken!</h3>
                    : null}
                </form>
            </div>
            <div className='existing-account'>
                <h3>Already have an account?</h3>
                <button onClick={() => props.setView('login')}>Back to Log In</button>
            </div>
        </section>
    )
}

export default CreateAccount