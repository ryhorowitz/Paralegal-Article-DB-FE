import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Articles from "./components/Articles";
import NewArticleForm from "./components/NewArticleForm";
import Home from "./components/Home";

function App() {

  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [countries, setCountries] = useState([])

  function transformArticleData(data) {
    for (let obj of data) {
      for (let key in obj) {
        // console.log('obj is', obj[key])
        if (typeof obj[key] === 'object') {
          obj[key] = obj[key].name
        }
        if (key === 'country_id' || key === 'category_id') {
          delete obj[key]
        }
      }
      obj.published = new Date(obj.published).toString().substring(3, 15)
      obj.created_at = new Date(obj.created_at).toString().substring(3, 15)
      obj.updated_at = new Date(obj.updated_at).toString().substring(3, 15)
    }
    return data
  }
  useEffect(() => {
    fetch('http://localhost:9292/')
      .then(r => r.json())
      .then(data => {
        // console.log('data is', data)
        transformArticleData(data)
        setArticles(data)
      })
    fetch('http://localhost:9292/countries')
      .then(r => r.json())
      .then(data => {
        // console.log('data is', data)
        setCountries(data)
      })

    fetch('http://localhost:9292/categories')
      .then(r => r.json())
      .then(data => {
        // console.log('data is', data)
        setCategories(data)
      })
  }, [])


  return (
    <div className="App">
      <ResponsiveAppBar />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/articles'
                element={<Articles 
                  articles={articles}
                  categories={categories}
                  countries={countries}/>}
              />
              <Route
                path='/Add Article'
                element={<NewArticleForm />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
