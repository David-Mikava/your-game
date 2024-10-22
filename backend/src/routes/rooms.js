const router = require('express').Router();
const { Room, Question, Theme, RoomToQuestion, sequelize, Statistic } = require('../..//db/models');

function transformArray(arr) {
  const result = arr.map((item) => {
    const themes = [];

    item.Questions.forEach((question) => {
      let theme = themes.find((t) => t.name === question.Theme.name);
      if (!theme) {
        theme = {
          id: question.Theme.id,
          name: question.Theme.name,
          questions: [],
        };
        themes.push(theme);
      }

      theme.questions.push({
        id: question.id,
        name: question.name,
        answer: question.answer,
        points: question.points,
      });
      theme.questions.sort((a, b) => a.points - b.points);
    });

    return {
      id: item.id,
      themes,
    };
  });

  return result;
}

router.get('/', async (req, res) => {
  try {
    const userId = req.session.user.id;
    let roomData = await Room.findAll({
      where: { userId },
      include: { model: Question, through: { model: RoomToQuestion }, include: Theme },
    });
    roomData = transformArray(roomData);
    res.json(roomData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const roomData = await Room.findOne({
      where: { id },
    });
    res.json(roomData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

function filteredRandomQuestions(themes, roomId) {
  const result = themes.map((theme) => {
    const randomQuestions = [];
    const questions = theme.Questions.sort((a, b) => a.points - b.points);

    while (randomQuestions.length !== 5) {
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

      const isUnique = randomQuestions.every(
        (question) => question.points !== randomQuestion.points,
      );

      if (isUnique) {
        RoomToQuestion.create({ roomId, questionId: randomQuestion.id });
        randomQuestions.push(randomQuestion);
      }
    }

    return {
      id: theme.id,
      name: theme.name,
      questions: randomQuestions.sort((a, b) => a.points - b.points),
    };
  });
  return result;
}

router.post('/', async (req, res) => {
  try {
    const userId = req.session.user.id;
    const roomData = await Room.create({ userId });
    let themes = await Theme.findAll({
      include: {
        model: Question,
        order: [['points', 'ASC']],
      },
    });
    themes = filteredRandomQuestions(themes, roomData.id);

    res.json({ id: roomData.id, themes });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Room.destroy({ where: { id } });
    res.json({}, 200);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { correctly, points, questionId } = req.body;
    const id = req.params.id;

    const room = await Room.findOne({ where: { id } });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Обновляем поле answers.questions
    let updatedAnswers = room.answers || {};
    if (!Array.isArray(updatedAnswers.questions)) {
      updatedAnswers.questions = [];
    }
    updatedAnswers.questions.push({ questionId, correctly, points });

    // Обновляем счет
    let updatedScore = room.total;
    if (correctly) {
      updatedScore += points;
    } else {
      updatedScore -= points;
    }

    // Выполняем обновление записи
    await Room.update(
      {
        answers: updatedAnswers,
        total: updatedScore
      },
      {
        where: { id }
      }
    );
    const roomAgain = await Room.findOne({ where: { id } });
    console.log(updatedAnswers);
    res.json(roomAgain);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/:id/finish', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user.id;
    const room = await Room.findOne({ where: { id } });
    room.status = 'finished';
    room.save();
    const statistic = await Statistic.findOne({ where: { userId } });

    if (!statistic) {
      await Statistic.create({ userId, points: room.total });
      return res.json({}, 200);
    }

    if (statistic.points < room.total) {
      statistic.points = room.total;
      statistic.save();
      return res.json({}, 200);
    }
    res.json({}, 200);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
