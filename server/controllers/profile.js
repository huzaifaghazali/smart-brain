const handleProfile = async (req, res, postgresDB) => {
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

module.exports = {
  handleProfile,
};