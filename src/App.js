import React from 'react';
import './App.css';
import Header from './components/Header';
// import Footer from './components/Footer';
import Content from './components/Dashboard';

function App() {
  return (
    <>
      <div>
        <Header/>
        <Content/>
        {/* <Footer/> */}
      </div>
    </>
  );
}

export default App;

