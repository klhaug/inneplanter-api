const express = require('express');
const cors = require("cors");
const path = require('path');
const { default: test } = require('node:test');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const testDatabase = [
    {
        Navn: "Alocasia",
        Slekt: "Aracea",
        Vann: "50ml / En gang i uken",
        Giftig: "Ja",
        Beskrivelse: "Alocasia er en tropisk plante fra Araceae-familien, kjent for sine store, pilformede blader med markante årer. Bladene har ofte en blank overflate og kommer i varierte farger, fra mørkegrønn til sølvgrå. Alocasia trives i varme og fuktige omgivelser, men krever indirekte lys og jevn vanning. Planten er populær som stueplante på grunn av sitt unike, eksotiske utseende. Den kan være litt krevende å pleie, men belønner med imponerende løvverk når den får riktig stell.",
        Bilde: 'http://localhost:3000/images/IMG_5590.JPG'
        
    }
]
app.use(cors())

app.get("/", (req, res) => {
    res.json(testDatabase[0])
});

// app.get("/plants", (req, res) => {
//     res.json(testDatabase[0])
// })

app.listen(3000, () => {
    console.log('app is running on port 3000')
});