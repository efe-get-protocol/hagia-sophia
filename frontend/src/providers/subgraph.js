import { createContext, useCallback, useEffect, useState } from 'react';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const stateValues = {
  contractIsLoading: true,
  researches: [],
  researchers: [],
  bounties: [],
  peerReviews: [], 
};

const contextValues = {
  ...stateValues,
  fetchSubgraphData: () => void 0,
};

export const ResearchContext = createContext(contextValues);

export const ResearchProvider = ({ children }) => {

  const [state, setState] = useState({
  });

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
          })

      // Filter out memories with invalid JSON, and parse valid JSON
      const researches = result.data.researches;

      return researches;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchBounties= useCallback(async () => {
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
          })

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
          })

      const peerReviews = result.data.peerReviews;

      return peerReviews;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchSubgraphData = useCallback(async () => {
    setState(() => {
      return {
        contractIsLoading: true,
      };
    });

    const [bounties, peerReviews, researches] = await Promise.all([fetchBounties(), fetchPeerReviews(), fetchResearches()]);

    setState(prevState => {
      return {
        ...prevState,
        contractIsLoading: false,
        bounties: bounties,
        peerReviews: peerReviews,
        researches: researches,
      };
    });
  }, []);

  useEffect(() => {
    fetchSubgraphData();
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
