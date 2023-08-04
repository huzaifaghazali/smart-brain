import { toast } from 'react-toastify';

const handleProfileUpdate = async(userID, data) => {
   try {
      const response = await fetch(`http://localhost:3001/profile/${userID}`, {
         method: 'post',
         headers: {
           'Content-Type': 'application/json',
           Authorization: window.sessionStorage.getItem('token'),
         },
         body: JSON.stringify({ formInput: data }),
       });

       if (!response.ok) {
         const errorMessage = await response.text();
         toast.error(errorMessage || 'Failed to Update Profile');
       }

       return response;
 
   } catch (error) {
      throw new Error('Updating Profile failed: ' + error.message);
   }
}

export { handleProfileUpdate }