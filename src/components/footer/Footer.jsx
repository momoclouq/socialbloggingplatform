import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <footer className="footer px-4">
            <div className="level">
                <div className="level-left">
                    <div className="level-item has-text-dark">
                        <p>
                            Built by <a className="has-text-link" href="https://github.com/momoclouq"><strong>Momocloud</strong></a> using <a className="has-text-success" href="https://bulma.io">Bulma</a>
                        </p>
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <Link to="/contact">Contact developer</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;