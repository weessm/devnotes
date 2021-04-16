module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send('Rodando')
    })

    app.route('/notes')
        .get(app.api.note.getNotes)

    app.route('/note/:id')
        .get(app.api.note.getNoteById)
        .put(app.api.note.putNote)
        .delete(app.api.note.deleteNote)

    app.route('/note')
        .post(app.api.note.postNote)
}