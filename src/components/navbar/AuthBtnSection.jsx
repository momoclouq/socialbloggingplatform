import { Link } from "react-router-dom"

const AuthBtnSection = () => {
    return (
        <div className="buttons">
            <Link to="/signup" className="button is-link is-light">Become a blogger</Link>
            <Link to="/login" className="button is-light">Log in</Link>
        </div>
    )
}

export default AuthBtnSection;