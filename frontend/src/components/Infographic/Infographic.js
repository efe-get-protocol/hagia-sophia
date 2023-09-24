import React from 'react'
import './Infographic.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import {Link} from 'react-router-dom'

const Infographic = ({image, organization, description, amount_raised, target_amount, id}) => {
  return (
    <Card sx={{ maxWidth: 475 }}>
      <CardActionArea component={Link} to={`/Research?image=${image}&organization=${organization}&description=${description}&amount_raised=${amount_raised}&target_amount=${target_amount}&id=${id}`}>
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
          ${parseInt(amount_raised / 10**18)} raised out of ${parseInt(target_amount/ 10**18)} </Box> 
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default Infographic
