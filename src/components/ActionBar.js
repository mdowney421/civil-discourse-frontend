import { useState } from 'react'
import axios from 'axios'

const ActionBar = (props) => {

    const [article, setArticle] = useState({...props.newsArticle})

    const handleLike = () => {
        let newLikeCount = article.likes + 1
        axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.date}`, {...article, likes: newLikeCount}).then((response) => {
            setArticle({...article, likes: newLikeCount})
        })
    }

    const handleDislike = () => {
        let newDislikeCount = article.dislikes + 1
        axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.date}`, {...article, dislikes: newDislikeCount}).then((response) => {
            setArticle({...article, dislikes: newDislikeCount})
        })
    }

    return (
        <div className="action-bar">
            <img src='https://cdn-icons-png.flaticon.com/512/2107/2107956.png' alt='like button' onClick={handleLike} />
            <p>{article ? article.likes : null}</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2107/2107811.png' alt='dislike button' onClick={handleDislike} />
            <p>{article ? article.dislikes : null}</p>
            <img src='https://cdn-icons-png.flaticon.com/512/1380/1380338.png' alt='comments button' onClick={() => props.toggleComments(article.date)} />
            <p>{article ? props.newsArticle.comments.length : null}</p>
        </div>
    )
}

export default ActionBar