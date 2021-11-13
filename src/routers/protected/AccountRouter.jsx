import { Route, Switch, useRouteMatch } from "react-router"

const AccountRouter = () => {
    const {path, url} = useRouteMatch();

    return(
        <Switch>
            {/* <Route exact path={path}>
                <BlAccountDetail />
            </Route> */}
        </Switch>
    )
}

export default AccountRouter;