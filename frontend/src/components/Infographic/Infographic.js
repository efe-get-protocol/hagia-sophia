import React from 'react'
import './Infographic.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

const Infographic = () => {
  return (
    <Card sx={{ maxWidth: 475 }}>
      <CardActionArea href="/Research">
      <CardMedia
        sx={{ height: 440 }}
        image="science_background_image.jpeg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Web 3 Research
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Typography>
          <Box component="span" fontWeight='bold'>
          $50,000 raised out of $100,000 </Box> 
        </Typography>
        {/* <Typography fontweight="fontWeightMedium">
          $50,000 raised out of $100,000
        </Typography> */}
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
      </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default Infographic
