const users = require('./userData.json');

module.exports = {
    getUsers: function (request, response)
    {
        const {age, email, favorites} = request.query
        if(age)
        {
            const ageArray = users.filter((curVal) =>{
                return curVal.age < age
            })
            response.status(200).send(ageArray);
        } else if(email)
        {
            const emailArray = users.filter((curVal) =>{
                return curVal.email === email
            })
            response.status(200).send(emailArray);
        } else if(favorites)
        {
            const favoritesArray = users.filter((curVal) =>{
                return curVal.favorites.includes(favorites)
            })
            response.status(200).send(favoritesArray);

        } else{
            response.status(200).send(users)
        }
    },
    getUserID: function (request, response)
    {
        const {id} = request.params
        const user = users.filter((curVal) =>
        {
            return curVal.id === +id
        })
        if(user[0])
        {
            response.status(200).send(user[0]);
        }else{
            response.status(404).send(users);
        }
    },
    getAdmin: function(request, response)
    {
        const admins = users.filter((curVal) =>{
            return curVal.type === 'admin'
        })
        response.status(200).send(admins);
    },
    getNonAdmins: function (request, response)
    {
        const nonAdmins = users.filter((curVal) =>
        {
            return curVal.type !== 'admin'
        })
        response.status(200).send(nonAdmins);
    },
    getUserType: function(request, response)
    {
        const {userType} = request.params;
        const usersByType = users.filter((curVal) =>
        {
            return curVal.type === userType
        })
        response.status(200).send(usersByType);
    },
    updateUser: function(request, response)
    {
        const {id} = request.params
        const {body: user} = request
        const userIndex = users.findIndex((curVal) =>
        {
            return curVal.id === +id
        })
        if(userIndex)
        {
            user.id = +id;
            users[userIndex] = user;
            response.status(200).send(users);
        }

    },
    createUser: function(request, response)
    {
        const {body} = request;
        body.id = users[users.length -1].id + 1;
        users.push(body);
        response.status(200).send(users);
    },
    deleteUser: function(request, response)
    {
        const {id} = request.params
        const userIndex = users.findIndex((curVal) =>
        {
            return curVal.id === +id
        })
        if(userIndex)
        {
            users.splice(userIndex, 1);
            response.status(200).send(users);
        }
        else{
            response.status(404).send(users);
        }
        
    }
}