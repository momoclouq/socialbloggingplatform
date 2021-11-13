import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import calculateMaxPage from "../../components/helper/calculateMaxPage";
import BasicPagination from "../../components/pagination/BasicPagination";
import PostGrid from "../../components/post-grid/PostGrid";
import MessageCustom from "../../components/typo/message/MessageCustom";
import useQuery from "../../components/useQuery/useQuery";
import { hasErrorList, isLoadingList, loadPostList, selectErrorMessage, selectPostList } from "../../features/slices/post/postSlice";
import PostListError from "./PostListError";
import PostListLoading from "./PostListLoading";

const processMessage = (mode) => {
    if(mode == "popular") return (
        <>
            Search posts for <strong>most popular</strong>
        </>
    )
    if(mode == "latest") return (
        <>
            Search posts for <strong>latest</strong>
        </>
    )
    return "defaults";
} 


const PostListPage = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const query = useQuery();
    const mode = query.get("m");
    const posts = useSelector(selectPostList);

    const loadingList = useSelector(isLoadingList);
    const errorList = useSelector(hasErrorList);
    const errorMessage = useSelector(selectErrorMessage)

    useEffect(() => {
        dispatch(loadPostList({currentPage, mode}));
    }, [currentPage, mode])

    if(loadingList) return <PostListLoading />;
    if(errorList) return <PostListError error={errorMessage} />;

    return(
        <div className="container custom-container">
            <MessageCustom>
                {processMessage(mode)}
            </MessageCustom>

            <section className="section has-background-light p-5">
                <PostGrid posts={posts.data}/>

                <BasicPagination page={currentPage} setPage={setCurrentPage} maxPage={calculateMaxPage(posts.count, 10)}/>
            </section>
        </div>
    );
}

export default PostListPage;