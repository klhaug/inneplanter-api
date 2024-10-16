const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors");
const path = require('path');
const multer = require('multer')
// const { default: test } = require('node:test');

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
        imagePath: '/images/IMG_5590.JPG'
        
    },
    {
      navn: "Monstera Deliciosa",
      slekt: "Araceae",
      vann: "60ml / En gang i uken",
      giftig: "Ja",
      beskrivelse: "Monstera Deliciosa er kjent for sine karakteristiske delte blader som gir et eksotisk utseende. Den er en klatreplante fra tropiske skoger og trives godt i indirekte lys. Monstera trenger jevn vanning, men bør tørke ut litt mellom vanningene. Den kan bli stor og er en favoritt blant planteelskere på grunn av sitt unike utseende.",
      imagePath: '/images/monstera.jpg'
    },
    {
      navn: "Ficus Lyrata",
      slekt: "Moraceae",
      vann: "70ml / En gang i uken",
      giftig: "Ja",
      beskrivelse: "Ficus Lyrata, også kjent som fiolinfiken, er en høy plante med store, fiolinformede blader. Den krever rikelig med lys, men ikke direkte sol. Den bør vannes jevnlig, men jorden bør få tørke opp mellom vanningene. Ficus Lyrata er kjent for sin høye dekorative verdi.",
      imagePath: '/images/ficuslyrata.jpg'
    },
    {
      navn: "Spathiphyllum",
      slekt: "Araceae",
      vann: "40ml / To ganger i uken",
      giftig: "Ja",
      beskrivelse: "Spathiphyllum, eller fredslilje, er en lettstelt stueplante som er kjent for sine vakre hvite blomster. Den trives i lavt lys og krever jevn vanning, spesielt i vekstsesongen. Denne planten er også kjent for sine luftrensende egenskaper.",
      imagePath: '/images/Spathiphyllum .webp'
    },
    {
      navn: "Pilea Peperomioides",
      slekt: "Urticaceae",
      vann: "30ml / En gang i uken",
      giftig: "Nei",
      beskrivelse: "Pilea Peperomioides, også kjent som kinesisk pengeplante, er populær for sine runde, mynteformede blader. Den trives best i indirekte lys og krever lite vann, men jorden bør ikke tørke helt ut. Denne planten er kjent for sin evne til å produsere mange nye skudd.",
      imagePath: '/images/Pilea-Peperomioides.jpeg'
    },
    {
      navn: "Sansevieria Trifasciata",
      slekt: "Asparagaceae",
      vann: "20ml / Hver andre uke",
      giftig: "Ja",
      beskrivelse: "Sansevieria Trifasciata, eller svigermorstunge, er en svært robust plante som tåler både tørke og lite lys. Bladene er lange og sverdformede, ofte med mønstrede striper i grønt og gult. Planten er populær i moderne interiør på grunn av sitt minimalistiske utseende.",
      imagePath: '/images/Sansevieria Trifasciata.jpg'
    },
    {
      navn: "Philodendron",
      slekt: "Araceae",
      vann: "50ml / En gang i uken",
      giftig: "Ja",
      beskrivelse: "Philodendron er en tropisk klatreplante kjent for sine store, hjerteformede blader. Den trives i indirekte lys og liker høy luftfuktighet. Denne planten krever jevn vanning, men jorden bør tørke litt ut mellom hver vanning.",
      imagePath: '/images/Philodendron.jpeg'
    },
    {
      navn: "Calathea Orbifolia",
      slekt: "Marantaceae",
      vann: "50ml / To ganger i uken",
      giftig: "Nei",
      beskrivelse: "Calathea Orbifolia er kjent for sine store, runde blader med sølvstriper. Denne planten trives i fuktige omgivelser og indirekte lys, og bør vannes jevnlig for å unngå at bladene blir brune. Calathea er en av få planter som ikke er giftig for kjæledyr.",
      imagePath: '/images/Calathea Orbifolia.jpg'
    },
    {
      navn: "Dracaena Marginata",
      slekt: "Asparagaceae",
      vann: "40ml / En gang i uken",
      giftig: "Ja",
      beskrivelse: "Dracaena Marginata er en elegant plante med smale, spisse blader som har røde kanter. Denne planten trives i sterkt, indirekte lys og er lettstelt, men krever jevn vanning uten at røttene blir stående i vann.",
      imagePath: '/images/Dracaena Marginata.webp'
    },
    {
      navn: "Chlorophytum Comosum",
      slekt: "Asparagaceae",
      vann: "30ml / En gang i uken",
      giftig: "Nei",
      beskrivelse: "Chlorophytum Comosum, også kjent som grønnrenner, er en robust plante som tåler varierende lysforhold. Den krever lite stell og trives godt i de fleste miljøer. Grønnrenner er også kjent for sine luftrensende egenskaper.",
      imagePath: '/images/Chlorophytum Comosum.jpg'
    },
    {
      navn: "Zamioculcas Zamiifolia",
      slekt: "Araceae",
      vann: "20ml / Hver tredje uke",
      giftig: "Ja",
      beskrivelse: "Zamioculcas Zamiifolia, eller zamiaplante, er kjent for sin evne til å overleve under de fleste forhold, inkludert lite lys og sjelden vanning. Den har tykke, blanke blader som kan lagre vann, og er derfor en ypperlig plante for de som glemmer å vanne ofte.",
      imagePath: '/images/Zamioculcas Zamiifolia.webp'
    }
    
]
app.use(cors())
app.use(express.json());


app.get("/", (req, res) => {
    res.json(testDatabase[testDatabase.length - 1])
});

app.post("/submit", upload.single('bilde'), (req, res) => {
    const { navn, slekt, vann, giftig, beskrivelse } = req.body;

   try {
       testDatabase.push({
        navn: navn,
         slekt: slekt,
         vann: vann,
         giftig: giftig,
         beskrivelse: beskrivelse,
         imagePath: `/images/${req.file.filename}`,
         file: req.file
        })
       // console.log(testDatabase)
       res.json({
        message: 'Plant data and image uploaded successfully',
        testDatabase

    })
       console.log(testDatabase)
       // .catch(err => res.status(400).json(err))
   } catch (err) {
    res.status(400).send(err)
   }
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