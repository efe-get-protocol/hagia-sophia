import React, {useState} from "react";
import { TextField, Button} from "@mui/material";
import { Link } from "react-router-dom"
import SendIcon from '@mui/icons-material/Send';
import {ethers, BigNumber} from 'ethers';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const INFURA_ID = 'e18cea1fcdc44e6a84e5ab03efd311af'
const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mainnet.g.alchemy.com/v2/Qni5uO72dYJS_s5J74W5ptgQmOVISuUS`)

const publicKey = "0x30D38078D6117285d6730F971d3F50A9004a575B"
const privateKey = '' // Private key of account 1
const contractAddress = "0x942380a100C0f489A163060f3a42359347FB4a2D";
const wallet = new ethers.Wallet(privateKey, provider);

// const contractABI = ["function createResearch(string,string,string,uint8,uint256,uint256,address[],uint256,uint256,string) view returns ()"];
// const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '700px', // Adjust the maximum width as needed
      margin: '0 auto',
      marginTop: '40px'
    },
    textField: {
      marginBottom: '36px', // Adjust the spacing between fields as needed
    },
    submitButton: {
      marginTop: '16px', // Adjust the spacing above the submit button as needed
      backgroundColor: '#6A0DAD', // Byzantine Blue
      color: 'white',
    },
  };

const ResearchForm = () => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        documentUrl: '',
        fundingLimit: '',
        reviewerLimit: '',
        reviewFundingPercentage: '',
        image: '',
      });

      const [alertSuccess, setAlertSuccess] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      async function executeTransaction(approveTxUnsigned) {
        approveTxUnsigned.chainId = 137;
        approveTxUnsigned.nonce = await provider.getTransactionCount(publicKey);
        approveTxUnsigned.gasPrice = await provider.getGasPrice()
        approveTxUnsigned.gasLimit = 2000000
        console.log("nonce", approveTxUnsigned.nonce)
        const approveTxSigned = await wallet.signTransaction(approveTxUnsigned);
        console.log("signed", approveTxSigned)

        const submittedTx = await provider.sendTransaction(approveTxSigned);
        console.log("submitted", submittedTx)

        const approveReceipt = await submittedTx.wait();
        console.log("receipet", approveReceipt)
        return approveReceipt;
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here This is where etherjs
        try {
          console.log("hello")
          const tx =  await contract.connect(wallet).populateTransaction.createResearch(formData.title, formData.description, formData.documentUrl, 0,  BigNumber.from(formData.fundingLimit), BigNumber.from(formData.reviewFundingPercentage), [],  BigNumber.from(formData.reviewerLimit),  BigNumber.from(0), "url");
          console.log("tx", tx)
          const ret = await executeTransaction(tx);
          console.log(ret)
        } catch (error) {
          console.error("Error:", error);
        }

        
      };
      return (
        <div className="research-form">
          <h1>Please fill out the information below and wait for approval.</h1>
        <form style={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <TextField
                label="Title"
                name="title"
                fullWidth
                required
                onChange={handleChange}
                value={formData.title}
                style={styles.textField}
                InputLabelProps={{
                style: { color: 'white' },
                }}
                InputProps={{
                style: { color: 'white', backgroundColor: '#6A0DAD' },
                }}
            />
            <TextField
                label="Description"
                name="description"
                fullWidth
                required
                onChange={handleChange}
                value={formData.description}
                style={styles.textField}
                InputLabelProps={{
                style: { color: 'white' },
                }}
                InputProps={{
                style: { color: 'white', backgroundColor: '#6A0DAD' },
                }}
            />
            <TextField
                label="Research Document URL"
                name="documentUrl"
                fullWidth
                required
                onChange={handleChange}
                value={formData.documentUrl}
                style={styles.textField}
                InputLabelProps={{
                style: { color: 'white' },
                }}
                InputProps={{
                style: { color: 'white', backgroundColor: '#6A0DAD' },
                }}
            />
            <TextField
                label="Funding Limit"
                name="fundingLimit"
                fullWidth
                required
                onChange={handleChange}
                value={formData.fundingLimit}
                style={styles.textField}
                InputLabelProps={{
                style: { color: 'white' },
                }}
                InputProps={{
                style: { color: 'white', backgroundColor: '#6A0DAD' },
                }}
            />
            <TextField
                label="Reviewer Limit"
                name="reviewerLimit"
                fullWidth
                required
                onChange={handleChange}
                value={formData.reviewerLimit}
                style={styles.textField}
                InputLabelProps={{
                style: { color: 'white' },
                }}
                InputProps={{
                style: { color: 'white', backgroundColor: '#6A0DAD' },
                }}
            />
            <TextField
                label="Review Funding Limit Percentage"
                name="reviewFundingPercentage"
                fullWidth
                required
                onChange={handleChange}
                value={formData.reviewFundingPercentage}
                style={styles.textField}
                InputLabelProps={{
                style: { color: 'white' },
                }}
                InputProps={{
                style: { color: 'white', backgroundColor: '#6A0DAD' },
                }}
            />

            <TextField
                label="Organization Image"
                name="image"
                fullWidth
                required
                onChange={handleChange}
                value={formData.image}
                style={styles.textField}
                InputLabelProps={{
                style: { color: 'white' },
                }}
                InputProps={{
                style: { color: 'white', backgroundColor: '#6A0DAD' },
                }}
            />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={styles.submitButton}
            
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </form>
        <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setAlertSuccess(false)} severity="success">
            Successfully Submitted Crowdfunding Contract Application!
        </MuiAlert>
      </Snackbar>
    </div>
    );
      
}

export default ResearchForm