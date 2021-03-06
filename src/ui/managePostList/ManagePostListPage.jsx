import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ReturnButton from "../../components/buttons/return/ReturnBtn";
import ManagePostDropdown from "../../components/dropdowns/ManagePostDropdown";
import calculateMaxPage from "../../components/helper/calculateMaxPage";
import BasicPagination from "../../components/pagination/BasicPagination";
import PostGrid from "../../components/post-grid/PostGrid";
import MessageCustom from "../../components/typo/message/MessageCustom";
import { hasErrorList, isLoadingList, loadPersonalPostList, selectErrorMessage, selectLoadListSuccess, selectPostList } from "../../features/slices/post/managePostSlice";
import { selectToken } from "../../features/slices/user/userSlice";
import ManagePostListLoading from "./ManagePostListLoading";
import ErrorMessage  from "../../components/typo/error-message/ErrorMessage";

const ManagePostListPage = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const posts = useSelector(selectPostList);
    const token = useSelector(selectToken);

    const loadingList = useSelector(isLoadingList);
    const errorList = useSelector(hasErrorList);
    const errorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        dispatch(loadPersonalPostList({currentPage, token}));
    }, [currentPage])

    if(loadingList) return <ManagePostListLoading />;
    
    return(
        <div className="container custom-container">
            <div className="mt-3 is-flex is-justify-content-space-between">
                <ReturnButton to="/manage" />
                <ManagePostDropdown />
            </div>

            <MessageCustom>
                Your posts from newest to oldest
            </MessageCustom>


            {
                errorList ? <ErrorMessage error={errorMessage}/> : 
                <section className="section has-background-light p-5">
                    <PostGrid posts={posts.data}/>

                    <BasicPagination page={currentPage} setPage={setCurrentPage} maxPage={calculateMaxPage(posts.count, 10)} />
                </section>
            }
        </div>
    )
}

export default ManagePostListPage;