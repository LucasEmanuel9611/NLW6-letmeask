import React, { useState } from "react";
import { useParams } from "react-router-dom";

import logoImg from "../@types/assets/logo.svg";
import deleteImg from "../@types/assets/delete.svg";
import checkImg from "../@types/assets/check.svg";
import answerImg from "../@types/assets/answer.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";
import { useAuth } from "../hooks/useAuth";
// import { database } from "../services/firebase";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import { useNavigate } from "react-router-dom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const navigate = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { user } = useAuth();
  const { questions, title } = useRoom(roomId!);
  const [newQuestion, setNewQuestion] = useState("");

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Deseja excluir essa pergunta? ")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    navigate("/");
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestionQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <div>
            <RoomCode code={roomId!} />
            <Button isOutlined onClick={() => handleEndRoom()}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((item) => (
            <Question
              key={item.id}
              content={item.content}
              author={item.author}
              isAnswered={item.isAnswered}
              isHighlighted={item.isHighlighted}
            >
              {!item.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(item.id)}
                  >
                    <img src={checkImg} alt="dar destaque" />
                   
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHighlightQuestionQuestion(item.id)}
                  >
                     <img src={answerImg} alt="remover pergunta" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => handleDeleteQuestion(item.id)}
              >
                <img src={deleteImg} alt="marcar  como respondida" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}

//algoritimo de reconciliação
