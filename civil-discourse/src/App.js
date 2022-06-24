import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import LogIn from './components/LogIn'
import CreateAccount from './components/CreateAccount'
import NewsFeed from './components/NewsFeed'

const App = () => {
  
  const [currentNews, setCurrentNews] = useState()
  const [user, setUser] = useState()

  const getCurrentNews = () => {
    axios.get('http://civil-discourse-backend.herokuapp.com/api/top_headlines').then((response) => {
      setCurrentNews(response.data.articles)
    })
  }

  const handleAuthenticatedUser = (authenticatedUser) => {
    setUser(authenticatedUser)
  }

  useEffect(() => {
    // getCurrentNews()
  }, [])
  
  return (
    <>
      <Header />
      <LogIn handleAuthenticatedUser={handleAuthenticatedUser} />
      <CreateAccount />
      {currentNews?.map((newsArticle) => {
        return (
          <NewsFeed newsArticle={newsArticle} key={newsArticle.title} />
        )
      })}
    </>
  )
}

export default App
