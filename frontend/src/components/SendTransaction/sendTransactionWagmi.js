import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import SendIcon from "@mui/icons-material/Send";
import { TextField, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { parseEther } from "viem";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "700px", // Adjust the maximum width as needed
    margin: "0 auto",
    marginTop: "40px",
  },
  textField: {
    marginBottom: "36px", // Adjust the spacing between fields as needed
  },
  submitButton: {
    marginTop: "16px", // Adjust the spacing above the submit button as needed
    backgroundColor: "#6A0DAD", // Byzantine Blue
    color: "white",
  },
};
export function CreateResearchWagmi(props) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x942380a100C0f489A163060f3a42359347FB4a2D",
    abi: [
      {
        name: "createResearch",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { internalType: "string", name: "title", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "string", name: "documentUrl", type: "string" },
          { internalType: "uint8", name: "fundingType", type: "uint8" },
          { internalType: "uint256", name: "fundingLimit", type: "uint256" },
          {
            internalType: "uint256",
            name: "reviewFundingPercentage",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "contributingResearchers",
            type: "address[]",
          },
          { internalType: "uint256", name: "reviewerLimit", type: "uint256" },
          {
            internalType: "uint256",
            name: "reviewDeadline",
            type: "uint256",
          },
          { internalType: "string", name: "image", type: "string" },
        ],
        outputs: [],
      },
    ],
    functionName: "createResearch",
    args: [
      props.title,
      props.description,
      props.documentUrl,
      props.fundingType,
      props.fundingLimit,
      props.reviewFundingPercentage,
      props.contributingResearchers,
      props.reviewerLimit,
      props.reviewDeadline,
      props.image,
    ],
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="research-form">
      <div style={styles.form}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={styles.submitButton}
          endIcon={<SendIcon />}
          disabled={!write || isLoading}
          onClick={() => write()}
        >
          {isLoading ? "Submitting" : "Submit"}
        </Button>
        {/* <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setAlertSuccess(false)} severity="success">
            Successfully Submitted Crowdfunding Contract Application!
        </MuiAlert>
      </Snackbar> */}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </div>
    </div>
  );
}

export function Apply(props) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x942380a100C0f489A163060f3a42359347FB4a2D",
    abi: [
      {
        inputs: [
          { internalType: "uint256", name: "bountyId", type: "uint256" },
        ],
        name: "applyToBounty",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "applyToBounty",
    args: [props.id],
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="research-form">
      <div style={styles.form}>
        <Button
          style={{ color: "white", margin: "auto", backgroundColor: "blue" }}
          size="small"
          disabled={!write || isLoading}
          onClick={() => write()}
        >
          {isLoading ? "Applying" : "Apply"}
        </Button>
        {/* <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setAlertSuccess(false)} severity="success">
            Successfully Submitted Crowdfunding Contract Application!
        </MuiAlert>
      </Snackbar> */}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </div>
    </div>
  );
}

export function CreateBounty(props) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x942380a100C0f489A163060f3a42359347FB4a2D",
    abi: [
      {
        inputs: [
          { internalType: "string", name: "title", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "string", name: "documentUrl", type: "string" },
        ],
        name: "createBounty",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "createBounty",
    args: [props.title, props.description, props.documentUrl],
    value: parseEther(props.bountyAmount),
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="research-form">
      <div style={styles.form}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={styles.submitButton}
          endIcon={<SendIcon />}
          disabled={!write || isLoading}
          onClick={() => write()}
        >
          {isLoading ? "Creating Bounty" : "Create"}
        </Button>
        {/* <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setAlertSuccess(false)} severity="success">
            Successfully Submitted Crowdfunding Contract Application!
        </MuiAlert>
      </Snackbar> */}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </div>
    </div>
  );
}

export function CreatePeerReview(props) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x942380a100C0f489A163060f3a42359347FB4a2D",
    abi: [
      {
        inputs: [
          { internalType: "uint256", name: "researchId", type: "uint256" },
          { internalType: "string", name: "feedback", type: "string" },
          { internalType: "string", name: "documentUrl", type: "string" },
          { internalType: "uint8", name: "rating", type: "uint8" },
        ],
        name: "submitPeerReview",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "submitPeerReview",
    args: [props.researchId, props.documentUrl, props.feedback, props.rating],
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="research-form">
      <div style={styles.form}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={styles.submitButton}
          endIcon={<SendIcon />}
          disabled={!write || isLoading}
          onClick={() => write()}
        >
          {isLoading ? "Submitting" : "Submit"}
        </Button>
        {/* <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setAlertSuccess(false)} severity="success">
            Successfully Submitted Crowdfunding Contract Application!
        </MuiAlert>
      </Snackbar> */}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </div>
    </div>
  );
}
