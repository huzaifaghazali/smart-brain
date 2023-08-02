import React, { useState } from 'react';
import { toast } from 'react-toastify';

import './Profile.css';

import Logo from '../../assets/images/profileIcon.svg';

const Profile = ({ isProfileOpen, toggleModal, user, loadUser }) => {
  const { entries, joined } = user;

  const [profileData, setProfileData] = useState({
    name: user.name,
    age: user.age,
    pet: user.pet,
  });

  const onFormChange = (event) => {
    const { name, value } = event.target;
    // Update the profileData state based on the input field that was changed
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onProfileUpdate = async (data) => {
    try {
      console.log('Data to be sent:', data);
      const response = await fetch(`http://localhost:3001/profile/${user.id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token'),
        },
        body: JSON.stringify({ formInput: data }),
      });

      if (response.status === 200 || response.status === 304) {
        const updatedUser = { ...user, ...data }; // Merge data into the user object
        toast.success('Profile Updated Successfully!!');
        toggleModal();
        loadUser(updatedUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { name, age, pet } = profileData;

  return (
    <div className='profile-modal'>
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-dark text-white o-80'>
        <main className='pa4 white-80 w-80'>
          <img src={Logo} className='h3 w3 dib' alt='avatar' />
          <h1>{name}</h1>
          <h4>{`Images submitted: ${entries}`}</h4>
          <p>{`Member since: date ${new Date(joined).toLocaleDateString()}`}</p>
          <hr />
          <label className='mt2 fw6' htmlFor='name'>
            Name:
          </label>
          <input
            type='text'
            name='name'
            className='pa2 ba w-100 fw6'
            placeholder={name ? name : 'Update your name'}
            id='name'
            value={name}
            onChange={onFormChange}
          />
          <label className='mt2 fw6' htmlFor='user-age'>
            Age:
          </label>
          <input
            type='text'
            name='age'
            className='pa2 ba w-100 fw6'
            placeholder={age ? age : 'Enter your age'}
            id='age'
            value={age}
            onChange={onFormChange}
          />
          <label className='mt2 fw6' htmlFor='user-age'>
            Pet:
          </label>
          <input
            type='text'
            name='pet'
            className='pa2 ba w-100 fw6'
            placeholder={pet ? pet : 'Enter you pet'}
            id='pet'
            value={pet}
            onChange={onFormChange}
          />
          <div
            className='mt4'
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <button
              onClick={() => onProfileUpdate({ name, age, pet })}
              className='b pa2 grow pointer hover-white w-40 bg-info b--black-20'
            >
              Save
            </button>
            <button
              className='b pa2 grow pointer hover-white w-40 bg-danger b--black-20'
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </main>
        <div className='modal-close' onClick={toggleModal}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
