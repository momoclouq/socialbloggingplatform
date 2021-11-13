import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hasErrorLogin, isLoggingin, login, resetData, selectErrorMessage } from "../../features/slices/user/userSlice";
import LoginError from "./LoginError";
import LoginForm from "./LoginForm";
import LoginLoading from "./LoginLoading";

const LoginPage = () => {
    const dispatch = useDispatch();
    const loggingin = useSelector(isLoggingin);
    const errorLogin = useSelector(hasErrorLogin);
    const errorMessage = useSelector(selectErrorMessage)

    useEffect(() => {
        dispatch(resetData());
    }, [])

    const loginAction = (data) => {
        dispatch(login(data));
    }

    if(loggingin) return <LoginLoading />;

    return(
        <div className="container is-fluid is-flex is-justify-content-center is-align-items-center p-5 has-background-light">
            <div className="login-form-menu box has-background-white p-6">
                {
                    errorLogin ? <LoginError error={errorMessage} /> : ""
                }
                <div className="title has-text-link has-text-centered">
                    Login to start blogging
                </div>
                <LoginForm submitAction={loginAction} />
            </div>
        </div>
    )
}

export default LoginPage;