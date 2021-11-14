import { useDispatch } from "react-redux";
import RegisterForm from "./RegisterForm";
import { hasErrorSignup, isAuthenticated, isSigningup, resetData, selectErrorMessage, selectSignupSuccess, signup, turnOffSignupSuccess } from "../../features/slices/user/userSlice";
import { useSelector } from "react-redux";
import SignupLoading from "./SignupLoading";
import SignupError from "./SignupError";
import { useEffect } from "react";
import { Redirect } from "react-router";

const SignupPage = () => {
    const dispatch = useDispatch();
    const signingup = useSelector(isSigningup);
    const errorSignup = useSelector(hasErrorSignup);
    const errorMessage = useSelector(selectErrorMessage);
    const success = useSelector(selectSignupSuccess);
    const authenticatedState = useSelector(isAuthenticated);
  
    const signupAction = (data) => {
        dispatch(signup(data));
    }

    useEffect(() => {
        dispatch(resetData());
    }, [])

    if(authenticatedState) return <Redirect to="/manage/account" />;
    if(signingup) return <SignupLoading />;

    if(success) {
        setTimeout(() => {
            dispatch(turnOffSignupSuccess());
        }, 2000)
    }

    return(
        <div className="container is-fluid is-flex is-justify-content-center is-align-items-center p-5 has-background-light">
            <div className="register-form-menu box has-background-white p-6">
                {
                    success ? <div className="box mb-6 has-background-info subtitle has-text-light has-text-centered">Account Created</div> : ""
                }
                <div className="title has-text-link has-text-centered">
                    Register to become a blogger
                </div>
                {
                    errorSignup ? <SignupError error={errorMessage} /> : ""
                }
                <RegisterForm submitAction={signupAction} />
            </div>
        </div>
    )
}

export default SignupPage;