import './App.css'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Header from './components/Header'
import NewsFeed from './components/NewsFeed'

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
      <Header />
      {currentNews?.map((newsArticle) => {
        return (
          <NewsFeed newsArticle={newsArticle} key={newsArticle.title} />
        )
      })}
    </>
  )
}

export default App
