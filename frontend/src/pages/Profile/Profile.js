import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TextField from '@mui/material/TextField'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ResearchContext } from '../../providers/subgraph';
import { useAccount } from 'wagmi';
import { ClaimFunds, ClaimPeerReviewPrize } from '../../components/SendTransaction/sendTransactionWagmi';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Profile = () => {
  // Define user data (you can fetch this from an API or other source)
  const {researcherData} = useContext(ResearchContext)
  console.log("researcherData", researcherData)
  const {address} = useAccount()
  const [isClaimPrizeDialogOpen, setIsClaimPrizeDialogOpen] = useState(false);
  const [isClaimFundDialogOpen, setIsClaimFundDialogOpen] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [researcherId, setResearcherId] = useState(''); // Initialize the state
  const [peerRevId, setPeerRevId] = useState('')

let userData;
if(researcherData){
  userData = {
    name: researcherData.name,
    affiliation: researcherData.affiliation,
    imageURL: 'hagia_sophia_logo.jpg',
    walletAddress: address
  }
}

else {
  userData = {
    name: 'John Doe',
    affiliation: 'University XYZ',
    walletAddress: '0x1234567890abcdef',
    imageURL: 'hagia_sophia_logo.jpg'
    // Add more fields as needed
  };
}

  const handleClaimPrizeClick = () => {
    setIsClaimPrizeDialogOpen(true);
  }
  const handlePeerRevClick = () => {
    setIsClaimFundDialogOpen(true);
  }

  const handleClaimPrize = () => {
    //add logic
    console.log(researcherId)

    setIsClaimPrizeDialogOpen(false);
    setAlertSuccess(true);
  }
  const handlePeerReviewPrize = () => {
    //add logic

    console.log(peerRevId)
    
    setIsClaimFundDialogOpen(false);
    setAlertSuccess(true);
  }

  return (
    <div>
      <h1>User Profile</h1>
      <Avatar alt="User Image" style={{float: 'left'}}src={userData.imageURL} sx={{ width: 500, height: 500}} />

      <Box sx={{ width: '60%' }} style={{ float: 'right', paddingRight: '50px', marginTop: '50px' }}>
        <Stack spacing={5}>
          <Item sx={{ fontSize: '25px', fontWeight: 'bold' }}>Name: {userData.name}</Item>
          <Item sx={{ fontSize: '25px', fontWeight: 'bold' }}>Affiliation: {userData.affiliation}</Item>
          <Item sx={{ fontSize: '25px', fontWeight: 'bold' }}>Wallet Address: {userData.walletAddress}</Item>
          <Button onClick={handleClaimPrizeClick} variant="contained"  endIcon={<MonetizationOnIcon/>}>Collect Reward</Button>
          <Button onClick={handlePeerRevClick} variant="contained"  endIcon={<MonetizationOnIcon/>}>Collect Peer Review Reward</Button>
        </Stack>
      </Box>

      <Dialog open={isClaimPrizeDialogOpen} onClose={() => setIsClaimPrizeDialogOpen(false)}>
      <DialogTitle>Collect Your Researcher Reward</DialogTitle>
      <DialogContent>
      <DialogContentText>
          Please enter your Researcher ID
      </DialogContentText>
      <TextField
            autoFocus
            margin="dense"
            id="researcherId"
            label="Researcher ID"
            type="string"
            fullWidth
            value={researcherId} // Set the value from state
            onChange={(e) => setResearcherId(e.target.value)} // Update the state on change
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsClaimPrizeDialogOpen(false)} color="primary">
          Cancel
        </Button>
        <ClaimFunds researchId={researcherId}/>
      </DialogActions>
      </Dialog>

      <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setAlertSuccess(false)} severity="success">
          Successfully Claimed Prize!
        </MuiAlert>
      </Snackbar>

      <Dialog open={isClaimFundDialogOpen} onClose={() => setIsClaimFundDialogOpen(false)}>
      <DialogTitle>Collect Your Peer Review Reward</DialogTitle>
      <DialogContent>
      <DialogContentText>
          Please enter your Peer Review ID
      </DialogContentText>
      <TextField
            autoFocus
            margin="dense"
            id="peerRevId"
            label="Peer Review ID"
            type="string"
            fullWidth
            value={peerRevId} // Set the value from state
            onChange={(e) => setPeerRevId(e.target.value)} // Update the state on change
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsClaimFundDialogOpen(false)} color="primary">
          Cancel
        </Button>
        <ClaimPeerReviewPrize peerReviewId={peerRevId}/>
      </DialogActions>
      </Dialog>

  </div>
  );
};

export default Profile;
