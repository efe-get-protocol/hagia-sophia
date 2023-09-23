import React, {useState} from "react";
import { TextField, Button} from "@mui/material";
import { Link } from "react-router-dom"
import SendIcon from '@mui/icons-material/Send';

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
        console.log(formData);
      };
    
      return (
        <div className="research-form">
          <br/>
          <br/>
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