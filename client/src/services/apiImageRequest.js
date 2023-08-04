import { toast } from 'react-toastify';

const handleImageUrl = async(input) => {
   try {
      const response = await fetch('http://localhost:3001/imageurl', {
         method: 'post',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': window.sessionStorage.getItem('token'),
         },
         body: JSON.stringify({
           input,
         }),
       });

       if (!response.ok) {
         toast.error('Invalid ImageUrl');
         throw new Error('Invalid ImageUrl');
       }
 
       return await response.json();
   } catch (error) {
      throw new Error('Invalid ImageUrl ' + error.message);
   }

}

const handleImage = async(userID) => {

   try {
      const countResponse = await fetch('http://localhost:3001/image', {
         method: 'put',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': window.sessionStorage.getItem('token'),
         },
         body: JSON.stringify({
           id: userID,
         }),
       });

       if (!countResponse.ok) {
         toast.error('Failed to increase entries');
         throw new Error('Failed to increase entries');
       }

       return await countResponse.json();
   } catch (error) {
      throw new Error('Failed to increase entries ' + error.message);
   }

}

export {handleImageUrl, handleImage}