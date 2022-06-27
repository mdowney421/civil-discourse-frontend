import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import LogIn from './components/LogIn'
import CreateAccount from './components/CreateAccount'
import Article from './components/Article'
import ActionBar from './components/ActionBar'

const App = () => {
  
  const [currentNews, setCurrentNews] = useState()
  const [stats, setStats] = useState()
  const [user, setUser] = useState()

  const getCurrentNews = () => {
    axios.get('http://civil-discourse-backend.herokuapp.com/api/top_headlines').then((response) => {
      setCurrentNews(response.data.articles)
      response.data.articles.map((article) => {
        axios.post('https://civil-discourse-backend.herokuapp.com/articles', {article_title: article.title, date: article.publishedAt, likes: 0, dislikes: 0, comments: []}).catch((error) => {
          if (error) {
            console.log('article already in db')
          } else {
            console.log('article added')
          }
        })
      })
    })
  }

  // const insertArticles = () => {
  //   currentNews?.map((article) => {
  //     axios.post('https://civil-discourse-backend.herokuapp.com/articles', {article_title: article.title, date: article.publishedAt, likes: 0, dislikes: 0, comments: []}).catch((error) => {
  //       if (error) {
  //         console.log('article already in db')
  //       } else {
  //         console.log('article added')
  //       }
  //     })
  //   })
  // }

  const handleAuthenticatedUser = (authenticatedUser) => {
    setUser(authenticatedUser)
  }

  useEffect(() => {
    getCurrentNews()
    // insertArticles()
  }, [])
  
  return (
    <>
      <Header />
      <LogIn handleAuthenticatedUser={handleAuthenticatedUser} />
      <CreateAccount />
      {currentNews?.map((newsArticle) => {
        return (
          <div className='news-article' key={newsArticle.description}>
            <Article newsArticle={newsArticle} key={newsArticle.title} />
            <ActionBar newsArticle={newsArticle} />
          </div>
        )
      })}
    </>
  )
}

export default App
