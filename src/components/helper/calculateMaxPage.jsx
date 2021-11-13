const calculateMaxPage = (count, limit) => {
    return Math.ceil(count / limit);
}

export default calculateMaxPage;