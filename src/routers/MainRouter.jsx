import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Footer from "../components/footer/Footer";

import Navbar from "../components/navbar/Navbar";
import { loadCurrentUserIni } from "../features/slices/user/userSlice";
import ContactDevPage from "../ui/contactDev/ContactDevPage";
import IndexPage from "../ui/index/IndexPage";
import LoginPage from "../ui/login/LoginPage";
import SignupPage from "../ui/signup/SignupPage";
import BloggerRouter from "./BloggerRouter";
import PostRouter from "./PostRouter";
import ProtectedRouter from "./protected/ProtectedRouter";

const localStorage = window.localStorage;

const MainRouter = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        //try to use token stored in the local storage
        let token = localStorage.getItem("token");
        if(token) dispatch(loadCurrentUserIni(token));
      }, []);

    return (
        <Router basename={'/socialbloggingplatform/'}>
            <div className="full-height-screen is-flex is-flex-direction-column custom-has-navbar-fixed-top">
                <Navbar />

                <Switch>
                    <Route path="/" exact>
                        <IndexPage />
                    </Route>
                    <Route path="/contact">
                        <ContactDevPage />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/signup">
                        <SignupPage />
                    </Route>
                    <Route path="/post">
                        <PostRouter />
                    </Route>
                    <Route path="/blogger">
                        <BloggerRouter />
                    </Route>
                    <Route path="/manage">
                        <ProtectedRouter />
                    </Route>
                </Switch>

                <Footer />
            </div>
        </Router>
        
    )
}

export default MainRouter;