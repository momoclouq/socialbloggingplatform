const BackendPanel = () => {
    return (
        <div className="has-background-dark p-4">
            <p className="has-text-link-light title mb-6">Backend technologies</p>
            <div className="subtitle"><a className="has-text-link-light" href="https://expressjs.com">ExpressJs</a></div>
            <div className="subtitle"><a className="has-text-link-light" href="https://www.mongodb.com">MongoDB - Atlas</a></div>
            <div className="subtitle"><a className="has-text-link-light" href="https://mongoosejs.com">Mongoose</a></div>
            <div className="subtitle"><a className="has-text-link-light" href="https://www.passportjs.org">PassportJs</a></div>
            <div className="subtitle"><a className="has-text-link-light" href="https://express-validator.github.io/docs/">Express-validator</a></div>
            <div className="has-text-link-light mb-2">And many more ...</div>

            <div><a href="https://github.com/momoclouq/blog-backend" className="has-text-link-light">Github for backend (API)</a></div>
        </div>
    )
}

export default BackendPanel;