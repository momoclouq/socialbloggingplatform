import RankingItem from "./RankingItem";

const RankingList = ({data, type}) => {
    return(
        <div className="columns is-multiline">
            {
                data.map((item, index) => {
                    return <RankingItem type={type} item={item} key={index} />
                })
            }
        </div>
    )
}

export default RankingList;