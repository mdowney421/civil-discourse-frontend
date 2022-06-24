import './App.css'
import {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
  const [currentNews, setCurrentNews] = useState()

  const getCurrentNews = () => {
    axios.get('http://civil-discourse-backend.herokuapp.com/api/top_headlines').then((response) => {
      setCurrentNews(response.data.articles)
    })
  }

  useEffect(() => {
    getCurrentNews()
  }, [])
  
  return (
    <>
      <h1>Civil Discourse</h1>
      {currentNews?.map((article) => {
        return (
          <div>
            <img src={article.urlToImage} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url}>Read the article here</a>
          </div>
        )
      })}
    </>
  )
}

export default App
