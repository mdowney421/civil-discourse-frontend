const CreateAccount = () => {
    return (
        <div className="create-container">
            <h3>Create a new account:</h3>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username"/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"/>
                <input type="submit" value="Log In" />
            </form>
        </div>
    )
}

export default CreateAccount