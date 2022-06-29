import { useState } from 'react'
import axios from 'axios'

const CreateAccount = (props) => {
    
    const [newUser, setNewUser] = useState()
    
    const createNewUser = (event) => {
        event.preventDefault()
        axios.post('https://civil-discourse-backend.herokuapp.com/users', newUser).then((response) => {
            props.setUser(newUser.username)
            props.setView('main')
        })
    }

    const handleChange = (event) => {
        event.preventDefault()
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
                            <li>Highly opinionated</li>
                            <li>Offensive</li>
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
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
            <div className='existing-account'>
                <h3>Already have an account?</h3>
                <button onClick={() => props.setView('login')}>Log In</button>
            </div>
        </section>
    )
}

export default CreateAccount