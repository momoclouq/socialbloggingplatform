import PostCard from "./PostCard";

const PostGrid = ({posts}) => {
    return(
        <div className="columns is-7 is-multiline">
            {
                posts.map((post, index) => {
                    return(
                        <PostCard post={post} key={index}/>
                    )
                })
            }
        </div>
    )
}

export default PostGrid;