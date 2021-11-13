import ContactPageBlock from "../../components/typo/contact-page-block/ContactPageBlock";
import BackendPanel from "./BackendPanel";
import FrontendPanel from "./FrontendPanel";

import githubIcon from "./github_icon.png";

const ContactDevPage = () => {
    return(
        <div className="container is-fluid ">
            <div className="container mt-4">
                <div className="title is-size-2">About me</div>

                <ContactPageBlock>
                    My name is <strong>Pham Hoang Minh</strong>, a student of RMIT university Ho Chi Minh City
                </ContactPageBlock>

                <ContactPageBlock>
                    I have interests in web development in general and am striving to be a fullstack developer with the main stack: <strong>React, Nodejs</strong>
                </ContactPageBlock>

                <ContactPageBlock>
                    <div className="is-flex is-align-items-center">
                        <div className="is-size-4 mr-4">Email: phamhoangminh050899@gmail.com</div>
                        <div>
                            <a href="https://github.com/momoclouq">
                                <figure className="image is-64x64">
                                    <img src={githubIcon} alt="github icon" />
                                </figure>
                            </a>
                        </div>
                    </div>
                    
                </ContactPageBlock>

                <br />
                
                <div className="title is-size-2">About this project</div>

                <ContactPageBlock>
                    This 'blog' website is among one of the projects in my portfolio. This website is made with:
                </ContactPageBlock>

                <div className="hero is-medium">
                    <div className="columns">
                        <div className="column is-half">
                            <FrontendPanel />
                        </div>
                        <div className="column is-half">
                            <BackendPanel />
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default ContactDevPage;