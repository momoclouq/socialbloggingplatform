import { Link } from "react-router-dom";
import FormLabel from "../../components/typo/form-label/FormLabel";

const LoginForm = ({submitAction}) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        submitAction(data);
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="field">
                <FormLabel text="Username"/>
                <div className="control">
                    <input className="input is-medium is-link" name="username" type="text" placeholder="Your username, not email!" />
                </div>
            </div>
            <div className="field">
                <FormLabel text="Password"/>
                <div className="control">
                    <input className="input is-medium is-link" name="password" type="password" placeholder="Enter your password"/>
                </div>
            </div>

            <div className="is-flex is-justify-content-space-between is-align-content-center">
                <Link to="/signup">Create an account now</Link>
                <button className="button is-success">Log in</button>
            </div>        
        </form>
    )
}

export default LoginForm;