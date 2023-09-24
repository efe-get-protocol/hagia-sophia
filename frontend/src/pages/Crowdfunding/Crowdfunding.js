import React, {useState, useContext} from "react";

import './Crowdfunding.css'
import Infographic from '../../components/Infographic/Infographic'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';

import { ResearchContext,  } from "../../providers/subgraph";

const Crowdfunding = () => {
  const {  researches } = useContext(ResearchContext);

  if(researches) return (
    <div>
      <br/>
      <Button component={Link} to="/ResearchForm" variant="contained" endIcon={<SendIcon />} >Create Crowdfunding Contract</Button>
      <br/>
      <br/>
      <div className="info-container">
        {researches.map(item => <Infographic key={item.title+item.description}image={item.image} organization={item.title} description={item.description} amount_raised={item.fundingReceived} target_amount={item.fundingLimit} id={item.id}/>
          )}
      </div>
    </div>
  )
}

export default Crowdfunding;