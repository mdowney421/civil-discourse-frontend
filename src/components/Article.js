import { useState } from 'react'

const Article = (props) => {
    
    const [article] = useState({...props.newsArticle})

    return (
        <>
            <img src={article.image} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank">Read the article here</a>
        </>
    )
}

export default Article