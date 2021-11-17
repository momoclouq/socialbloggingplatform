import { Switch, useRouteMatch, Route } from "react-router-dom";
import CreatePostPage from "../../ui/createPost/CreatePostPage";
import ManagePostListPage from "../../ui/managePostList/ManagePostListPage";
import UpdatePostPage from "../../ui/updatePost/UpdatePostPage";

const ManagePostRouter = () => {
    let {path, url} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <ManagePostListPage />
            </Route>
            <Route path={`${path}/create`}>
                <CreatePostPage />
            </Route>
            <Route path={`${path}/update/:postid`}>
                <UpdatePostPage />
            </Route>
        </Switch>
    )
}

export default ManagePostRouter;