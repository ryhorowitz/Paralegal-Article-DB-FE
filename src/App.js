import React, { useEffect, useState } from "react";
function App() {
  // on load fetch message from BE
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/')
      .then(r => r.json())
      .then(data =>{
        // console.log(Array.isArray(data))
        setArticles(data)
      })
  }, [])

  return (
    <div className="App">
      {/* {articles} */}
      {/* Header */}
      {/* search */}
      {/*  */}
    </div>
  );
}

export default App;
