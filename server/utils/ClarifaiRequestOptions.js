const returnClarifaiRequestOptions = (imageUrl) => {
   const PAT = process.env.CLARIFAI_PAT;
   const USER_ID = process.env.CLARIFAI_USER_ID;
   const APP_ID = process.env.CLARIFAI_APP_ID;
   // const MODEL_ID = 'face-detection';
   const IMAGE_URL = imageUrl;
 
   const raw = JSON.stringify({
     user_app_id: {
       user_id: USER_ID,
       app_id: APP_ID,
     },
     inputs: [
       {
         data: {
           image: {
             url: IMAGE_URL,
           },
         },
       },
     ],
   });
 
   return {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       Authorization: 'Key ' + PAT,
     },
     body: raw,
   };
 };
 
 module.exports = {
   returnClarifaiRequestOptions
 }