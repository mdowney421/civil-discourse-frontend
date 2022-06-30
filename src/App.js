import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import LogIn from './components/LogIn'
import CreateAccount from './components/CreateAccount'
import Article from './components/Article'
import ActionBar from './components/ActionBar'
import Comments from './components/Comments'
import Settings from './components/Settings'

const App = () => {
  
  const [articles, setArticles] = useState([])
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [view, setView] = useState(localStorage.getItem('view'))
  const [showComments, setShowComments] = useState(false)

  const getCurrentNews = () => {
    axios.get('http://civil-discourse-backend.herokuapp.com/api/top_headlines').then((response) => {
      for (let article of response.data.articles) {
        for (let currentArticle of articles) {
          if (article.publishedAt === currentArticle.date) {
            break
          } else {
            continue
          }
        }
        axios.post('http://civil-discourse-backend.herokuapp.com/articles', {title: article.title, description: article.description, image: article.urlToImage, url: article.url, date: article.publishedAt, likes: 0, dislikes: 0, comments: []})
      }
    })
  }

  const getArticles = () => {
    axios.get(`https://civil-discourse-backend.herokuapp.com/articles`).then((response) => {
        setArticles(response.data)
    })
  }

  const handleAuthenticatedUser = (authenticatedUser) => {
    setUser(authenticatedUser)
    setView('main')
  }

  const toggleComments = () => {
    if (showComments === false) {
        setShowComments(true)
    } else {
        setShowComments(false)
    }
  }

  const logOut = () => {
    localStorage.clear()
    setUser()
    setView('login')
  }

  useEffect(() => {
    getCurrentNews()
  }, [])

  useEffect(() => {
    getArticles()
  }, [])

  useEffect(() => {
    localStorage.setItem('user', user)
  }, [user])
  
  useEffect(() => {
    localStorage.setItem('view', view)
  }, [view])

  return (
    <>
      <Header setView={setView} logOut={logOut} />
      {((!user || user === 'undefined') && view === 'login') || ((!user || user === 'undefined') && view === 'main') || ((!user || user === 'undefined') && view ==='account') ? 
        <LogIn handleAuthenticatedUser={handleAuthenticatedUser} setView={setView} />
      : null}
      {!user && view === 'create' ?
        <CreateAccount setUser={setUser} setView={setView} />
      : null}
      {user && user !== 'undefined' && view === 'main' ?
        <div className='articles-container'>
          {articles?.map((newsArticle) => {
          return (
            <div className='news-article' key={newsArticle.description}>
              <Article newsArticle={newsArticle} key={newsArticle.title} />
              <ActionBar newsArticle={newsArticle} toggleComments={toggleComments} />
              {showComments ?
                <Comments newsArticle={newsArticle} user={user} articles={articles} setArticles={setArticles} index={articles.indexOf(newsArticle)} />
              : null}
            </div>
          )
        })}
        </div>
      : null}
      {user && user !== 'undefined' && view === 'account' ?
        <Settings user={user} setUser={setUser} setView={setView} />
      : null}
    </>
  )
}

export default App
