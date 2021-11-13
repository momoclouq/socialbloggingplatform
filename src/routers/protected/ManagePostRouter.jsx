import { Switch, useRouteMatch, Route } from "react-router-dom";

const ManagePostRouter = () => {
    let {path, url} = useRouteMatch();

    return (
        <Switch>
            {/* <Route exact path={path}>
                <BlPostListPage />
            </Route>

            <Route exact path={`${path}/create`}>
                <BlPostCreatePage /> 
            </Route>

            <Route path={`${path}/:postid`}>
                <BlPostDetailPage />
            </Route> */}
        </Switch>
    )
}

export default ManagePostRouter;