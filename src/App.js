import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Countries from "./components/Countries";
import NewArticleForm from "./components/NewArticleForm";
import Home from "./components/Home";

function App() {

  const [countries, setCountries] = useState([])

  useEffect(() => {  
    fetch('http://localhost:9292/countries')
      .then(r => r.json())
      .then(data => {
        setCountries(data)
      })
  }, [])

  function addNewCountry(newCountry) {
    setCountries([...countries, newCountry])
  }

  function addNewArticle(article) {
    const updatedCountries = countries.map( country => {
      if (country.id === article.country_id) {
        // this might be bad code? directly mutating state
        return {
          ...country,
          articles: [...country.articles, article]
          } 
      }
      return country
    })
    setCountries(updatedCountries)
  }

  function onDeleteArticle(article) {
    //find article in state and remove it
    const updatedCountries = countries.map( c => {
      if (c.id === article.country_id) {
        const filteredArticles = c.articles.filter( art => {
          return article.id !== art.id
        })
        return {
          ...c,
          articles: filteredArticles
          } 
      }
      return c
    })
    setCountries(updatedCountries)
  }

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
                path='/countries'
                element={<Countries
                  countries={countries}
                  onDeleteArticle={onDeleteArticle}
                />}
              />
              <Route
                path='/Add Article'
                element={<NewArticleForm
                  countries={countries}
                  addNewCountry={addNewCountry}
                  addNewArticle={addNewArticle}
                />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
