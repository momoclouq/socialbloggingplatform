import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { deleteUser, hasErrorDeletingUser, isDeletingUser, selectDeleteUserSuccess, selectErrorMessage, turnOffDeleteUserSuccess } from "../../../features/slices/user/manageUserSlice";
import { logout, logoutCold, selectToken } from "../../../features/slices/user/userSlice";
import NormalLoader from "../../loader/NormalLoader";

const ErrorMessage = ({error}) => {
    return (
        <div className="box has-background-danger has-text-light">
                {
                    error
                }
        </div>
    )
}

const DeleteAccountModal = ({state, actionClose}) => {
    const dispatch = useDispatch();
    const deletingUser = useSelector(isDeletingUser);
    const deleteUserSuccess = useSelector(selectDeleteUserSuccess);
    const errorDeletingUser = useSelector(hasErrorDeletingUser);
    const error = useSelector(selectErrorMessage);
    const token = useSelector(selectToken);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("herer");

        let password = event.target.password.value;

        dispatch(deleteUser({
            token: token,
            data: {
                password
            }
        }));
    }

    if(deleteUserSuccess){
        dispatch(turnOffDeleteUserSuccess());
        dispatch(logoutCold());
    }

    return(
        <div className={`modal ${state ? "is-active" : ""}`}>
            <div onClick={actionClose} className="modal-background"></div>
            <div className="modal-content">
                <form className="box" onSubmit={handleSubmit}>
                    {
                        deletingUser ? <NormalLoader message="Deleting your account" /> : ""
                    }
                    {
                        errorDeletingUser ? <ErrorMessage error={error} /> : ""
                    }
                    <div className="title">Are you sure that you want to delete your account?</div>
                    <div className="subtitle">Enter password to authenticate the action</div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" name="password" type="password" />
                        </div>
                    </div>

                    <div className="is-flex is-justify-content-space-between">
                        <div className="control">
                            <button onClick={actionClose} className="button is-dark">Cancel</button>
                        </div>
                        <div className="control">
                            <button type="submit" className="button is-danger">Delete account</button>
                        </div>
                    </div>
                </form>
                
            </div>
            <button onClick={actionClose} className="modal-close is-large" aria-label="close"></button>

        </div>
    )
}

export default DeleteAccountModal;