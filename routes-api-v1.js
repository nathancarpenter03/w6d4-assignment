// Define a Node module that handles routing 
module.exports.setup = (router, uploads, knex) => {

    // 1. Load Libraries
     let moment = require('moment')

    // 2. Define routes

    // Get
    router.get('/todos', function (req, res) {
        knex.select('*').from('todos').table('todos').orderBy('category', 'asc').then(function(data) {
            res.json(data)
        })
    })

    // Post 
    router.post('/todos', function(req, res) {

        let now = moment().format('YYYY-MM-DD HH:mm:ss')

        knex('todos').insert({todo: req.body.todo.trim(), created_at: now, updated_at: now, completed: 'no', category: req.body.category, due_date: moment(req.body.due_date).format('YYYY-MM-DD')}).returning('*').then(function(data) {
            res.json(data)
        })
    })

    router.get('/todos/:todoId/complete', function(req, res) {
        knex.update(todo).table('todos').where('id', '=', req.params.todoId).then(function(data) {
            res.json(true)
        })
    })

    router.get('/todos/:todoId/incomplete', function(req, res) {
        knex.update(todo).table('todos').where('id', '=', req.params.todoId).then(function(data) {
            res.json(true)
        })
    })

    // Return the router, with new routes attached back to the Express web server thats loading these 
    return router
}



