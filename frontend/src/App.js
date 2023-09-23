import './App.css';
import { Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/NavigationBar.js'
import Crowdfunding from './pages/Crowdfunding/Crowdfunding.js';
import Bounties from './pages/Bounties/Bounties.js'
import Review from './pages/Review/Review.js'
import Research from './pages/Research/Research.js'


function App() {
  return (
    <div className="App" id="outer-container">
      <NavigationBar/>
      <Routes>
        <Route path='/' element={ <Crowdfunding/> } />
        <Route path='/Crowdfunding' element={ <Crowdfunding/> } />
        <Route path='/Bounties' element={ <Bounties/> } />
        <Route path='/Review' element={ <Review/> } />
        <Route path='/Research' element={ <Research/> } />
      </Routes>
    </div>
  );
}

export default App;
