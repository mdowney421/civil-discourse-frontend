import axios from 'axios'
import { useState, useEffect } from 'react'

const Comments = (props) => {
    
    const [article, setArticle] = useState({...props.newsArticle})
    const [newComment, setNewComment] = useState()
    const [averageDownvotes, setAverageDownvotes] = useState()

    const handleChange = (event) => {
        event.preventDefault()
        setNewComment({username: props.user, comment: event.target.value, downvotes: 0})
    }

    const addComment = (event) => {
        event.preventDefault()
        axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.date}`, {...article, comments: [...article.comments, newComment]}).then((response) => {
            setArticle({...article, comments: [...article.comments, newComment]})
            props.getArticles()
        })
    }

    const deleteComment = (comment) => {
        const indexToDelete = props.newsArticle.comments.indexOf(comment)
        props.newsArticle.comments.splice(indexToDelete, 1)
        axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.date}`, props.newsArticle).then((response) => {
            setArticle(props.newsArticle)
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

    const findAverageDownvotes = () => {
        let count = 0
        let sum = 0
        for (let comment of article.comments) {
            count += 1
            sum += comment.downvotes
        }
        if (sum / count) {
            setAverageDownvotes(sum / count)
        } else {
            setAverageDownvotes(0)
        }
    }

    useEffect(() => {
        findAverageDownvotes()
    }, [])

    return (
        <>
            <form onSubmit={addComment}>
                <textarea name="comment" onChange={handleChange} /><br />
                <input type="submit" value="Submit Comment" />
            </form>
            {article.comments?.map((comment) => {
                if (comment.downvotes <= averageDownvotes) {
                    return (
                        <div key={comment.comment}>
                            <h5>{comment.username}</h5>
                            <p>{comment.comment}</p>
                            <button onClick={() => downvoteComment(comment)}>Downvote</button>
                            {comment.username === props.user ?
                                <button onClick={() => deleteComment(comment)}>Delete Comment</button>
                            : null}
                        </div>
                    )
                }
            })}
        </>
    )   
}

export default Comments