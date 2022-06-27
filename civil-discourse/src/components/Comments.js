import axios from 'axios'
import { useState } from 'react'

const Comments = (props) => {
    
    const [article, setArticle] = useState({...props.newsArticle})
    const [newComment, setNewComment] = useState()

    const handleChange = (event) => {
        event.preventDefault()
        setNewComment({username: props.user, comment: event.target.value, downvotes: 0})
    }

    const addComment = (event) => {
        event.preventDefault()
        axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.date}`, {...article, comments: [...article.comments, newComment]}).then((response) => {
            setArticle({...article, comments: [...article.comments, newComment]})
        })
    }

    return (
        <>
            <form onSubmit={addComment}>
                <textarea name="comment" onChange={handleChange} /><br />
                <input type="submit" value="Submit Comment" />
            </form>
            {article.comments?.map((comment) => {
                return (
                    <>
                        <h5>{comment.username}</h5>
                        <p>{comment.comment}</p>
                    </>
                )
            })}
        </>
    )   
}

export default Comments