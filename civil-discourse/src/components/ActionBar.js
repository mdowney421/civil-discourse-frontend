import { useState, useEffect } from 'react'
import axios from 'axios'

const ActionBar = (props) => {

    const [article, setArticle] = useState({...props.newsArticle})

    const handleLike = () => {
        let newLikeCount = article.likes + 1
        console.log(props.newsArticle.date)
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
            <button onClick={handleLike}>Like</button>
            <p>{article ? article.likes : null}</p>
            <button onClick={handleDislike}>Dislike</button>
            <p>{article ? article.dislikes : null}</p>
            <button>Comment</button>
            <p>{article ? article.comments.length : null}</p>
        </div>
    )
}

export default ActionBar