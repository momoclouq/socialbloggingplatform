import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const StyledLink = ({children, to, colorStart, colorHover, addtionalStyle = null}) => {
    const theLink = useRef(null);

    useEffect(() => {
        theLink.current.style.color = colorStart;
    }, [])

    const handleMouseEnter = () => {
        theLink.current.style.color = colorHover;
    }

    const handleMouseLeave = () => {
        theLink.current.style.color = colorStart;
    }

    return(
        <Link
            ref={theLink}
            to={to}
            style={addtionalStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </Link>
    )
}

export default StyledLink;