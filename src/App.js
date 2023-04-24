import React, { useEffect, useState } from "react";
function App() {
  // on load fetch message from BE
  const [message, setMessage] = useState('Hello, World!')

  useEffect(() => {
    fetch('http://localhost:9292/')
      .then(r => r.json())
      .then(data => setMessage(data.message))

    return () => {

    }
  }, [])

  return (
    <div className="App">
      {message}
    </div>
  );
}

export default App;
