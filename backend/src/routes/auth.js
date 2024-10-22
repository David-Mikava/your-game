const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

router.post('/reg', async (req, res) => {
  try {
    const { name, password } = req.body;

    const hashPass = await bcrypt.hash(password, 10);

    if (!name || !password) {
      return res.sendStatus(400);
    }

    await User.create({ name, password: hashPass });

    return res.json({}, 200);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ where: { name } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.sendStatus(401);
    }
    req.session.user = user;
    return res.json({}, 200);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get('/status', (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

router.get('/logout', (req, res) => {
  req.session.destroy((e) => {
    if (e) {
      return;
    }
    res.clearCookie('UserAuth');
    res.sendStatus(200);
  });
});

module.exports = router;
