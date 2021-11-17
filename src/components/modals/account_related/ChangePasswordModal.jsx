import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeInfo, hasErrorChangingInfo, isChangingInfo, selectChangeInfoSuccess, selectErrorMessage, turnOffChangeInfoSuccess } from "../../../features/slices/user/manageUserSlice";
import { loadCurrentUser, selectToken } from "../../../features/slices/user/userSlice";
import NormalLoader from "../../loader/NormalLoader";
import MessageCustom from "../../typo/message/MessageCustom";

const ErrorMessage = ({error}) => {
    return (
        <div className="box has-background-danger has-text-light">
                {
                    error
                }
        </div>
    )
}

const ChangePasswordModal = ({state, actionClose}) => {
    const [errorPassword, setErrorPassword] = useState(false);

    const dispatch = useDispatch();
    const changingInfo = useSelector(isChangingInfo);
    const changeInfoSuccess = useSelector(selectChangeInfoSuccess);
    const errorChangingInfo = useSelector(hasErrorChangingInfo);
    const error = useSelector(selectErrorMessage);
    const token = useSelector(selectToken);

    const handleSubmit = (event) => {
        event.preventDefault();

        let password = event.target.password.value;
        let repassword = event.target.repassword.value;
        let motto = event.target.motto.value;
        let oldpassword = event.target.oldpassword.value;

        if(password !== repassword) setErrorPassword(true);
        else {
            setErrorPassword(false);
            dispatch(changeInfo({
                token: token,
                data: {
                    password,
                    motto,
                    oldpassword
                }
            }
            ))
        }
    }

    if(changeInfoSuccess){
        setTimeout(() => {
            dispatch(turnOffChangeInfoSuccess());
        }, 2000)
    }

    return(
        <div className={`modal ${state ? "is-active" : ""}`}>
            <div onClick={actionClose} className="modal-background"></div>
            <div className="modal-content">
                <form className="box" onSubmit={handleSubmit}>
                    <div className="title">Want to update your information?</div>
                    <div className="subtitle">Leave the fields empty if you do not want to update them</div>
                    {
                        errorPassword ? <ErrorMessage error="New passwords are not similar" /> : ""
                    }
                    {
                        changingInfo ? <NormalLoader message="Updating"/> : ""
                    }
                    {
                        errorChangingInfo ? <ErrorMessage error={error}/> : ""
                    }
                    {
                        changeInfoSuccess ? <MessageCustom>Information changed</MessageCustom> : ""
                    }
                    <div className="field">
                        <label className="label">New Motto</label>
                        <div className="control">
                            <input className="input" name="motto" type="text" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Current password</label>
                        <div className="control">
                            <input className="input" name="oldpassword" type="password" />
                        </div>
                    </div>

                    <hr/>

                    <div className="field">
                        <label className="label">New password</label>
                        <div className="control">
                            <input className="input" name="password" type="password" />
                        </div>
                        <p className="help">minimum 6 characters</p>
                    </div>

                    <div className="field">
                        <label className="label">Retype new password</label>
                        <div className="control">
                            <input className="input" name="repassword" type="password" />
                        </div>
                    </div>

                    <div className="is-flex is-justify-content-space-between">
                        <div className="control">
                            <button type="button" onClick={actionClose} className="button is-dark">Cancel</button>
                        </div>
                        <div className="control">
                            <button type="submit" className="button is-danger">Submit changes</button>
                        </div>
                    </div>
                </form>
            </div>
            <button onClick={actionClose} className="modal-close is-large" aria-label="close"></button>
        </div>
    )
}

export default ChangePasswordModal;