const { returnClarifaiRequestOptions } = require('../utils');

const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set('authorization', `Key ${process.env.CLARIFAI_API_KEY}`);

// Method 1 Using simple fetch
/*
const handleApiCall = (req, res) => {
  fetch(
    `https://api.clarifai.com/v2/models/face-detection/outputs`,
    returnClarifaiRequestOptions(req.body.input)
  )
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Unable to work with API'));
};
*/

// Method 2 using grpc
const handleApiCall = (req, res) => {
  stub.PostModelOutputs(
    {
      // This is the model ID of a FACE DETECT model.
      model_id: 'face-detection',
      inputs: [{ data: { image: { url: req.body.input } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log('Unable to work with API: ' + err);
        return res
          .status(503)
          .json({ message: `Unable to work with API: ${err}` });
      }

      if (response.status.code !== 10000) {
        console.log(
          'Received failed status: ' +
            response.status.description +
            '\n' +
            response.status.details
        );
        return res
          .status(404)
          .json({ message: `Error: ${response.status.description}` });
      }

      console.log('Predicted concepts, with confidence values:');
      for (const c of response.outputs[0].data.concepts) {
        console.log(c.name + ': ' + c.value);
      }

      res.json(response);
    }
  );
};

const handleImage = async (req, res, postgresDB) => {
  const { id } = req.body;
  try {
    const entries = await postgresDB('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('entries');

    res.json(entries[0].entries);
  } catch (err) {
    res.status(400).json('unable to get entries');
  }
};

module.exports = {
  handleImage,
  handleApiCall,
};
