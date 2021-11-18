import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import HeartBtn from "../../components/buttons/heart/HeartBtn";
import { hasErrorLoadingUser, isLoadingCurrentUser, loadCurrentUser, selectToken, selectUser } from "../../features/slices/user/userSlice";
import ManageAccountLoading from "./ManageAccountLoading";
import ChangePasswordModal from "../../components/modals/account_related/ChangePasswordModal";
import { useState } from "react";
import DeleteAccountModal from "../../components/modals/account_related/DeleteAccountModal";
import ReturnButton from "../../components/buttons/return/ReturnBtn";

const ManageAccountPage = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const loadingCurrentUser = useSelector(isLoadingCurrentUser);
    const errorLoadingUser = useSelector(hasErrorLoadingUser);

    const [displayChange, setDisplayChange] = useState(false);
    const [displayDelete, setDisplayDelete] = useState(false);

    //forms function
    const displayChangeInformation= () => {
        setDisplayChange(true);
    }

    const displayDeleteForm = () => {
        setDisplayDelete(true);
    }

    useEffect(() => {
        dispatch(loadCurrentUser(token));
    }, [])

    if(loadingCurrentUser || Object.keys(user).length === 0) return <ManageAccountLoading />;
    if(errorLoadingUser) return <Redirect to="/login" />

    return(
        <>
        <ChangePasswordModal state={displayChange} actionClose={() => {setDisplayChange(false)}} />
        <DeleteAccountModal state={displayDelete} actionClose={() => {setDisplayDelete(false)}} actionSubmit={() => {}} />
        <div className="container custom-container">
            <div className="mt-3">
                <ReturnButton to="/manage" />
            </div>
            <div className="container p-4">
                <div className="columns">
                    <div className="column is-full-mobile is-three-fifths-mobile">
                        <div className="title">{user.username} {user.is_admin ? <span className="subtitle is-6"> [ADMIN]</span> : ""}</div>
                        <div className="subtitle">Motto: {user.motto}</div>
                        <div className="content">
                            <p className="subtitle">Email: {user.email}</p>
                            <div className="is-flex is-align-items-center">
                                <div className="mr-4"><span style={{color: "#ff003c"}}><i className="fas fa-heart"></i></span>  {user.heart}</div>
                            </div>
                        </div>
                    </div>
                    <div className="column box is-full-mobile is-two-fifths-tablet mt-4">
                        <aside className="menu">
                            <p className="menu-label is-size-5">
                                Options
                            </p>
                            <ul className="menu-list">
                                <li><a href="#" onClick={displayChangeInformation}>Change your info</a></li>
                                <li><a href="#" onClick={displayDeleteForm}>Delete account</a></li>
                            </ul>
                        </aside>
                    </div>
                </div>      
            </div>
        </div>
        </>
    )
}

export default ManageAccountPage;