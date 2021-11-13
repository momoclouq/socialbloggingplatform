import StyledLink from "../styled-link/StyledLink";
import Timeformatted from "../timeformat/Timeformatted";

const PostCard = ({post}) => {
    return(
        <div className="column is-half">
            <div className="card">
                <div className="card-content">
                    <div className="title">
                        <StyledLink to={`/post/${post._id}`} colorStart="#1f1f1f" colorHover="#382fe0">{post.title}</StyledLink>
                    </div>
                    <div className="subtitle mt-3">
                        {post.subtitle}
                    </div>
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item"><StyledLink to={`/blogger/${post.author._id}`} colorStart="#4b2b54" colorHover="#1a111c">{post.author.username}</StyledLink></div>
                    <Timeformatted extraStyle={["card-footer-item"]} timeString={post.date_created}/>
                </footer>
            </div>
        </div>
    )
}

export default PostCard;