const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors");
const path = require('path');
const multer = require('multer')
// const { default: test } = require('node:test');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({ dest: './public/images' })

const testDatabase = [
    {
        navn: "Alocasia",
        slekt: "Aracea",
        vann: "50ml / En gang i uken",
        giftig: "Ja",
        beskrivelse: "Alocasia er en tropisk plante fra Araceae-familien, kjent for sine store, pilformede blader med markante årer. Bladene har ofte en blank overflate og kommer i varierte farger, fra mørkegrønn til sølvgrå. Alocasia trives i varme og fuktige omgivelser, men krever indirekte lys og jevn vanning. Planten er populær som stueplante på grunn av sitt unike, eksotiske utseende. Den kan være litt krevende å pleie, men belønner med imponerende løvverk når den får riktig stell. ",
        bilde: 'http://localhost:3000/images/IMG_5590.JPG'
        
    }
]
app.use(cors())
app.use(express.json());


app.get("/", (req, res) => {
    res.json(testDatabase[testDatabase.length - 1])
});

app.post("/submit", upload.single('uploaded_file'), (req, res) => {
    testDatabase.push(req.body)
    // console.log(testDatabase)
    res.json(testDatabase)
    console.log(req.file, req.body)
    // .catch(err => res.status(400).json(err))
})

app.get('/plantdatabase', (req, res) => {
    res.json(testDatabase)
})

// app.get("/plants", (req, res) => {
//     res.json(testDatabase[0])
// })

app.listen(3000, () => {
    console.log('app is running on port 3000')
});