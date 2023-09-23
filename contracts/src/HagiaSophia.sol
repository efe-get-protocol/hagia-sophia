// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract HagiaSophia {
    enum FundingType {
        CROWDFUNDING,
        SELF_FUNDED
    }

    struct PeerReview {
        uint256 id;
        uint256 researchId;
        address researcherId;
        string feedback;
        string documentUrl;
        uint8 rating;
        bool paid;
    }

    struct Researcher {
        address id;
        string name;
        string affiliation;
        uint256 totalFundingReceived;
    }

    struct Research {
        uint256 id;
        string title;
        string description;
        string documentUrl;
        uint8 fundingType;
        uint256[] peerReviews;
        address[] researcherIds;
        uint256 fundingReceived;
        uint256 completionRate;
        uint256 fundingLimit;
        uint256 reviewerLimit;
        uint256 reviewDeadline;
        uint256 reviewFundingPercentage;
        bool paid;
    }

    struct Bounty {
        uint256 id;
        string title;
        string description;
        string documentUrl;
        uint256 bountyAmount;
        address payable[] applications;
        address[] pickedResearchers;
    }

    event FundingReceived(uint256 researchId, uint256 amount, address from);
    event ResearcherCreated(address id, string name, string affiliation);
    event ResearchCreated(
        uint256 id,
        string title,
        string description,
        string documentUrl,
        uint8 fundingType,
        address[] contributingResearchers,
        uint256 fundingLimit,
        uint256 reviewerLimit,
        uint256 reviewDeadline,
        uint256 reviewFundingPercentage
    );
    event BountyCreated(uint256 id, string title, string description, string documentUrl, uint256 bountyAmount);
    event AppliedToBounty(uint256 bountyId, address applicant);
    event ResearcherChosen(uint256 bountyId, address payable[] selectedResearchers);
    event PeerReviewSubmitted(uint256 researchId, address researcherId, uint256 peerReviewId, string feedback, string documentUrl, uint8 rating);
    event PeerReviewerPaid(uint256 peerReviewId, address reviewer, uint256 paidAmount);
    event ResearcherPaid(uint256 researchId, address mainResearcher, uint256 paidAmount);

    mapping(address => Researcher) public researchers;
    mapping(uint256 => Research) public allResearch;
    mapping(uint256 => Bounty) public bounties;
    mapping(uint256 => PeerReview) public peerReviews;

    uint256 public currentResearchId = 0;
    uint256 public currentBountyId = 0;
    uint256 public currentPeerReviewId = 0;

    function fund(uint256 researchId) external payable {
        require(msg.value > 0, "FUND_SEND_TOKEN");

        Research memory research = allResearch[researchId];
        require(research.fundingReceived + msg.value <= research.fundingLimit, "FUND_EXCEEDS_LIMIT");

        research.fundingReceived = research.fundingReceived + msg.value;
        allResearch[researchId] = research;

        address[] memory researcherIds = research.researcherIds;

        for (uint256 i = 0; i < researcherIds.length; i++) {
            Researcher memory currentResearcher = researchers[researcherIds[i]];
            currentResearcher.totalFundingReceived = currentResearcher.totalFundingReceived + msg.value;
            researchers[researcherIds[i]] = currentResearcher;
        }

        emit FundingReceived(researchId, msg.value, msg.sender);
    }

    function createResearcher(string memory name, string memory affiliation) external {
        Researcher memory researcher =
            Researcher({id: msg.sender, name: name, affiliation: affiliation, totalFundingReceived: 0});

        researchers[msg.sender] = researcher;

        emit ResearcherCreated(msg.sender, name, affiliation);
    }

    function createResearch(
        string memory title,
        string memory description,
        string memory documentUrl,
        uint8 fundingType,
        uint256 fundingLimit,
        uint256 reviewFundingPercentage,
        address[] memory contributingResearchers,
        uint256 reviewerLimit,
        uint256 reviewDeadline
    ) external {
        currentResearchId = currentResearchId + 1;
        Research memory research = Research({
            id: currentResearchId,
            description: description,
            title: title,
            documentUrl: documentUrl,
            fundingType: fundingType,
            peerReviews: new uint256[](0),
            researcherIds: contributingResearchers,
            fundingReceived: 0,
            fundingLimit: fundingLimit,
            completionRate: 0,
            reviewerLimit: reviewerLimit,
            reviewDeadline: block.timestamp + (reviewDeadline * 1 days),
            reviewFundingPercentage: reviewFundingPercentage,
            paid: false
        });

        allResearch[currentResearchId] = research;

        emit ResearchCreated(
            currentResearchId,
            title,
            description,
            documentUrl,
            fundingType,
            contributingResearchers,
            fundingLimit,
            reviewerLimit,
            block.timestamp + (reviewDeadline * 1 days),
            reviewFundingPercentage
        );
    }

    function createBounty(string memory title, string memory description, string memory documentUrl) external payable {
        require(msg.value > 0, "BOUNTY_SEND_TOKEN");

        currentBountyId = currentBountyId + 1;
        Bounty memory bounty = Bounty({
            id: currentBountyId,
            title: title,
            description: description,
            documentUrl: documentUrl,
            bountyAmount: msg.value,
            applications: new address payable[](0),
            pickedResearchers: new address[](0)
        });

        bounties[currentBountyId] = bounty;

        emit BountyCreated(currentBountyId, title, description, documentUrl, msg.value);
    }

    //todo modifer for only researcher
    function applyToBounty(uint256 bountyId) external {
        Bounty memory currentBounty = bounties[bountyId];
        address payable[] memory applications = currentBounty.applications;
        uint256 length = applications.length;
        address payable[] memory newApplications = new address payable[](length + 1);

        for (uint256 i = 0; i < length; i++) {
            newApplications[i] = applications[i];
        }

        newApplications[length] = payable(msg.sender);

        currentBounty.applications = newApplications;

        bounties[bountyId] = currentBounty;

        emit AppliedToBounty(bountyId, msg.sender);
    }

    function chooseResearcher(uint256 bountyId, address payable[] memory selectedResearchers) external {
        Bounty memory currentBounty = bounties[bountyId];
        currentBounty.applications = selectedResearchers;
        bounties[bountyId] = currentBounty;

        selectedResearchers[0].transfer(currentBounty.bountyAmount);

        emit ResearcherChosen(bountyId, selectedResearchers);
    }

    function updateResearch(uint256 researchId, uint256 percentage) external {
        Research memory currentResearch = allResearch[researchId];
        currentResearch.completionRate = percentage;
        allResearch[researchId] = currentResearch;
    }

    function submitPeerReview(uint256 researchId, string memory feedback, string memory documentUrl, uint8 rating)
        external
    {
        Research memory currentResearch = allResearch[researchId];
        require(block.timestamp < currentResearch.reviewDeadline, "PR_DEADLINE_PASSED");
        require(currentResearch.peerReviews.length < currentResearch.reviewerLimit);
        currentPeerReviewId = currentPeerReviewId + 1;
        PeerReview memory currentReview = PeerReview({
            id: currentPeerReviewId,
            researchId: researchId,
            feedback: feedback,
            documentUrl: documentUrl,
            rating: rating,
            researcherId: msg.sender,
            paid: false
        });

        peerReviews[currentPeerReviewId] = currentReview;

        emit PeerReviewSubmitted(researchId, msg.sender, currentPeerReviewId, feedback, documentUrl, rating);
    }

    function claimPeerReviewPrize(uint256 peerReviewId) external {
        PeerReview memory currentPeerReview = peerReviews[peerReviewId];
        uint256 peerReviewResearch = currentPeerReview.researchId;
        Research memory currentResearch = allResearch[peerReviewResearch];

        require(currentPeerReview.researcherId == msg.sender, "DID_NOT_PEER_REVIEW_THIS");
        require(block.timestamp > currentResearch.reviewDeadline, "DEADLINE_DID_NOT_PASS_YET");

        uint256 researchPercentage = currentResearch.reviewFundingPercentage;
        uint256 researchPeerReviewerAmount = currentResearch.peerReviews.length;
        uint256 researchFundCollected = currentResearch.fundingReceived;

        uint256 toBePaid = researchFundCollected / (researchPercentage * 100 / researchPeerReviewerAmount);

        currentPeerReview.paid = true;
        peerReviews[currentPeerReviewId] = currentPeerReview;

        payable(msg.sender).transfer(toBePaid);

        emit PeerReviewerPaid(peerReviewId, msg.sender, toBePaid);
    }

    function claimFunds(uint256 researchId) external {
        Research memory currentResearch = allResearch[researchId];
        uint256 researchPercentage = 100 - currentResearch.reviewFundingPercentage;
        uint256 researchFundCollected = currentResearch.fundingReceived;
        address mainResearcher = currentResearch.researcherIds[0];
        currentResearch.paid = false;
        allResearch[researchId] = currentResearch;
        uint256 toBePaid = researchPercentage / 100 * researchFundCollected;
        payable(mainResearcher).transfer(toBePaid);

        emit ResearcherPaid(researchId, mainResearcher, toBePaid);

    }
}
