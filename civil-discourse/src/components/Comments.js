import axios from 'axios'
import { useState, useEffect } from 'react'

const Comments = (props) => {
    
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState()

    const getComments = () => {
        axios.get(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.publishedAt}`).then((response) => {
            setComments(response.data[0].comments)
        })
    }

    const handleChange = (event) => {
        event.preventDefault()
        setNewComment({username: props.user, comment: event.target.value, downvotes: 0})
    }

    // const addComment = (event) => {
    //     event.preventDefault()
    //     axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.publishedAt}`, {article_title: props.newsArticle.article_title, date: articleStats[0].date, likes: articleStats[0].likes, dislikes: articleStats[0].dislikes, comments: [...comments, newComment]})
    // }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <>
            <form>
                <textarea name="comment" onChange={handleChange} /><br />
                <input type="submit" value="Submit Comment" />
            </form>
            <h5>username</h5>
            <p>comment</p>
        </>
    )   
}

export default Comments