import React, { createContext } from "react";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, firebase } from "./services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined,
  singInWithGoogle: () => Promise<void>
}


export const AuthContext = createContext({} as AuthContextType);


function App() {
  const [user, setUser] = React.useState<User>();

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)

     if(result.user){
       const {displayName, photoURL, uid} = result.user;

       if(!displayName || !photoURL ){
          throw new Error('Missing information from Google Account')
       }

       setUser({
         id: uid,
         name: displayName,
         avatar: photoURL
       })
     }

  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, singInWithGoogle }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
