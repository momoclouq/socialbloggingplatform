import { Switch, useRouteMatch, Route } from "react-router-dom";
import ManagePostListPage from "../../ui/managePostList/ManagePostListPage";

const ManagePostRouter = () => {
    let {path, url} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <ManagePostListPage />
            </Route>

            {/* <Route exact path={`${path}/create`}>
                <BlPostCreatePage /> 
            </Route>

            <Route path={`${path}/:postid`}>
                <BlPostDetailPage />
            </Route> */}
        </Switch>
    )
}

export default ManagePostRouter;