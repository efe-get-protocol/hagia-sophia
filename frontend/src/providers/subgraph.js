import { createContext, useCallback, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from 'wagmi'

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const stateValues = {
  contractIsLoading: true,
  researches: [],
  researchers: [],
  bounties: [],
  peerReviews: [],
  previousPeerReviews: [],
  previousResearch: []
};

const contextValues = {
  ...stateValues,
  fetchSubgraphData: () => void 0,
};

export const ResearchContext = createContext(contextValues);

export const ResearchProvider = ({ children }) => {
  const [state, setState] = useState({});
  const { address,isConnected } = useAccount()
  console.log(address)
  const polygonApolloClient = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/efesozen7/hagia-sophia-2",
    cache: new InMemoryCache(),
  });

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
      if(address != undefined) {const result = await polygonApolloClient.query({
        query:
          gql`
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

      return previousResearch;}
      
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchPreviousPeerReviews = useCallback(async (address) => {
    try {
      if(address != undefined){
        const result = await polygonApolloClient.query({
        query:
          gql`
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

  const fetchSubgraphData = useCallback(async (address) => {
    setState(() => {
      return {
        contractIsLoading: true,
      };
    });

    const [bounties, peerReviews, researches, previousPeerReviews, previousResearch] = await Promise.all([
      fetchBounties(),
      fetchPeerReviews(),
      fetchResearches(),
      fetchPreviousPeerReviews(address),
      fetchPreviousResearch(address)
    ]);

    setState((prevState) => {
      return {
        ...prevState,
        contractIsLoading: false,
        bounties: bounties,
        peerReviews: peerReviews,
        researches: researches,
        previousPeerReviews: previousPeerReviews,
        previousResearch: previousResearch
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
