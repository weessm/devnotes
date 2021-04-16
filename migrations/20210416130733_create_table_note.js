exports.up = function (knex) {
    return knex.schema.createTable('note', (table) => {
        table.increments('note_id').primary()
        table.string('note_title').notNullable()
        table.text('note_body').notNullable()
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('note')
}
