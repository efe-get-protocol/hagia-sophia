import React from 'react'
import './Crowdfunding.css'
import Infographic from '../../components/Infographic/Infographic'

const Crowdfunding = () => {
  return (
    <div>
      <h1>Crowdfunding</h1>
      <div className="info-container">
        <Infographic classname='infographic-card'></Infographic>
        <Infographic classname='infographic-card'></Infographic>
        <Infographic classname='infographic-card'></Infographic>
        <Infographic classname='infographic-card'></Infographic>
        <Infographic classname='infographic-card'></Infographic>
        
        
      </div>
    </div>
  )
}

export default Crowdfunding;