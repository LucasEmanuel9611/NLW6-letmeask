import React, { useContext, useEffect } from "react";
import illustrationImg from "../@types/assets/illustration.svg";
import logoImg from '../@types/assets/logo.svg'
import googleIconImg from '../@types/assets/google-icon.svg'
import {Link} from 'react-router-dom' 
import '../styles/auth.scss'
import { Button } from "../components/Button";
import {AuthContext} from '../App'

export function NewRoom() {

  const {user} = useContext(AuthContext)
  return (
    <div id="page-auth">
      <h1>{user?.id}</h1>
      <aside>
        <img src={illustrationImg} alt="ilutraçãoperguntas respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
          <div className="main-content">
              <img src={logoImg} alt="Letmeask" />
             <h2>Criar uma nova sala</h2>
              <form>
                  <input
                  type="text"
                  placeholder="Nome da sala"
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
