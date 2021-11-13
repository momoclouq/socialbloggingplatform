import { Switch, useRouteMatch, Route } from "react-router";
import AdvanceSearchPostPage from "../ui/advancedSearchPost/AdvancedSearchPostPage";
import PostDetailPage from "../ui/postDetail/PostDetailPage";
import PostListPage from "../ui/postList/PostListPage";

const PostRouter = () => {
    let {path, url} = useRouteMatch();

    return(
        <Switch>
            <Route exact path={path}>
                <PostListPage />
            </Route>

            <Route exact path={`${path}/search`}>
                <AdvanceSearchPostPage />
            </Route>

            <Route path={`${path}/:postid`}>
                <PostDetailPage />
            </Route>
        </Switch>
    )
}

export default PostRouter;