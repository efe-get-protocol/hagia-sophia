import React from 'react';
import './Research.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { CardActionArea, CardActions } from '@mui/material';

const useStyles = makeStyles({
  card: {
    backgroundColor: 'rgba(18, 18, 18, 0.7)', // Semi-transparent background color
    color: 'white',
    maxWidth: '400px',
  },
});

const Research = () => {
  const classes = useStyles();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const image = queryParams.get('image');
  const organization = queryParams.get('organization');
  const description = queryParams.get('description');
  const amount_raised = queryParams.get('amount_raised');
  const target_amount = queryParams.get('target_amount');

  return (
    <div className={classes.root} style={{ backgroundImage: `url('${image}')`, minHeight: '100vh', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
      
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {organization}
          </Typography>
          <Typography color="white" gutterBottom>
            {description}
          </Typography>
          <br/>
          <Typography>
            ${amount_raised} out of ${target_amount}
          </Typography>
          <progress value={amount_raised} max={target_amount} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Research;
