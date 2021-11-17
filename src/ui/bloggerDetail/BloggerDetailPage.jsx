import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import HeartBtn from "../../components/buttons/heart/HeartBtn";
import { selectBloggerDetail, loadBloggerDetail, isLoadingDetail, hasErrorDetail, selectErrorMessage } from "../../features/slices/blogger/bloggerSlice";
import BloggerDetailError from "./BloggerDetailError";
import BloggerDetailLoading from "./BloggerDetailLoading";

const BloggerDetailPage = () => {
    const dispatch = useDispatch();
    const blogger = useSelector(selectBloggerDetail);
    const loadingDetail = useSelector(isLoadingDetail);
    const errorDetail = useSelector(hasErrorDetail);
    const errorMessage = useSelector(selectErrorMessage);
    const { bloggerid } = useParams();
    
    useEffect(() => {
        dispatch(loadBloggerDetail(bloggerid));
    }, [])

    if(errorDetail){
        return <BloggerDetailError error={errorMessage} />;
    } 
    if(loadingDetail || Object.keys(blogger).length === 0) return <BloggerDetailLoading />;
    

    return(
        <div className="container is-fluid custom-container">
            <div className="container p-4">
                <div className="title">{blogger.username} {blogger.is_admin ? <span className="subtitle is-6"> [ADMIN]</span> : ""}</div>
                <div className="subtitle">Motto: {blogger.motto}</div>
                <div className="content">
                    <p className="subtitle">Email: {blogger.email}</p>
                    <div className="is-flex is-align-items-center">
                        <div className="mr-4"><span style={{color: "#ff003c"}}><i className="fas fa-heart"></i></span>  {blogger.heart}</div>
                        <div><HeartBtn bloggerid={bloggerid} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BloggerDetailPage;