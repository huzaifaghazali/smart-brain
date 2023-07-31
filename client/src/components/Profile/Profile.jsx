import React, { useState } from 'react';
import './Profile.css';

import Logo from '../../assets/images/profileIcon.svg';

const Profile = ({ isProfileOpen, toggleModal, user }) => {
  const { name, entries, joined, age, pet } = user;

  const [profileData, setProfileData] = useState({
    username: name,
    userage: age,
    userpet: pet,
  });

  const onFormChange = (event) => {
    const { name, value } = event.target;
    // Update the profileData state based on the input field that was changed
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className='profile-modal'>
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-dark text-white o-80'>
        <main className='pa4 white-80 w-80'>
          <img src={Logo} className='h3 w3 dib' alt='avatar' />
          <h1>{profileData.username}</h1>
          <h4>{`Images submitted: ${entries}`}</h4>
          <p>{`Member since: date ${new Date(joined).toLocaleDateString()}`}</p>
          <hr />
          <label className='mt2 fw6' htmlFor='username'>
            Name:
          </label>
          <input
            type='text'
            name='username'
            className='pa2 ba w-100 fw6'
            placeholder={name ? name : 'Update your name'}
            id='name'
            value={profileData.username}
            onChange={onFormChange}
          />
          <label className='mt2 fw6' htmlFor='user-age'>
            Age:
          </label>
          <input
            type='text'
            name='userage'
            className='pa2 ba w-100 fw6'
            placeholder={age ? age : 'Enter your age'}
            id='age'
            value={profileData.userage}
            onChange={onFormChange}
          />
          <label className='mt2 fw6' htmlFor='user-age'>
            Pet:
          </label>
          <input
            type='text'
            name='userpet'
            className='pa2 ba w-100 fw6'
            placeholder={pet ? pet : 'Enter you pet'}
            id='pet'
            value={profileData.userpet}
            onChange={onFormChange}
          />
          <div
            className='mt4'
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <button className='b pa2 grow pointer hover-white w-40 bg-info b--black-20'>
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
