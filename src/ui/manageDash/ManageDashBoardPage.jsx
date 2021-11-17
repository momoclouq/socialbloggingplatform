import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/slices/user/userSlice";

const ManageDashBoardPage = () => {
    const user = useSelector(selectUser);

    return (
        <div className="container custom-container">
            <div className="box mt-3">Welcome to the dashboard for bloggers! {user.username}</div>
            <div className="columns">
                <div className="column">
                    <Link to="/manage/account">
                        <div className="box has-background-light has-text-link-dark is-size-4 m-2 has-text-centered">
                            Manage your account
                        </div>
                    </Link>
                </div>
                <div className="column">
                    <Link to="/manage/post">
                        <div className="box has-background-light has-text-link-dark is-size-4 m-2 has-text-centered">
                            Manage your posts
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ManageDashBoardPage;