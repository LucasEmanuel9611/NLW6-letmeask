import React, { useContext, useEffect } from "react";

//libs
import {Link, useNavigate} from 'react-router-dom' 
import { database } from "../services/firebase";
//assets
import illustrationImg from "../@types/assets/illustration.svg";
import logoImg from '../@types/assets/logo.svg'
//styles
import '../styles/auth.scss'
//components
import { Button } from "../components/Button";
//context
import { AuthContext } from "../contexts/AuthContext"; 

export function NewRoom() {
  const [newRoom, setNewRom] = React.useState('')
  const navigate = useNavigate();

  const {user} = useContext(AuthContext)

  async function handleCreateRoom(e: React.FormEvent){
    e.preventDefault()
    if(newRoom.trim() === ''){
      
      return window.alert('texto vazio')
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    navigate(`/rooms/${firebaseRoom.key}`)
  }
  
  return (
    <div id="page-auth">
      {/* <h1>{user?.id}</h1> */}
      <aside>
        <img src={illustrationImg} alt="ilutraçãoperguntas respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
          <div className="main-content">
              <img src={logoImg} alt="Letmeask" />
             <h2>Criar uma nova sala</h2>
              <form onSubmit={handleCreateRoom}>
                  <input
                  type="text"
                  placeholder="Nome da sala"
                  onChange={e => setNewRom(e.target.value)}
                  value={newRoom}
                  />
                  <Button type="submit" >
                      Criar sala
                  </Button>
              </form>
              <p>Quer entrar em uma sala existente? <Link to='/'>clique aqui</Link></p>
          </div>
      </main>
    </div>
  );
}
