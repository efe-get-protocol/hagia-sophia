import React from 'react';
import './Research.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {useState} from 'react'
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SendFunds } from '../../components/SendTransaction/sendTransactionWagmi';

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(''); // Initialize the state
  const [alertSuccess, setAlertSuccess] = useState(false);

  const image = queryParams.get('image');
  const organization = queryParams.get('organization');
  const description = queryParams.get('description');
  const amount_raised = queryParams.get('amount_raised');
  const target_amount = queryParams.get('target_amount');
  const id = queryParams.get('id');
console.log("asd", id)
  const handleDonateClick = () => {
    setIsDialogOpen(true);
  };

  const handleDonateSubmit = (e) => {
    // Add logic to handle the donation submission here
    // You can retrieve the donation amount from a form field
    // and perform any necessary actions.
    // For now, let's just close the dialog:
    console.log(donationAmount)

    setIsDialogOpen(false);
    setAlertSuccess(true);
  };
  
  

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
            {amount_raised/10**18} Raised Out of {target_amount/10**18} MATIC
          </Typography>
          <progress value={amount_raised/10**18} max={target_amount/10**18} />
        </CardContent>
        <CardActions disableSpacing>
          <Button onClick={handleDonateClick} style={{color: 'white', margin: 'auto', backgroundColor: 'blue'}} size="small">Donate Now</Button>
          <Button component={Link} to='/Review' style={{color: 'white', margin: 'auto', backgroundColor: 'blue'}} size="small">Submit Peer Review</Button>
          <Button href="https://bitcoin.org/bitcoin.pdf" style={{color: 'white', margin: 'auto', backgroundColor: 'blue'}} size="small">Learn More</Button>
      </CardActions>
      </Card>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
      <DialogTitle>Donate</DialogTitle>
      <DialogContent>
      <DialogContentText>
          How much would you like to donate?
      </DialogContentText>
      <TextField
            autoFocus
            margin="dense"
            id="donation-amount"
            label="Donation Amount (MATIC)"
            type="number"
            fullWidth
            value={donationAmount} // Set the value from state
            onChange={(e) => setDonationAmount(e.target.value)} // Update the state on change
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsDialogOpen(false)} color="primary">
          Cancel
        </Button>
        <SendFunds researchId={id} donation={donationAmount}/>
      </DialogActions>
      </Dialog>

      <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setAlertSuccess(false)} severity="success">
          Successfully Donated {donationAmount} MATIC!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Research;
