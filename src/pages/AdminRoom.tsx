import React, { useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../@types/assets/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";
import { useAuth } from "../hooks/useAuth";
// import { database } from "../services/firebase";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { user } = useAuth();
  const { questions, title } = useRoom(roomId!);
  const [newQuestion, setNewQuestion] = useState("");

 
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <div>
            <RoomCode code={roomId!} />
            <Button isOutlined>Encerrar Sala</Button>
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
            />
          ))}
        </div>
      </main>
    </div>
  );
}

//algoritimo de reconciliação
