import { Link } from "react-router-dom"

const ReturnButton = ({to}) => {
    return(
        <Link to={to}>
            <button type="button" className="button is-success">
                <i className="fas fa-chevron-left"></i>
            </button>
        </Link>    
    )
}

export default ReturnButton