
const express = require('express');
const cors = require("cors");
const path = require('path');
const multer = require('multer')
const knex = require ('knex');
const sharp = require ('sharp');
const {Storage} = require('@google-cloud/storage');


const app = express();
app.use(cors())
app.use(express.json());


const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost', // HER Må VI OPPDATERE NÅR VI SKAL HOSTE DETTE ET ANNET STED
    user : 'kristianhaug',
    password : '',
    database : 'inneplanter'
  }
})

app.use(express.static(path.join(__dirname, 'public')));


const upload = multer({ dest: 'public/images/' });


// Copyright [yyyy] [name of copyright owner]

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


function main(
  destFileName = 'destFileName',
  filePath = 'yourfilepath',
  generationMatchPrecondition = 0
) {
    // The ID of your GCS bucket
    const bucketName = 'random-test1234-bucket-02'

    // The path to your file to upload
    // const filePath = "public/images/ficuslyrata.jpg"

    // The new ID for your GCS file
    // const destFileName = 'file2.txt'

    // Imports the Google Cloud client library
    const {Storage} = require('@google-cloud/storage');

    // Creates a client
    const storage = new Storage({
      projectId: 'bright-lattice-439207-u2',
      credentials: require("/Users/kristianhaug/Desktop/Zero To Mastery/STAGE_2/inneplanter/inneplanter-api/bright-lattice-439207-u2-d896b7ca02fb.json")
    });

  async function uploadFile() {
    const options = {
      destination: destFileName,
      // Optional:
      // Set a generation-match precondition to avoid potential race conditions
      // and data corruptions. The request to upload is aborted if the object's
      // generation number does not match your precondition. For a destination
      // object that does not yet exist, set the ifGenerationMatch precondition to 0
      // If the destination object already exists in your bucket, set instead a
      // generation-match precondition using its generation number.
      preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
    };

    await storage.bucket(bucketName).upload(filePath, options);
    console.log(`${filePath} uploaded to ${bucketName}`);
  }

  uploadFile().catch(console.error);
  // [END storage_upload_file]
}



app.get("/", (req, res) => {
    res.json("It's working!")
});


app.post('/upload', upload.single('bilde'), async (req, res) => {
  const { navn, slekt, vann, giftig, beskrivelse, id } = req.body;
  const { file } = req;
  if (!navn || !slekt || !vann || !giftig || !beskrivelse || !id) {
    return res.status(400).json('incorrect form submission')
  }
  
  let giftigVar = null;
  if (giftig === 'Ja') {
    giftigVar = true
  } else {
    giftigVar = false
  }


  const imageName = Date.now() + path.extname(file.originalname);
    try {
      main(
        destFileName = imageName,
        filePath = file.path) 

    } catch(err) {
      res.json("Failed to upload image", err)
    }      
    
    db('plants')
      .returning('*')
      .insert ({
              navn: navn,
              slekt: slekt,
              vann: vann,
              giftig: giftigVar,
              beskrivelse: beskrivelse,
              imagepath: `https://storage.googleapis.com/random-test1234-bucket-02/${imageName}`,
              id: id
             })
           .then(plant => {
              res.json(plant[0])
          })
          .catch(err => res.status(400).json("Failed to upload to database", err))
})

app.get('/plantdatabase', (req, res) => {
    db.select('*').from('plants')
      .then(data => res.json(data))
      .catch(err => res.status(400).json("Failed to fetch database", err));
});


const DATABASE_URL = process.env.DATABASE_URL;

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
});