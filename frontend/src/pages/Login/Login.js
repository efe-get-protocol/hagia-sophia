import React from 'react'
import './Login.css'
import { useState } from 'react'

const Login = () => {

  const [walletAddress, setWalletAddress] = useState("")

  const requestAccount = async () => {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("detected")

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        setWalletAddress(accounts[0])
        } catch (error) {
        alert("Error connecting...")
        }
    } 
    else {
      alert("MetaMask not detected. Please download the Google chrome web browser extension from web store.")
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      // const provider = new ethers.providers.Web3Provider(window.ethereum);

    }
  }




  return (
    <div className="Login">
      <button onClick={requestAccount}>Connect Wallet</button>
      <h3>Wallet Address: {walletAddress}</h3>
    </div>
  )
}

export default Login