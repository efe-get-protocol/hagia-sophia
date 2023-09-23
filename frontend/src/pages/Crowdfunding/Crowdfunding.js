import React from 'react'
import './Crowdfunding.css'
import Infographic from '../../components/Infographic/Infographic'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';


const Crowdfunding = () => {
  let image = "science_background_image.jpeg"
  let organization = "WalletCoin"
  let description = "WalletCoin API Development Research: At WalletCoin, we are committed to harnessing the power of blockchain and cryptocurrency technology. Our API development research focuses on creating robust, secure, and user-friendly interfaces that empower developers and businesses to seamlessly integrate WalletCoin services into their applications. Through rigorous exploration and innovation, we aim to provide cutting-edge solutions, ensuring compatibility, scalability, and efficiency in the ever-evolving world of digital finance."
  let amount_raised = 50000
  let target_amount = 100000


  return (
    <div>
      <br/>
      <Button component={Link} to="/ResearchForm" variant="contained" endIcon={<SendIcon />} >Create Crowdfunding Contract</Button>
      <br/>
      <br/>
      <div className="info-container">
        <Infographic image={image} organization={organization} description={description} amount_raised={amount_raised} target_amount={target_amount} />
        <Infographic image={image} organization={organization} description={description} amount_raised={amount_raised} target_amount={target_amount} />
        <Infographic image={image} organization={organization} description={description} amount_raised={amount_raised} target_amount={target_amount} />
        <Infographic image={image} organization={organization} description={description} amount_raised={amount_raised} target_amount={target_amount} />
        <Infographic image={image} organization={organization} description={description} amount_raised={amount_raised} target_amount={target_amount} />
      </div>
    </div>
  )
}

export default Crowdfunding;