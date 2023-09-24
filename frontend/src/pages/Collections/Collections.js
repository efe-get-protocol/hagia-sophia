import React, {useState, useContext} from "react";

import Infographic from '../../components/Infographic/Infographic'
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import Item from '@mui/material/Stack'

import { ResearchContext,  } from "../../providers/subgraph";

const Collections = () => {
  const {  researches } = useContext(ResearchContext);

  if(researches) return (
    <div>
      <br/>
      <h1>My NFT Collection</h1>
      <div className="info-container">
        {researches.map(item => <CollectionCard image={item.image} organization={item.title} description={item.description} />
          )} 
       </div>
    </div>
  )
}

export default Collections;