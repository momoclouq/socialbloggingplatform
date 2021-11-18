const FrontendPanel = () => {
    return(
        <div className="has-background-light p-4">
            <p className="title mb-6">Frontend technologies</p>
            <div className="subtitle">
                <a href="https://expressjs.com">ReactJs</a>
            </div>
            <div className="subtitle"><a href="https://redux.js.org">Redux</a></div>
            <div className="subtitle"><a href="https://react-redux.js.org/introduction/getting-started">React-redux</a></div>
            <div className="subtitle"><a href="https://bulma.io">Bulma</a></div>
            <div className="subtitle"><a href="https://sass-lang.com">Sass</a></div>
            <div className="mb-2">And many more ...</div>

            <div><a href="https://github.com/momoclouq/socialbloggingplatform">Github for frontend</a></div>
        </div>
    )
}

export default FrontendPanel;