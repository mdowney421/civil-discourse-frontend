import { useState, useEffect } from 'react'
import axios from 'axios'

const ActionBar = (props) => {

    const [articleStats, setArticleStats] = useState([])

    const getArticleStats = () => {
        axios.get(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.publishedAt}`).then((response) => {
            setArticleStats(response.data)
        })
    }

    const handleLike = () => {
        let newLikeCount = articleStats[0].likes + 1
        axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.publishedAt}`, {article_title: articleStats[0].article_title, date: articleStats[0].date, likes: newLikeCount, dislikes: articleStats[0].dislikes, comments: articleStats[0].comments}).then((response) => {
            console.log(response.data)
            setArticleStats([{article_id: articleStats[0].article_id, article_title: articleStats[0].article_title, date: articleStats[0].date, likes: newLikeCount, dislikes: articleStats[0].dislikes, comments: articleStats[0].comments}])
        })
    }

    const handleDislike = () => {
        let newDisikeCount = articleStats[0].dislikes + 1
        axios.put(`https://civil-discourse-backend.herokuapp.com/articles/${props.newsArticle.publishedAt}`, {article_title: articleStats[0].article_title, date: articleStats[0].date, likes: articleStats[0].likes, dislikes: newDisikeCount, comments: articleStats[0].comments}).then((response) => {
            console.log(response.data)
            setArticleStats([{article_id: articleStats[0].article_id, article_title: articleStats[0].article_title, date: articleStats[0].date, likes: articleStats[0].likes, dislikes: newDisikeCount, comments: articleStats[0].comments}])
        })
    }

    useEffect(() => {
        getArticleStats()
    }, [])

    return (
        <div className="action-bar">
            <button onClick={handleLike}>Like</button>
            <p>{articleStats.length > 0 ? articleStats[0].likes : null}</p>
            <button onClick={handleDislike}>Dislike</button>
            <p>{articleStats.length > 0 ? articleStats[0].dislikes : null}</p>
            <button>Comment</button>
            <p>{articleStats > 0 ? articleStats[0].comments.length : null}</p>
        </div>
    )
}

export default ActionBar