import React, {useState} from "react";
import { TextField, Button} from "@mui/material";
import { Link } from "react-router-dom"
import SendIcon from '@mui/icons-material/Send';


const { ethers } = require("ethers");

const INFURA_ID = 'e18cea1fcdc44e6a84e5ab03efd311af'
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const privateKey = 'd25d586238b2809ddc2b3d77d55a0add701d84d9dc31449138214992f3e2db10' // Private key of account 1
const contractAddress = "0x942380a100C0f489A163060f3a42359347FB4a2D";
const wallet = new ethers.Wallet(privateKey, provider);

const contractABI = ["function createResearch(string,string,string,uint8,uint256,uint256,address[],uint256,uint256,string) view returns ()"];
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

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
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here This is where etherjs
        try {
          const tx =  contract.connect(wallet).createResearch(formData.title, formData.description, formData.documentUrl, 0, formData.fundingLimit, formData.reviewFundingPercentage, [],formData.reviewerLimit, 0, formData.image);
          const receipt = tx.wait();
          
        } catch (error) {
          console.error("Error:", error);
        }

        
      };
    
      return (
        <div className="research-form">
          <h1>Please fill out the information below and wait for approval.</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
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
    </div>
    );
      
}

export default ResearchForm