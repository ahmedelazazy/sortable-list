import React from 'react';
import Home from './components/Posts'
import Actions from './components/Actions'

function App() {
  return (
    <div className="App container mx-auto flex flex-wrap">
      <div className="flex-1 p-8 m-8">
        <Home />
      </div>
      <div className="flex-1 p-8 m-8">
        <Actions />
      </div>
    </div>
  );
}

export default App;
