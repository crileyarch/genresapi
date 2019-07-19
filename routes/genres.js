const express = require('express');
const router = express.Router();

router.use(express.json());

const genres = [
    {id: 1, name: "horror"},
    {id: 2, name: "romance"},
    {id: 3, name: "comedy"},
    {id: 4, name: "scifi"},
]


router.get('/', (req,res) => {
    console.log('In Genres GET')

    res.status(200).send(genres);

});

router.get('/:id', (req,res) => {
    console.log('In Genres GET with id')

    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) res.status(404);
    res.send(genre);
});

router.post('/', (req,res) => {
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

router.put('/:id', (req,res) => {
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

router.delete('/:id', (req,res) => {
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

module.exports = router;