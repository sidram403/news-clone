import React, { useEffect, useState } from 'react'
import NavInshorts from './components/NavInshorts'
import NewsContent from './components/NewsContent/NewsContent'
import axios from 'axios'
import Footer from './components/Footer/Footer'

const App = () => {
  const [category, setCategory] = useState("general")
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState()
  const [loadmore, setLoadmore] = useState(20)

  const newsApi = async () =>{
    try {
      const news = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}&category=${category}&pageSize=${loadmore}`)
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults)
    } catch (error) {
      console.log(error);
    }
  }

  console.log(newsArray)

  useEffect(() => {
    newsApi()
  }, [newsResults, category, loadmore])
  

  return (
    <div>
      <NavInshorts setCategory={setCategory} />
      <NewsContent newsArray={newsArray} newsResults={newsResults}  loadmore={loadmore} setLoadmore={setLoadmore} />
      <Footer />
    </div>
  )
}

export default App
