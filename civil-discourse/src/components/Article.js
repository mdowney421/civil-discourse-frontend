import { useState } from 'react'
import ActionBar from './ActionBar'

const Article = (props) => {
    
    const [article] = useState({...props.newsArticle})

    return (
        <div className='news-article'>
            <img src={article.urlToImage} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url}>Read the article here</a>
            <ActionBar newsArticle={props.newsArticle} />
        </div>
    )
}

export default Article