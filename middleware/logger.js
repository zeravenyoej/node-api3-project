module.exports = (format) => {
    return (req, res, next) => {
        const { ip, method, url } = req
        const agent = req.get("User-Agent")
        if (format === "short") {
            console.log(`method: ${method}, url: ${url}`)
        } else {
            console.log(`ip: ${ip}, method: ${method}, url: ${url}, agent: ${agent}`)
        }
        next()
    }
}