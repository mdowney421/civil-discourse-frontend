import { useState, useEffect } from 'react'
import axios from 'axios'

const ActionBar = (props) => {
    
    const [stats, setStats] = useState()

    const insertArticle = () => {
        axios.post('https://civil-discourse-backend.herokuapp.com/articles', {article_title: props.newsArticle.title, date: props.newsArticle.publishedAt, likes: 0, dislikes: 0, comments: []})
    }

    const getStats = () => {
        axios.get(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.publishedAt}`).then((response) => {
            setStats(response.data)
        })
    }

    useEffect(() => {
        insertArticle()
        getStats()
    }, [])

    return (
        <div className="action-bar">
            <button>Like</button>
            <p>{stats ? stats[0].likes : null}</p>
            <button>Dislike</button>
            <p>{stats ? stats[0].dislikes : null}</p>
            <button>Comment</button>
            <p>{stats ? stats[0].comments.length : null}</p>
        </div>
    )
}

export default ActionBar