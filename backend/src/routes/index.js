const router = require('express').Router();
const { Statistic, User } = require('../../db/models');

router.get('/', (req, res) => {
  res.send('Hello');
});

router.get('/table', async (req, res) => {
  try {
    const leaders = await Statistic.findAll({
      include: { model: User },
      order: [['points', 'DESC']],
    });
    res.json(leaders);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

module.exports = router;
