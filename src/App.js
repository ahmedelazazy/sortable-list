import React from 'react';
import Posts from './components/Posts'
import Actions from './components/Actions'

function App() {
  return (
    <div className="app container mx-auto md:flex" data-test="app">
      <div className="flex-1 m-8">
        <Posts />
      </div>
      <div className="flex-1 m-8">
        <Actions />
      </div>
    </div>
  );
}

export default App;
