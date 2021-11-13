import { useDispatch } from "react-redux";
import { heartBlogger } from "../../../features/slices/blogger/bloggerSlice";

const HeartBtn = ({bloggerid}) => {
    const dispatch = useDispatch();

    const giveHeart = () => {
        dispatch(heartBlogger(bloggerid))
    }

    return(
        <button onClick={giveHeart} className="button">Give a heart</button>
    )
}

export default HeartBtn;