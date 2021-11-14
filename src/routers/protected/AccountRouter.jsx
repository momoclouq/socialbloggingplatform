import { Route, Switch, useRouteMatch } from "react-router"
import BloggerAccountDetailPage from "../../ui/bloggerAccountDetail/BloggerAccountDetailPage";

const AccountRouter = () => {
    const {path, url} = useRouteMatch();

    return(
        <Switch>
            <Route exact path={path}>
                <BloggerAccountDetailPage />
            </Route>
        </Switch>
    )
}

export default AccountRouter;