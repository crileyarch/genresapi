const config = require("config");
const Joi = require('joi');
const express = require('express');
const app = express();
const morgan = require('morgan');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log();

app.use(express.json());

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Database Server Name: ' + config.get('database.host'));


if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled....');
}




const genres = [
    {id: 1, name: "horror"},
    {id: 2, name: "romance"},
    {id: 3, name: "comedy"},
    {id: 4, name: "scifi"},
]

app.use(express.json());

app.get('/api/genres', (req,res) => {
    console.log('In Genres GET')

    res.status(200).send(genres);

});

app.get('/api/genres/:id', (req,res) => {
    console.log('In Genres GET with id')

    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) res.status(404);
    res.send(genre);
});

app.post('/api/genres', (req,res) => {
    console.log('In Genres POST')

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req,res) => {
    console.log('In Genres PUT')
    // confirm id exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) res.status(404);

    // validate
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //update genre
    genre.name = req.body.name;

    //send response
    res.send(genre);

});

app.delete('/api/genres/:id', (req,res) => {
    console.log('In Genres DELETE')

    // confirm id exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) res.status(404);

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);

});

function validateGenre(genre){

    const schema = {
        name: Joi.string().min(3).required()
    };

    return result = Joi.validate(genre, schema);

}

// Environment variable for Port
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}....`));