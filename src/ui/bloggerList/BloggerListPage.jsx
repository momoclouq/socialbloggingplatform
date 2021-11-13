import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import calculateMaxPage from "../../components/helper/calculateMaxPage";
import BasicPagination from "../../components/pagination/BasicPagination";
import RankingList from "../../components/ranking-list/RankingList";
import HeroIntro from "../../components/typo/hero-intro/HeroIntro";
import useQuery from "../../components/useQuery/useQuery";
import { hasErrorList, isLoadingList, loadBloggerList, selectBloggerList, selectErrorMessage } from "../../features/slices/blogger/bloggerSlice";
import BloggerListError from "./BloggerListError";
import BloggerListLoading from "./BloggerListLoading";

const processMode = (mode) => {
    if(mode === 'popular') return {
        title: "Most popular bloggers",
        subtitle: "More hearts equal more popularity!",
        type: "is-success"
    }

    if(mode === 'admin') return {
        title: "People who run the website",
        subtitle: "Can modify most functionalities of the website",
        type: "is-danger"
    }

    return {
        title: "Unknown search",
        subtitle: "Unknown search",
        type: "is-warning"
    }
}

const BloggerListPage = () => {
    const dispatch = useDispatch();
    const bloggersData = useSelector(selectBloggerList);
    const loadingList = useSelector(isLoadingList);
    const errorList = useSelector(hasErrorList);
    const errorMessage = useSelector(selectErrorMessage);
    const [currentPage, setCurrentPage] = useState(1);
    const query = useQuery();
    const mode = query.get("m");
    const heroMode = processMode(mode);

    useEffect(() => {
        dispatch(loadBloggerList({currentPage, mode}));
    }, [currentPage, mode])

    if(loadingList) return <BloggerListLoading />;

    if(errorList) return <BloggerListError error={errorMessage} />;

    console.log(bloggersData.count);

    return(
        <div className="container custom-container">
            <HeroIntro title={heroMode.title} subtitle={heroMode.subtitle} type={heroMode.type} />

            <div className="section p-5 has-background-light">
                <RankingList type="blogger" data={bloggersData.data}/>

                <BasicPagination page={currentPage} setPage={setCurrentPage} maxPage={calculateMaxPage(bloggersData.count, 10)}/>
            </div>
        </div>
    )
}

export default BloggerListPage;