const Header = (props) => {
    
    return (
        <header>
            <h1 onClick={() => props.setView('main')}>Civil Discourse</h1>
            <h2>fact-based discussion in a conspiratorial world</h2>
            <h3 onClick={props.logOut}>Log Out</h3>
            <h3 onClick={() => props.setView('account')}>Account</h3>
        </header>
    )
}

export default Header