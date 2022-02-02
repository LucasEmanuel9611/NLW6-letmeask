//assets
import illustrationImg from "../@types/assets/illustration.svg";
import logoImg from "../@types/assets/logo.svg";
import googleIconImg from "../@types/assets/google-icon.svg";

//libs
import { useNavigate } from "react-router-dom";
import {auth, firebase} from '../services/firebase'

//styles
import "../styles/auth.scss";

//components
import { Button } from "../components/Button";

export function Home() {
  const navigate = useNavigate();

  function handleCreateRoom(){
    const provider = new firebase.auth.GoogleAuthProvider()

    auth.signInWithPopup(provider).then( result => {
      console.log(result)
    })
    // navigate('/rooms/new')
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
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
