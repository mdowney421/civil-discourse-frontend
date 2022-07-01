import { useState } from 'react'
import axios from 'axios'

const ActionBar = (props) => {

    const [article, setArticle] = useState({...props.newsArticle})

    const handleLike = () => {
        let alreadyLiked = false
        for (let like of article.likes) {
            if (like === props.user) {
                alreadyLiked = true
            }
        }
        if (alreadyLiked === false) {
            axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.date}`, {...article, likes: [...article.likes, props.user]}).then((response) => {
                setArticle({...article, likes: [...article.likes, props.user]})
            })
        } else {
            const indexOfLike = article.likes.indexOf(props.user)
            props.newsArticle.likes.splice(indexOfLike, 1)
            axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.date}`, props.newsArticle).then((response) => {
                setArticle(props.newsArticle)
            })
        }
    }

    const handleDislike = () => {
        let alreadyDisliked = false
        for (let like of article.dislikes) {
            if (like === props.user) {
                alreadyDisliked = true
            }
        }
        if (alreadyDisliked === false) {
            axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.date}`, {...article, dislikes: [...article.dislikes, props.user]}).then((response) => {
                setArticle({...article, dislikes: [...article.dislikes, props.user]})
            })
        } else {
            const indexOfDislike = article.dislikes.indexOf(props.user)
            props.newsArticle.dislikes.splice(indexOfDislike, 1)
            axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.date}`, props.newsArticle).then((response) => {
                setArticle(props.newsArticle)
            })
        }
    }

    return (
        <div className="action-bar">
            <img src='https://cdn-icons-png.flaticon.com/512/2107/2107956.png' alt='like button' onClick={handleLike} />
            <p>{article ? article.likes.length : null}</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2107/2107811.png' alt='dislike button' onClick={handleDislike} />
            <p>{article ? article.dislikes.length : null}</p>
            <img src='https://cdn-icons-png.flaticon.com/512/1380/1380338.png' alt='comments button' onClick={() => props.toggleComments(article.date)} />
            <p>{article ? props.newsArticle.comments.length : null}</p>
        </div>
    )
}

export default ActionBar