import React, { useEffect, useState } from "react";
import Header from "./Header";
import Table from "./Table";

function App() {

  const [articles, setArticles] = useState([])

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
    }
    return data
  }
  useEffect(() => {
    fetch('http://localhost:9292/')
      .then(r => r.json())
      .then(data => {
        transformArticleData(data)
        setArticles(data)
      })
  }, [])

  return (
    <div className="App">
      <Header />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            <h1 className="text-xl font-semibold">Articles used by Paralegals</h1>
          </div>
          <div className="mt-4">
            <Table articles={articles} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
