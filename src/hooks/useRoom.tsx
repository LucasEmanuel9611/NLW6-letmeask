import React, {useState} from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type Questions = {
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    hasLiked: boolean;
  };

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
      authorId: string;
    }>
  }
>;

export function useRoom(roomId: string){
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [title, setTitle] = useState("");
    const {user} = useAuth()

    React.useEffect(() => {
        console.log(roomId);
        const roomRef = database.ref(`/rooms/${roomId}`);
    
        roomRef.on("value", (room) => {
          const databaseRoom = room.val();
          const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
    
          const parsedQuestions = Object.entries(firebaseQuestions).map(
            ([key, value]) => {
              return {
                id: key,
                content: value.content,
                author: value.author,
                isHighlighted: value.isHighlighted,
                isAnswered: value.isAnswered,
                likeCount: Object.values(value.likes ?? {}).length,
                hasLiked:  Object.values(value.likes ?? {}).some(like => like.authorId === user?.id),
              };
            }
          );
          setTitle(databaseRoom.title);
          setQuestions(parsedQuestions);
          console.log(parsedQuestions);
        });

        //unsubscribe event listener
        return() => {
          roomRef.off("value")
        }
    
        //* on mais de uma vez once uma vez
      }, [roomId, user?.id]);

      

    return {questions, title}
}