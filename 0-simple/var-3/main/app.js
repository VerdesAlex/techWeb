const express = require('express')
const cors = require('cors');

const app = express()

app.use(express.static('public'));

app.locals.data = [{
    name :  'jim',
    job : 'engineer'
},{
    name :  'tim',
    job : 'accountant'
},{
    name :  'ann',
    job : 'accountant'
}]

app.get('/employees', (req, res) => {
    let sortOrder = req.query.sortOrder ? parseInt(req.query.sortOrder) : 1
    res.status(200).json(app.locals.data.sort((a, b) => {
        if (a.name > b.name) { 
            return 1 * sortOrder
        }
        if (a.name < b.name) { 
            return -1 * sortOrder
        }
        return 0
    }))
})

module.exports = app