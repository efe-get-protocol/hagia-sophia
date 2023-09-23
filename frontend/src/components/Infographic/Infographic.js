import React from 'react'
import './Infographic.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

const Infographic = ({image, organization, description, amount_raised, target_amount}) => {
  return (
    <Card sx={{ maxWidth: 475 }}>
      <CardActionArea href="/Research">
      <CardMedia
        sx={{ height: 440 }}
        image={image}
        title="research-card"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {organization}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
        <Typography>
          <Box component="span" fontWeight='bold'>
          ${amount_raised} raised out of ${target_amount} </Box> 
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default Infographic
