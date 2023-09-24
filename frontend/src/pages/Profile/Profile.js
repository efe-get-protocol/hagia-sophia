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
import { ResearchContext } from '../../providers/subgraph';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Profile = () => {
  // Define user data (you can fetch this from an API or other source)
  const {userNFTs} = useContext(ResearchContext)
  
  const userData = {
    name: 'John Doe',
    affiliation: 'University XYZ',
    walletAddress: '0x1234567890abcdef',
    imageURL: 'hagia_sophia_logo.jpg'
    // Add more fields as needed
  };

  const handleClaimPrize = () => {
    //add logic
  }
  const handlePeerReviewPrize = () => {
    //add logic
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
          <Button onClick={handleClaimPrize} variant="contained"  endIcon={<MonetizationOnIcon/>}>Cash in Funds</Button>
          <Button onClick={handlePeerReviewPrize} variant="contained"  endIcon={<MonetizationOnIcon/>}>Collect Peer Review Funds</Button>
        </Stack>
      </Box>

  </div>
  );
};

export default Profile;
