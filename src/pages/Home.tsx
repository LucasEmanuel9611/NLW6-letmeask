import * as React from "react";

//assets
import illustrationImg from "../@types/assets/illustration.svg";
import logoImg from "../@types/assets/logo.svg";
import googleIconImg from "../@types/assets/google-icon.svg";

//libs
import { useNavigate } from "react-router-dom";
import { auth, database, firebase } from "../services/firebase";

//styles
import "../styles/auth.scss";

//components
import { Button } from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function Home() {
  const navigate = useNavigate();
  const { user, singInWithGoogle } = useContext(AuthContext);
  const [roomCode, setRoomCode] = React.useState("");

  async function handleCreateRoom() {
    if (!user) {
      await singInWithGoogle();
    }

    navigate("/rooms/new");
  }

  async function handleJoinRoom(e: React.FormEvent) {
    e.preventDefault();

    if(roomCode.trim() == ''){
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if(!roomRef.exists()){
      alert(`Room doesn't exits`)
      return
    }

    if(roomRef.val().endedAt){
      alert(`Room alredy closed`)
      return
    }

    navigate(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilutraçãoperguntas respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-rom" onClick={() => handleCreateRoom()}>
            <img src={googleIconImg} alt="googlelogo" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(e) => {
                setRoomCode(e.target.value);
              }}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
