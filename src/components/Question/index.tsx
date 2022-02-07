import { ReactNode } from 'react'
import './styles.scss'
type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode
}

// export function Question(props: QuestionProps Ou
export function Question({children, content, author, }: QuestionProps){
    return(
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <span>
                        {author.name}
                    </span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}