import processPath from "../helper/processPath";
import StyledLink from "../styled-link/StyledLink";

const RankingItem = ({item, type}) => {
    return(
        <div className="column is-full">
            <div className="box is-flex is-justify-content-space-between is-align-items-center">
                <div className="pr-4">
                    <div className="title">
                        <StyledLink to={processPath(type, item._id)} colorStart="#000000" colorHover="#643296">
                            {item.username}   
                        </StyledLink>
                        {
                            item.is_admin ? <span className="subtitle is-6"> [ADMIN]</span> : ""
                        }
                    </div> 
                    <div className="subtitle">{item.motto}</div>
                </div>
                
                <div className="is-flex is-flex-direction-column is-align-items-center">
                    <div style={{color: "#ff003c"}}><i className="fas fa-heart"></i></div> 
                    <div>{item.heart}</div>
                </div>
            </div>
        </div>
    )
}

export default RankingItem;