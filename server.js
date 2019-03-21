const express = require('express');
const app = express();
const {json} = require('body-parser');
const ctrl = require('./usersCtrl');
app.use(json());

app.get('/api/user',ctrl.getUsers);
app.get('/api/user/:id', ctrl.getUserID);
app.get('/api/admin', ctrl.getAdmin);
app.get('/api/nonadmin', ctrl.getNonAdmins);
app.get('/api/type/:userType', ctrl.getUserType);

app.put('/api/user/:id', ctrl.updateUser);

app.post('/api/user', ctrl.createUser);

app.delete('/api/user/:id', ctrl.deleteUser);


app.listen(3000, console.log('working on port', 3000));