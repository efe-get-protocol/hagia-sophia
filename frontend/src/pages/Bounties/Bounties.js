import React, {useState, useContext} from "react";
import './Bounties.css'
import Infographic from '../../components/Infographic/Infographic'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import { ResearchContext, ResearchProvider } from "../../providers/subgraph";

const Bounties = () => {

  const { bounties } = useContext(ResearchContext);




  if(bounties) return (
    <div>
      <br/>
      <Button component={Link} to="/BountyForm" variant="contained" endIcon={<SendIcon />} >Create Bounty</Button>
      <br/>
      <br/>
      <div className="info-container">
      {bounties.map(item => <Infographic image={item.image} organization={item.title} description={item.description} amount_raised={item.bountyAmount} target_amount={item.fundingLimit} />
          )}
      </div>
    </div>
  )
}

export default Bounties