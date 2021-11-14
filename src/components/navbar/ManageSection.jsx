import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { loadCurrentUser, logout, selectToken, selectUser } from "../../features/slices/user/userSlice";

const ManageSection = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);

    const logoutFn = () => {
        console.log("herer");
        dispatch(logout());
    }

    useEffect(() => {
        dispatch(loadCurrentUser(token));
    }, [])

    return (
        <div className="buttons">
            <Link to="/manage" className="button is-link is-light">
                {Object.keys(user).length === 0 ? "Who are you?" : `Hello ${user.username}`}
            </Link>
            <button onClick={logoutFn} className="button is-dark">Log out</button>
        </div>
    )
}

export default ManageSection;