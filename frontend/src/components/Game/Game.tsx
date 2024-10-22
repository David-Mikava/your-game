import { useEffect, useState } from 'react';
import './Game.scss';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { rootState, useAppDispatch } from '../../redux/store';
import { selectRoomById } from '../Rooms/roomsSelector';
import { useParams } from 'react-router-dom';
import { Question } from '../Rooms/Types/Rooms';
import { getRoomsAsync } from '../Rooms/roomsSlice';
import { CheckAnswerPayload, checkAnswer, getGameAsync } from './gameSlice';
import { finish } from './api';

function Game() {
  const { id } = useParams<Record<string, string | undefined>>();
  const room = useSelector((state: rootState) => selectRoomById(state, Number(id)));
  const { game } = useSelector((state: rootState) => state.game);
  console.log(game);

  const [answer, setAnswer] = useState('');
  const [curentQuestion, setCurentQuestion] = useState<Question | null>(null);
  const [timer, setTimer] = useState<number>(60);

  const dispatch = useAppDispatch();

  const toAnswer = async ({ id, correctly, points, questionId }: CheckAnswerPayload) => {
    try {
      dispatch(checkAnswer({ id, correctly, points, questionId }));
      setAnswer('');
      setCurentQuestion(null);
    } catch (error) {
      console.log(error);
    }
  };

  const comparingResponse = () => {
    let newAnswer = answer.trim();
    newAnswer = newAnswer.charAt(0).toUpperCase() + newAnswer.slice(1);
    if (curentQuestion?.answer === newAnswer) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(getRoomsAsync());
    dispatch(getGameAsync(Number(id)));
  }, [dispatch]);

  useEffect(() => {
    if (curentQuestion) {
      const interval = window.setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            toAnswer({
              id: Number(id),
              correctly: false,
              points: curentQuestion.points,
              questionId: curentQuestion.id,
            });
            setCurentQuestion(null);
            clearInterval(interval);
            return 60;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimer(60);
    }
  }, [curentQuestion]);

  return (
    <div className="game-page">
      <h1>Комната {room?.id}</h1>
      <div className="game">
        <table>
          <tbody>
            {/* {room?.themes.map((theme) => (
              <tr key={theme.id}>
                <td>{theme.name}</td>
                {theme.questions.map((question) => (
                  <td key={question.id}>
                    {game.map((answer) => {
                      if (answer.questionId === question.id) {
                        if (answer.correctly) {
                          return <p>+</p>;
                        } else {
                          return <p>-</p>;
                        }
                      } else {
                        return (
                          <Button
                            size="large"
                            className="modal-btn"
                            type="primary"
                            onClick={() => setCurentQuestion(question)}
                          >
                            {question.points}
                          </Button>
                        );
                      }
                    })}
                  </td>
                ))}
              </tr>
            ))} */}
            {room?.themes.map((theme) => (
              <tr key={theme.id}>
                <td>{theme.name}</td>
                {theme.questions.map((question) => {
                  const rightAnswer = game.answers.questions.find(
                    (que) => que.questionId === question.id,
                  );
                  console.log(rightAnswer);
                  if (rightAnswer === undefined) {
                    return (
                      <td key={question.id}>
                        <Button
                          size="large"
                          className="modal-btn"
                          type="primary"
                          onClick={() => setCurentQuestion(question)}
                        >
                          {question.points}
                        </Button>
                      </td>
                    );
                  } else if (rightAnswer.correctly) {
                    return (
                      <td key={question.id}>
                        <p className="checkmark"></p>{' '}
                      </td>
                    );
                  } else {
                    return (
                      <td key={question.id}>
                        <p className="cross"></p>
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {curentQuestion && (
          <Modal
            title={curentQuestion.name}
            visible={true}
            footer={[
              <Button
                key="submit"
                type="primary"
                onClick={() =>
                  toAnswer({
                    id: Number(id),
                    correctly: comparingResponse(),
                    points: curentQuestion.points,
                    questionId: curentQuestion.id,
                  })
                }
              >
                Ответить
              </Button>,
            ]}
            closable={false}
          >
            <p>Осталось времени: {timer} секунд</p>
            <input
              type="text"
              className="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Modal>
        )}

        <div className="finish">
          <h2>Очки: {game.total}</h2>
          <button onClick={() => finish(Number(id))} type="button">
            Завершить игру
          </button>
        </div>
      </div>
    </div>
  );
}
export default Game;
