const express = require('express');
const morgan = require('morgan'); // Correctly import morgan
const app = express();

app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


let notes = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 1;
    return String(Math.floor(Math.random() * maxId * 1000));
};


app.post('/api/persons', (request, response) => {  // Correct route name
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }
    const duplicate = notes.find(note => note.name === body.name || note.number === body.number);
    if (duplicate) {
        return response.status(400).json({
            error: 'name or number already exists'
        });
    }
    const note = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    notes = notes.concat(note);

    response.json(note);
});

app.get('/api/persons', (request, response) => {
    response.json(notes);
});

app.get('/info', (request, response) => {
    const currentDate = new Date().toLocaleString();
    const numberOfEntries = notes.length;
    response.send(
        `<p>Phonebook has info for ${numberOfEntries} people</p><br/>` +
        `<p>${currentDate}</p>`
    );
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find(note => note.id === id);

    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
