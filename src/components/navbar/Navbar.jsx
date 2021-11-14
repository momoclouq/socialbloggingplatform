import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isAuthenticated, loadCurrentUser, selectToken, selectUser } from "../../features/slices/user/userSlice";
import AuthBtnSection from "./AuthBtnSection";
import ManageSection from "./ManageSection";

const Burger = ({active, setIsActive}) => {
    return (
        <button 
            onClick={() => {
                setIsActive(!active);
            }}
            className={`navbar-burger burger ${active ? "is-active" : ""}`}
            aria-label="menu" 
            aria-expanded="false" 
            data-target="navbarMenuMain"

        >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </button>
    )
}

const Navbar = () => {
    const [isActive, setIsActice] = useState(false);
    const authenticatedState = useSelector(isAuthenticated);

    const section = authenticatedState ? <ManageSection /> : <AuthBtnSection />

    return(
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation"> 
            <div className="navbar-brand">
                <Link className="navbar-item has-text-info-dark" to="/">
                    <i className="fas fa-blog"></i>
                    <span>Minh's blog</span>
                </Link>

                <Burger active={isActive} setIsActive={setIsActice} />
            </div>

            <div className={`navbar-menu ${isActive ? "is-active" : ""}`} id="navbarMenuMain">
                <div className="navbar-start">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <div className="navbar-link">Post</div>

                        <div className="navbar-dropdown">
                            <Link to="/post?m=latest" className="navbar-item">Latest</Link>
                            <Link to="/post?m=popular" className="navbar-item">Popular</Link>
                            <hr className="navbar-divider"/>
                            <Link to="/post/search" className="navbar-item">Advance search</Link>
                        </div>
                    </div>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <div className="navbar-link">Blogger</div>

                        <div className="navbar-dropdown">
                            <Link to="/blogger?m=popular" className="navbar-item">Popular</Link>
                            <Link to="/blogger?m=admin" className="navbar-item">Admin</Link>
                            <hr className="navbar-divider"/>
                            <Link to="/blogger/search" className="navbar-item">Advance search</Link>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        {section}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;