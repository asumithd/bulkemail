module.exports = (app) => { 
    const bulkmail = require('../controllers/bulkmail.controller.js');
    app.post('/api/bulkmail', bulkmail.create);
    app.get('/api/bulkmail', bulkmail.findAll);
    app.get('/api/bulkmail/:id', bulkmail.findOne);
    app.put('/api/bulkmail/:id', bulkmail.update);
    app.delete('/api/bulkmail/:id', bulkmail.delete);

}