const knex = require("../config/db.js")

module.exports = app => {

    const { existsOrError, isEmpty, validateID } = app.api.validator

    const getNotes = async (req, res) => {
        try {
            const notes = await knex('note').select('*')
            res.status(200).json(notes)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }

    const getNoteById = async (req, res) => {
        try {
            let note_id = req.params.id
            validateID(note_id, 'invalid parameters')

            const note = await knex('note').select().where({ note_id })
            existsOrError(note, 'note does not exist or not found')

            res.status(200).json(note)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }

    const postNote = async (req, res) => {
        try {
            let { note_title, note_body } = req.body
            existsOrError(note_title, 'empty title')
            existsOrError(note_body, 'empty body')

            await knex('note').insert({ note_title, note_body })
            res.status(201).send("new note created")
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }

    const putNote = async (req, res) => {
        try {
            let note_id = req.params.id
            validateID(note_id, 'invalid parameters')

            const noteFromDB = await knex('note').select().where({ note_id })
            existsOrError(noteFromDB, "note does not exist or not found")

            let { note_title, note_body } = req.body
            let finalNote

            if (isEmpty(note_title) && isEmpty(note_body)) {
                res.status(200)
            } else if (isEmpty(note_title)) {
                finalNote = await knex('note').update({ note_body }).where({ note_id })
            } else if (isEmpty(note_body)) {
                finalNote = await knex('note').update({ note_title }).where({ note_id })
            } else {
                finalNote = await knex('note').update({ note_title, note_body }).where({ note_id })
            }

            res.status(200).send({ finalNote })
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }

    const deleteNote = async (req, res) => {
        try {
            let note_id = req.params.id
            validateID(note_id, 'invalid parameters')

            const removedNote = await knex('note').del().where({ note_id })
            existsOrError(removedNote, 'note does not exist or not found')
            res.status(204).send()
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }

    return { getNotes, getNoteById, postNote, putNote, deleteNote }
}