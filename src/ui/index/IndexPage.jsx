import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import calculateMaxPage from "../../components/helper/calculateMaxPage";
import BasicPagination from "../../components/pagination/BasicPagination";
import PostGrid from "../../components/post-grid/PostGrid";
import { hasErrorList, isLoadingList, loadPostList, selectErrorMessage, selectPostList } from "../../features/slices/post/postSlice";
import IndexError from "./IndexError";
import IndexLoading from "./IndexLoading";
import IntroPanel from "./IntroPanel";


const IndexPage = () => {
    const dispatch = useDispatch();
    const bloggersData = useSelector(selectPostList);
    const loadingList = useSelector(isLoadingList);
    const errorList = useSelector(hasErrorList);
    const errorMessage = useSelector(selectErrorMessage)
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(loadPostList({currentPage, mode: "latest"}));
    }, [currentPage])

    if(errorList) return <IndexError error={errorMessage} />;

    if(loadingList) return <IndexLoading />;

    return(
        <div className="container custom-container">
            {currentPage === 1 ? <IntroPanel /> : ""}
            <section className="section has-background-light p-5">
                <PostGrid posts={bloggersData.data} />

                <BasicPagination page={currentPage} setPage={setCurrentPage} maxPage={calculateMaxPage(bloggersData.count, 10)} />
            </section>
        </div>
    )
}

export default IndexPage;