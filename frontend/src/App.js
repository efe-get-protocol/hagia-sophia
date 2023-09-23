import './App.css';
import { Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/NavigationBar.js'
import Crowdfunding from './pages/Crowdfunding/Crowdfunding.js';
import Bounties from './pages/Bounties/Bounties.js'
import Review from './pages/Review/Review.js'
import Research from './pages/Research/Research.js'
import Login from './pages/Login/Login.js'
import ResearchForm from './pages/Application/ResearchForm'
import BountyForm from './pages/Application/BountyForm'


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
        <Route path='/Login' element={<Login/>} />
        <Route path='/ResearchForm' element={<ResearchForm/>} />
        <Route path='/BountyForm' element={<BountyForm/>} />
        
      </Routes>
    </div>
  );
}

export default App;
