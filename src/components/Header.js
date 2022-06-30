const Header = (props) => {

    return (
        <header>
            <h1 onClick={() => props.setView('main')}>Civil Discourse</h1>
            <h2><i>fact-based discussion in a conspiratorial world</i></h2>
            {props.user && props.user !== 'undefined' && props.user !== 'null' ?
                <>
                    <h3 onClick={props.logOut}>Log Out</h3>
                    <h3 onClick={() => props.setView('account')}>Account</h3>
                </>
            : null}
        </header>
    )
}

export default Header