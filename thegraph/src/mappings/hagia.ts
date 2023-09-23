import {
    AppliedToBounty as AppliedToBountyEvent,
    BountyCreated as BountyCreatedEvent,
    FundingReceived as FundingReceivedEvent,
    PeerReviewSubmitted as PeerReviewSubmittedEvent,
    PeerReviewerPaid as PeerReviewerPaidEvent,
    ResearchCreated as ResearchCreatedEvent,
    ResearcherChosen as ResearcherChosenEvent,
    ResearcherCreated as ResearcherCreatedEvent,
    ResearcherPaid as ResearcherPaidEvent
  } from "../../../thegraph/generated/Contract/Contract"
  import {
    Bounty,
    PeerReview,
    Research,
    Researcher,
  } from "../../../thegraph/generated/schema"
  
  import {BigInt, Bytes} from '@graphprotocol/graph-ts'
import { BIG_INT_ZERO } from "../lib/constants";

  function getResearcher(researcherId:string):Researcher {
    let researcher = Researcher.load(researcherId)
    if (researcher == null) {
      researcher = new Researcher(
        researcherId
      )
      researcher.blockNumber = BIG_INT_ZERO
      researcher.blockTimestamp = BIG_INT_ZERO
      researcher.previousBounties = []
      researcher.previousPeerReviews = []
      researcher.previousResearch= []
      researcher.affiliation = ""
      researcher.name = ""
      researcher.transactionHash = new Bytes(0)
    }
    return researcher;

  }

  function getResearch(researchId: string): Research {
    let research = Research.load(researchId)
    if (research == null) {
      research = new Research(
        researchId
      )
      research.blockNumber = BIG_INT_ZERO
      research.blockTimestamp = BIG_INT_ZERO
      research.contributingResearchers = []
      research.description = ""
      research.documentUrl = ""
      research.fundingLimit = BIG_INT_ZERO
      research.fundingType = 0
      research.peerReviews = []
      research.reviewDeadline  = BIG_INT_ZERO
      research.reviewFundingPercentage = BIG_INT_ZERO
      research.reviewerLimit = BIG_INT_ZERO
      research.title = ""
      research.transactionHash =new Bytes(0);

    }
    return research;
  }

  function getBounty(bountyId: string): Bounty {
    let bounty = Bounty.load(bountyId);

  if (bounty == null) {
    bounty = new Bounty(bountyId);
    bounty.applications =[]
    bounty.blockNumber = BIG_INT_ZERO;
    bounty.blockTimestamp =BIG_INT_ZERO
    bounty.bountyAmount = BIG_INT_ZERO
    bounty.description = ""
    bounty.documentUrl = ""
    bounty.pickedResearchers =[]
    bounty.transactionHash = new Bytes(0)
    bounty.title = ""
  }
  return bounty;
  }
  export function handleAppliedToBounty(event: AppliedToBountyEvent): void {
  let bounty = getBounty(event.params.bountyId.toString())

  const tempArray = bounty.applications
  tempArray.push(event.params.applicant);
  bounty.applications = tempArray
  bounty.save()
  }
  
  export function handleBountyCreated(event: BountyCreatedEvent): void {
    let entity = new Bounty(
        event.params.id.toString()
      )
    entity.title = event.params.title
    entity.description = event.params.description
    entity.documentUrl = event.params.documentUrl
    entity.bountyAmount = event.params.bountyAmount
  
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.applications = []
    entity.pickedResearchers =[]
    entity.save()
  }
  
  export function handleFundingReceived(event: FundingReceivedEvent): void {
    
    let research = getResearch(event.params.researchId.toString())
    
    research.fundingReceived = research.fundingReceived.plus(event.params.amount);
  
    research.save()
  }
  
  export function handlePeerReviewSubmitted(
    event: PeerReviewSubmittedEvent
  ): void {
    let entity = new PeerReview(
      event.params.peerReviewId.toString()
    )
    entity.researchId = event.params.researchId
    entity.researcherId = event.params.researcherId
    entity.peerReviewId = event.params.peerReviewId
    entity.feedback = event.params.feedback
    entity.documentUrl = event.params.documentUrl
    entity.rating = event.params.rating
  
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
  
    entity.save()

    let research = getResearch(event.params.researchId.toString());
    const tempArray = research.peerReviews
    tempArray.push(event.params.peerReviewId.toString());
    research.peerReviews = tempArray;
    research.save()

    let researcher = getResearcher(event.params.researcherId.toHexString())
    const tempArray2 = researcher.previousPeerReviews
    tempArray2.push(event.params.peerReviewId.toString());
    researcher.previousPeerReviews = tempArray2
    researcher.save()
  }
  
  export function handleResearchCreated(event: ResearchCreatedEvent): void {
    let entity = new Research(
      event.params.id.toString()
    )
    entity.title = event.params.title
    entity.description = event.params.description
    entity.documentUrl = event.params.documentUrl
    entity.fundingType = event.params.fundingType
    entity.contributingResearchers = changetype<Bytes[]>(event.params.contributingResearchers)
    entity.fundingLimit = event.params.fundingLimit
    entity.reviewerLimit = event.params.reviewerLimit
    entity.reviewDeadline = event.params.reviewDeadline
    entity.reviewFundingPercentage = event.params.reviewFundingPercentage
  
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.peerReviews = []
    entity.fundingReceived = BIG_INT_ZERO
  
    entity.save()

   for(let i = 0; i<entity.contributingResearchers.length; i++){
      let researcher = getResearcher(entity.contributingResearchers[i].toHexString());
      const tempArray = researcher.previousResearch
      tempArray.push(event.params.id.toString());
      researcher.previousResearch = tempArray;
      researcher.save();
   }
  }
  
  export function handleResearcherChosen(event: ResearcherChosenEvent): void {
    let bounty = getBounty(event.params.bountyId.toString())
    let selectedResearchers = event.params.selectedResearchers
    for (let i = 0; i < selectedResearchers.length; i++) {
      const tempArray = bounty.pickedResearchers;
      tempArray.push(selectedResearchers[i]);
      bounty.pickedResearchers = tempArray;

      let researcher = getResearcher(selectedResearchers[i].toHexString());
      const tempArray2 = researcher.previousBounties;
      tempArray2.push(event.params.bountyId.toString());
      researcher.previousBounties = tempArray2
      researcher.save()
      }    
      bounty.save();

    
  }
  
  export function handleResearcherCreated(event: ResearcherCreatedEvent): void {
    let entity = new Researcher(
      event.params.id.toHexString()
    )
    entity.name = event.params.name
    entity.affiliation = event.params.affiliation
  
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.previousBounties =[]
    entity.previousPeerReviews = []
    entity.previousResearch = []
    entity.save()
  }
  