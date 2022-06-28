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

    const downvoteComment = (downvotedComment) => {
        let index = 0
        for (let comment of article.comments) {
            if (comment === downvotedComment) {
                break
            } else {
                index += 1
            }
        }
        let updatedArticle = article
        updatedArticle.comments[index].downvotes += 1
        axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.date}`, updatedArticle).then((response) => {
            setArticle(updatedArticle)
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
                        <button onClick={() => downvoteComment(comment)}>Downvote</button>
                    </>
                )
            })}
        </>
    )   
}

export default Comments