import { Route, Switch, useRouteMatch } from "react-router"
import ManageAccountPage from "../../ui/manageAccount/ManageAccountPage";

const AccountRouter = () => {
    const {path, url} = useRouteMatch();

    return(
        <Switch>
            <Route exact path={path}>
                <ManageAccountPage />
            </Route>
        </Switch>
    )
}

export default AccountRouter;