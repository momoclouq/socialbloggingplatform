import { Route, Switch, useRouteMatch } from "react-router";
import AdvancedSearchBloggerPage from "../ui/advancedSearchBlogger/AdvancedSearchBloggerPage";
import BloggerDetailPage from "../ui/bloggerDetail/BloggerDetailPage";
import BloggerListPage from "../ui/bloggerList/BloggerListPage";

const BloggerRouter = () => {
    const {path, url } = useRouteMatch();

    return(
        <Switch>
            <Route exact path={path}>
                <BloggerListPage />
            </Route>

            <Route exact path={`${path}/search`}>
                <AdvancedSearchBloggerPage />
            </Route>

            <Route path={`${path}/:bloggerid`}>
                <BloggerDetailPage />
            </Route>
        </Switch>
    )
}

export default BloggerRouter;