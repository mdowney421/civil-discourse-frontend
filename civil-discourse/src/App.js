import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import LogIn from './components/LogIn'
import CreateAccount from './components/CreateAccount'
import Article from './components/Article'
import ActionBar from './components/ActionBar'
import Comments from './components/Comments'

const App = () => {
  
  const [articles, setArticles] = useState()
  const [user, setUser] = useState()

  const getCurrentNews = () => {
    axios.get('http://civil-discourse-backend.herokuapp.com/api/top_headlines').then((response) => {
      console.log(response.data.articles)
      response.data.articles.map((article) => {
        axios.post('https://civil-discourse-backend.herokuapp.com/articles', {title: article.title, description: article.description, image: article.urlToImage, url: article.url, date: article.publishedAt, likes: 0, dislikes: 0, comments: []}).catch((error) => {
          if (error) {
            console.log('article already in db')
          } else {
            console.log('article added')
          }
        })
      })
    })
  }

  const getArticles = () => {
    axios.get(`https://civil-discourse-backend.herokuapp.com/articles`).then((response) => {
        setArticles(response.data)
    })
  }

  const handleAuthenticatedUser = (authenticatedUser) => {
    setUser(authenticatedUser)
  }

  useEffect(() => {
    // getCurrentNews()
  }, [])

  useEffect(() => {
    getArticles()
  }, [])
  
  return (
    <>
      <Header />
      <LogIn handleAuthenticatedUser={handleAuthenticatedUser} />
      <CreateAccount />
      {articles?.map((newsArticle) => {
        return (
          <div className='news-article' key={newsArticle.description}>
            <Article newsArticle={newsArticle} key={newsArticle.title} />
            <ActionBar newsArticle={newsArticle} />
            {/* <Comments newsArticle={newsArticle} user={user} /> */}
          </div>
        )
      })}
    </>
  )
}

export default App
