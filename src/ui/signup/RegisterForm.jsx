import { useRef } from "react";
import { Link } from "react-router-dom";
import FormLabel from "../../components/typo/form-label/FormLabel";

const RegisterForm = ({submitAction}) => {
    const formRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: formRef.current.username.value,
            email: formRef.current.email.value,
            password: formRef.current.password.value,
            motto: formRef.current.motto.value
        };
        
        submitAction(data);
    }

    return(
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="field">
                <FormLabel text="Username" />
                <div className="control">
                    <input className="input is-medium is-link" type="text" name="username" placeholder="Your username, not email!" />
                    <div className="help is-info">* limit to 40 characters</div>
                </div>
            </div>

            <div className="field">
                <FormLabel text="Email" />
                <div className="control">
                    <input className="input is-medium is-link" type="text" name="email" placeholder="Your email please" />
                </div>
            </div>

            <div className="field">
                <FormLabel text="Password" />
                <div className="control">
                    <input className="input is-medium is-link" type="password" name="password" placeholder="Enter your password"/>
                    <div className="help is-info">* minimum 6 characters</div>
                </div>
            </div>

            <div className="field">
                <FormLabel text="Retype password" />
                <div className="control">
                    <input className="input is-medium is-link" type="password" name="repassword" placeholder="retype your password"/>
                </div>
            </div>

            <hr />
            <div className="subtitle is-5 has-text-centered has-text-link">Optional</div>
            <div className="field">
                <FormLabel text="Motto" />
                <div className="control">
                    <input className="input is-medium is-link" type="text" name="motto" placeholder="your life motto!" />
                    <div className="help is-info">* limit to 400 characters</div>
                </div>
            </div>

            <div className="is-flex is-justify-content-space-between is-align-content-center">
                <Link to="/login">Already registered? Log in</Link>
                <button type="submit" className="button is-success">Create your account</button>
            </div>        
        </form>
    )
}
export default RegisterForm;