module.exports = (app) => {
    app.get(
        "/api/searches",
        (req, res) => {
            res.send(req)
        }
        )
    app.get(
        "/api/search",
        (req, res) => {
            res.send(req)
        }
    )
    app.post(
        "/api/new_search",
        () => {}
    )
}
