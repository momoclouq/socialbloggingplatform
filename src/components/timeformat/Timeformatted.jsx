const processTimeElement = (element) => {
    if(element < 10) element = "0" + element;
    return element;
}

const Timeformatted = ({timeString, extraStyle = []}) => {
    const time = new Date(timeString);

    const extraStyleFormatted = (() => {
        let output = "";

        for(let i = 0; i < extraStyle.length; i++){
            output += " " + extraStyle[i];
        }

        return output
    })();

    return(
        <span className={extraStyleFormatted}>
            {processTimeElement(time.getHours())}:{processTimeElement(time.getMinutes())} - {processTimeElement(time.getDate()) + "/" + (processTimeElement(time.getMonth() + 1)) + "/" + time.getFullYear()}
        </span>
    )
}

export default Timeformatted;

