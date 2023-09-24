import { createContext, useCallback, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const stateValues = {
  contractIsLoading: true,
  researches: [],
  researchers: [],
  bounties: [],
  peerReviews: [],
  previousPeerReviews: [],
  previousResearch: [],
  userNfts: [],
  isResearcher: false,
};

const contextValues = {
  ...stateValues,
  fetchSubgraphData: () => void 0,
};

export const ResearchContext = createContext(contextValues);

export const ResearchProvider = ({ children }) => {
  const [state, setState] = useState({});
  const { address, isConnected } = useAccount();
  console.log(address);
  const polygonApolloClient = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/efesozen7/hagia-sophia-2",
    cache: new InMemoryCache(),
  });

  const fetchNFTs = useCallback(async (walletAddress) => {
    try {
      if (address != undefined) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          id: 67,
          jsonrpc: "2.0",
          method: "qn_fetchNFTs",
          params: [
            {
              wallet: walletAddress,
              omitFields: ["traits"],
              page: 1,
              perPage: 10,
              contracts: ["0xD9e9927098DcEA8a6D6698c77922B4588C2aA9E4"],
            },
          ],
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://skilled-warmhearted-diamond.matic.discover.quiknode.pro/bdd60ff4553d1623a24612e789066236ba54e938/",
          requestOptions
        );

        const json = await response.json();
        const result = json.result.totalItems;
        console.log(result);
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  const fetchResearches = useCallback(async () => {
    try {
      const result = await polygonApolloClient.query({
        query: gql`
          query {
            researches(first: 10) {
              description
              documentUrl
              fundingLimit
              fundingReceived
              title
              image
            }
          }
        `,
      });

      const researches = result.data.researches;

      return researches;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchBounties = useCallback(async () => {
    try {
      const result = await polygonApolloClient.query({
        query: gql`
          query {
            bounties(first: 10) {
              id
              bountyAmount
              description
              documentUrl
              title
            }
          }
        `,
      });

      const bounties = result.data.bounties;

      return bounties;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchPeerReviews = useCallback(async () => {
    try {
      const result = await polygonApolloClient.query({
        query: gql`
          query {
            peerReviews(first: 10) {
              feedback
              peerReviewId
              researchId
              researcherId
              documentUrl
              rating
            }
          }
        `,
      });

      const peerReviews = result.data.peerReviews;

      return peerReviews;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchPreviousResearch = useCallback(async (address) => {
    try {
      if (address != undefined) {
        const result = await polygonApolloClient.query({
          query: gql`
          query{
                researcher(id: "${address.toLowerCase()}") {
                  previousResearch(first: 10) {
                        description
                  title
                  documentUrl
                    id
                  }
                }
              }
            `,
        });

        const previousResearch = result.data.researcher.previousResearch;

        return previousResearch;
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchPreviousPeerReviews = useCallback(async (address) => {
    try {
      if (address != undefined) {
        const result = await polygonApolloClient.query({
          query: gql`
        query{
                researcher(id: "${address.toLowerCase()}") {
                  previousPeerReviews(first: 10) {
                        feedback
                  researchId
                  documentUrl
                    rating
                  }
                }
              }
            `,
        });

        const previousPeerReviews = result.data.researcher.previousPeerReviews;

        return previousPeerReviews;
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const verifyResearcher = useCallback(async (walletAddress) => {
    if (address != undefined) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify([
        {
          id: 67,
          method: "qn_verifyNFTsOwner",
          params: [
            {
              wallet: walletAddress,
              contracts: ["0x019055b106302D458b457D5E9Dc9f95bF9bE81C2"],
            },
          ],
        },
      ]);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://skilled-warmhearted-diamond.matic.discover.quiknode.pro/bdd60ff4553d1623a24612e789066236ba54e938/",
        requestOptions
      );
      const result = await response.json();
      return result[0].result.assets.length > 0;
    }

    return false;
  }, []);

  const fetchSubgraphData = useCallback(async (address) => {
    setState(() => {
      return {
        contractIsLoading: true,
      };
    });

    const [
      bounties,
      peerReviews,
      researches,
      previousPeerReviews,
      previousResearch,
      userNfts,
      isResearcher,
    ] = await Promise.all([
      fetchBounties(),
      fetchPeerReviews(),
      fetchResearches(),
      fetchPreviousPeerReviews(address),
      fetchPreviousResearch(address),
      fetchNFTs(address),
      verifyResearcher(address),
    ]);

    setState((prevState) => {
      return {
        ...prevState,
        contractIsLoading: false,
        bounties: bounties,
        peerReviews: peerReviews,
        researches: researches,
        previousPeerReviews: previousPeerReviews,
        previousResearch: previousResearch,
        userNfts: userNfts,
      };
    });
  }, []);

  useEffect(() => {
    fetchSubgraphData(address);
  }, []);

  return (
    <ResearchContext.Provider
      value={{
        ...state,
        fetchSubgraphData,
      }}
    >
      {children}
    </ResearchContext.Provider>
  );
};
