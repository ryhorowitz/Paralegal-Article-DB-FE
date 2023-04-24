import React, { useState } from "react";
function App() {
  // on load fetch message from BE
  const [message, setMessage] = useState('Hello, World!')
  return (
    <div className="App">
      {message}
    </div>
  );
}

export default App;
