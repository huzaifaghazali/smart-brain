const { postgresDB } = require('../database/postgres');

const handleProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await postgresDB.select('*').from('users').where({ id });
    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(404).json('Not found');
    }
  } catch (err) {
    res.status(500).json('Internal server error');
  }
};

const handleProfileUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, age, pet } = req.body.formInput;
  try {
    const updateUser = await postgresDB('users')
      .where({ id })
      .update({ name, age, pet });

    if (updateUser) {
      res.json('success');
    } else {
      res.status(400).json('Unable to update');
    }
  } catch (error) {
    res.status(400).json('Error updating user');
  }
};

module.exports = {
  handleProfile,
  handleProfileUpdate,
};
