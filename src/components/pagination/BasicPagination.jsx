const PaginationSmall = ({page, setPage, maxPage, maximum}) => {
    const displayOutput = (() => {
        let output = [];

        for(let i = 1; i <= maximum; i++){
            output.push(
                <li key={i}>
                    <button onClick={() => {setPage(i)}} className={`button is-light pagination-link ${page == i ? "is-current" : ""}`} aria-label={`Go to page ${i}`}>{i}</button>
                </li>
            )
        }

        return output;
    })();

    return(
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <ul className="pagination-list">
                {displayOutput}

                {   
                    maximum < maxPage
                    ? <>
                        <li>
                            <span className="pagination-ellipsis">&hellip;</span>
                        </li>
                        <li>
                            <button onClick={() => {setPage(maxPage)}} className="button is-light pagination-next"><i className="fas fa-angle-double-right"></i></button>
                        </li>
                    </>
                    : <></>
                }
            </ul>
        </nav>
    )
}

const PaginationBig = ({page, setPage, maxPage, maximum}) => {
    const displayOutput = (() => {
        let output = [];

        for(let i = page - 2; i <= maximum; i++){ 
            output.push(
                <li key={i}>
                    <button onClick={() => {setPage(i)}} className={`button is-light pagination-link ${page == i ? "is-current" : ""}`} aria-label={`Go to page ${i}`}>{i}</button>
                </li>
            )
        }

        return output;
    })();

    return(
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <ul className="pagination-list">
                <li>
                    <button onClick={() => {setPage(1)}} className="button is-light pagination-previous"><i className="fas fa-angle-double-left"></i></button>
                </li>

                <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                </li>
                {displayOutput}

                {maximum < maxPage ? 
                    <>
                        <li>
                            <span className="pagination-ellipsis">&hellip;</span>
                        </li>
                        <li>
                            <button onClick={() => {setPage(maxPage)}} className="button is-light pagination-next"><i className="fas fa-angle-double-right"></i></button>
                        </li>
                    </>
                    : <></>
                }
            </ul>
        </nav>
    )
}

const BasicPagination = ({page, setPage, maxPage}) => {
    const maximum = Math.min(maxPage, page + 2);

    if(page < 4){
        return <PaginationSmall page={page} setPage={setPage} maxPage={maxPage} maximum={maximum}/>
    } else {
        return <PaginationBig page={page} setPage={setPage} maxPage={maxPage} maximum={maximum}/>
    }
}

export default BasicPagination;