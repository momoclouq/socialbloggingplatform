import {
    Switch,
    Route
} from "react-router-dom";

import { Redirect, useRouteMatch } from "react-router";
import AccountRouter from "./AccountRouter";
import ManagePostRouter from "./ManagePostRouter";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../features/slices/user/userSlice";
import ManageDashBoardPage from "../../ui/manageDash/ManageDashBoardPage";

const ProtectedRouter = () => {
    let {path, url} = useRouteMatch();
    let authenticated = useSelector(isAuthenticated);

    if(!authenticated) return <Redirect to="/login" />
    
    return(
        <Switch>
            <Route exact path={path}>
                <ManageDashBoardPage />
            </Route>
            <Route path={`${path}/account`}>
                <AccountRouter />
            </Route>
            <Route path={`${path}/post`}>
                <ManagePostRouter />
            </Route>
        </Switch>
    )
}

export default ProtectedRouter;