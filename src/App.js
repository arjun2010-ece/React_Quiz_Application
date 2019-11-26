import React from 'react';
import Quiz from './components/Quiz';
import "./App.css"

function App() {
  return (
    <div className='container mt-5 py-5'>
      <div className="row">
         <div className="col-md-6 offset-md-3">
            <Quiz />
         </div>
      </div>
    </div>
  )
}
export default App;