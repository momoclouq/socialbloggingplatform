import { useState } from "react";
import { Link } from "react-router-dom";

const ManagePostDropdown = () => {
    const [isActive, setIsActive] = useState(false);

    return(
        <div className={`dropdown mb-2 ${isActive ? 'is-active' : ""}`}>
            <div className="dropdown-trigger">
                <button onClick={() => {setIsActive(!isActive)}} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Options</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    <Link to="/manage/post/create" className="dropdown-item">
                        Create a post
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ManagePostDropdown;