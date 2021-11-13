const HeroIntro = ({title, subtitle, type}) => {
    return(
        <div className={`hero ${type}`}>
            <div className="hero-body">
                <p className="title">{title}</p>
                <p className="subtitle">{subtitle}</p>
            </div>
        </div>
    )
}

export default HeroIntro;