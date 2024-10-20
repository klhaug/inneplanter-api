const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors");
const path = require('path');
const multer = require('multer')
const knex = require ('knex');
// const { default: test } = require('node:test');

const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost', // HER Må VI OPPDATERE NÅR VI SKAL HOSTE DETTE ET ANNET STED
    user : 'kristianhaug',
    password : '',
    database : 'inneplanter'
  }
})


db.select('*').from('plants').then (data => {
  console.log(data);
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Multer storage configuration
const storage = multer.diskStorage({
    // Destination: where the files will be saved
    destination: (req, file, cb) => {
      cb(null, 'public/images/'); // Make sure the 'uploads/' folder exists
    },
    // Filename: how the file will be named
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Preserve the original extension
    }
  });


  //SET UP SERVER SIDE IMAGE RENDERING
//SENDING THE IMAGE TO GOOGLE CLOUD

// Initialize Google Cloud Storage
// const storage = new Storage();
// const bucket = storage.bucket('your-bucket-name');

 
// Initialize Multer with the storage config
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
      // Only accept certain file types (e.g., images)
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'));
      }
    }
  }); 



const testDatabase = [
    {
        navn: "Alocasia",
        slekt: "Aracea",
        vann: "50ml / En gang i uken",
        giftig: "Ja",
        beskrivelse: "Alocasia er en tropisk plante fra Araceae-familien, kjent for sine store, pilformede blader med markante årer. Bladene har ofte en blank overflate og kommer i varierte farger, fra mørkegrønn til sølvgrå. Alocasia trives i varme og fuktige omgivelser, men krever indirekte lys og jevn vanning. Planten er populær som stueplante på grunn av sitt unike, eksotiske utseende. Den kan være litt krevende å pleie, men belønner med imponerende løvverk når den får riktig stell. ",
        imagePath: '/images/IMG_5590.JPG',
        id: '69b8472b-1f60-4074-beda-fd845f687d01'
        
        
    },
    {
      navn: "Monstera Deliciosa",
      slekt: "Araceae",
      vann: "60ml / En gang i uken",
      giftig: "Ja",
      beskrivelse: "Monstera Deliciosa er kjent for sine karakteristiske delte blader som gir et eksotisk utseende. Den er en klatreplante fra tropiske skoger og trives godt i indirekte lys. Monstera trenger jevn vanning, men bør tørke ut litt mellom vanningene. Den kan bli stor og er en favoritt blant planteelskere på grunn av sitt unike utseende.",
      imagePath: '/images/monstera.jpg',
      id: '756ef67f-41b5-4471-a7ce-7a9f6749e345'
    },
    {
      navn: "Ficus Lyrata",
      slekt: "Moraceae",
      vann: "70ml / En gang i uken",
      giftig: "Ja",
      beskrivelse: "Ficus Lyrata, også kjent som fiolinfiken, er en høy plante med store, fiolinformede blader. Den krever rikelig med lys, men ikke direkte sol. Den bør vannes jevnlig, men jorden bør få tørke opp mellom vanningene. Ficus Lyrata er kjent for sin høye dekorative verdi.",
      imagePath: '/images/ficuslyrata.jpg',
      id: '52d7423c-8a4a-4000-8b22-5bf949b7af13'
    },
    {
      navn: "Spathiphyllum",
      slekt: "Araceae",
      vann: "40ml / To ganger i uken",
      giftig: "Ja",
      beskrivelse: "Spathiphyllum, eller fredslilje, er en lettstelt stueplante som er kjent for sine vakre hvite blomster. Den trives i lavt lys og krever jevn vanning, spesielt i vekstsesongen. Denne planten er også kjent for sine luftrensende egenskaper.",
      imagePath: '/images/Spathiphyllum .webp',
      id: 'da6023c6-87c6-4305-b73b-d6303027b56a'
    },
    {
      navn: "Pilea Peperomioides",
      slekt: "Urticaceae",
      vann: "30ml / En gang i uken",
      giftig: "Nei",
      beskrivelse: "Pilea Peperomioides, også kjent som kinesisk pengeplante, er populær for sine runde, mynteformede blader. Den trives best i indirekte lys og krever lite vann, men jorden bør ikke tørke helt ut. Denne planten er kjent for sin evne til å produsere mange nye skudd.",
      imagePath: '/images/Pilea-Peperomioides.jpeg',
      id: '3e4e4314-cf77-4003-8cc1-c9135a876650'
    },
    {
      navn: "Sansevieria Trifasciata",
      slekt: "Asparagaceae",
      vann: "20ml / Hver andre uke",
      giftig: "Ja",
      beskrivelse: "Sansevieria Trifasciata, eller svigermorstunge, er en svært robust plante som tåler både tørke og lite lys. Bladene er lange og sverdformede, ofte med mønstrede striper i grønt og gult. Planten er populær i moderne interiør på grunn av sitt minimalistiske utseende.",
      imagePath: '/images/Sansevieria Trifasciata.jpg',
      id: 'b70634b2-4d70-4a33-8c97-fd0352f089a1'
    },
    {
      navn: "Philodendron",
      slekt: "Araceae",
      vann: "50ml / En gang i uken",
      giftig: "Ja",
      beskrivelse: "Philodendron er en tropisk klatreplante kjent for sine store, hjerteformede blader. Den trives i indirekte lys og liker høy luftfuktighet. Denne planten krever jevn vanning, men jorden bør tørke litt ut mellom hver vanning.",
      imagePath: '/images/Philodendron.jpeg',
      id: '2c8a3a36-8644-4bc2-b505-a67049f7b6ba'
    },
    {
      navn: "Calathea Orbifolia",
      slekt: "Marantaceae",
      vann: "50ml / To ganger i uken",
      giftig: "Nei",
      beskrivelse: "Calathea Orbifolia er kjent for sine store, runde blader med sølvstriper. Denne planten trives i fuktige omgivelser og indirekte lys, og bør vannes jevnlig for å unngå at bladene blir brune. Calathea er en av få planter som ikke er giftig for kjæledyr.",
      imagePath: '/images/Calathea Orbifolia.jpg',
      id: '281cce1b-c149-4636-9164-5a20e2f2a2a9'
    },
    {
      navn: "Dracaena Marginata",
      slekt: "Asparagaceae",
      vann: "40ml / En gang i uken",
      giftig: "Ja",
      beskrivelse: "Dracaena Marginata er en elegant plante med smale, spisse blader som har røde kanter. Denne planten trives i sterkt, indirekte lys og er lettstelt, men krever jevn vanning uten at røttene blir stående i vann.",
      imagePath: '/images/Dracaena Marginata.webp',
      id: 'c6f85ec2-d7ad-41df-a01d-411a8e438cd8'
    },
    {
      navn: "Chlorophytum Comosum",
      slekt: "Asparagaceae",
      vann: "30ml / En gang i uken",
      giftig: "Nei",
      beskrivelse: "Chlorophytum Comosum, også kjent som grønnrenner, er en robust plante som tåler varierende lysforhold. Den krever lite stell og trives godt i de fleste miljøer. Grønnrenner er også kjent for sine luftrensende egenskaper.",
      imagePath: '/images/Chlorophytum Comosum.jpg',
      id: 'd878c0ed-9c1c-4000-86df-b90df73b1b83'
    },
    {
      navn: "Zamioculcas Zamiifolia",
      slekt: "Araceae",
      vann: "20ml / Hver tredje uke",
      giftig: "Ja",
      beskrivelse: "Zamioculcas Zamiifolia, eller zamiaplante, er kjent for sin evne til å overleve under de fleste forhold, inkludert lite lys og sjelden vanning. Den har tykke, blanke blader som kan lagre vann, og er derfor en ypperlig plante for de som glemmer å vanne ofte.",
      imagePath: '/images/Zamioculcas Zamiifolia.webp',
      id: 'a9c45b18-f233-47c8-9f6d-0e32c3e253f1'
    }
    
]
app.use(cors())
app.use(express.json());


app.get("/", (req, res) => {
    res.json(testDatabase[testDatabase.length - 1])
});

app.post("/submit", upload.single('bilde'), (req, res) => {
    const { navn, slekt, vann, giftig, beskrivelse, id } = req.body;
    db('plants')
      .returning('*')
      .insert ({
          navn: navn,
          slekt: slekt,
          vann: vann,
          giftig: true,
          beskrivelse: beskrivelse,
          imagepath: `/images/${req.file.filename}`,
          id: id
    }).then(plant => {
      res.json(plant[0])
      })
      .catch(err => res.status(400).json(err))
  })
  //  try {
  //      testDatabase.push({
  //       navn: navn,
  //        slekt: slekt,
  //        vann: vann,
  //        giftig: giftig,
  //        beskrivelse: beskrivelse,
  //        imagePath: `/images/${req.file.filename}`,
  //        file: req.file,
  //        id: id
  //       })
       // console.log(testDatabase)
       // .catch(err => res.status(400).json(err))

app.get('/plantdatabase', (req, res) => {
    res.json(testDatabase)
})

// app.get("/plants", (req, res) => {
//     res.json(testDatabase[0])
// })

app.listen(3000, () => {
    console.log('app is running on port 3000')
});