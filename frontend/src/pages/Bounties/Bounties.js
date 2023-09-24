import React, {useState, useContext} from "react";
import './Bounties.css'
import BountyAction from "../../components/BountyAction/BountyAction";
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
      {bounties.map(item => <BountyAction image={"science_background_image.jpeg"} organization={item.title} description={item.description} />
          )}
      </div>
    </div>
  )
}

export default Bounties