import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import {useState} from 'react'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Apply } from '../SendTransaction/sendTransactionWagmi';

const BountyAction = ({image, organization, description, id}) => {

    const [alertSuccess, setAlertSuccess] = useState(false);


    const handleApply = () => {
        // logic to apply to bounty
        setAlertSuccess(true);
    }

  return (
    <div>
    <Card sx={{ maxWidth: 475 }}>
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
        <CardActions>
        <Apply id={id}/>
        </CardActions>
    </Card>

    <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setAlertSuccess(false)} severity="success">
          Successfully Applied!
        </MuiAlert>
      </Snackbar>
    </div>


    
  );
}

export default BountyAction
