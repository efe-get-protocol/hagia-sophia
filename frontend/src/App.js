
import './App.css';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/NavigationBar.js'
import Crowdfunding from './pages/Crowdfunding/Crowdfunding.js';
import Bounties from './pages/Bounties/Bounties.js'
import Review from './pages/Review/Review.js'
import Research from './pages/Research/Research.js'
import Login from './pages/Login/Login.js'
import ResearchForm from './pages/Application/ResearchForm'
import Collections from './pages/Collections/Collections';
import { ResearchProvider } from './providers/subgraph';
import { useMemo } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import BountyForm from './pages/Application/BountyForm'
import { PROJECT_ID_WALLET_CONNECT } from "./env.js";
import Profile from './pages/Profile/Profile'


const chains = [polygon]
const projectId = PROJECT_ID_WALLET_CONNECT;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
  const subgraphClient = useMemo(() => {
    const defaultOptions = {
      query: {
        fetchPolicy: 'network-only',
      },
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
    };

    return new ApolloClient({
      uri: "https://api.thegraph.com/subgraphs/name/efesozen7/hagia-sophia-2",
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions,
    });
  }, ["https://api.thegraph.com/subgraphs/name/efesozen7/hagia-sophia-2"]);
  return (
    <div className="App" id="outer-container">
      <WagmiConfig config={wagmiConfig}>      
      <ApolloProvider client={subgraphClient}>

      <ResearchProvider>
      <NavigationBar/>

      <Routes>
        <Route path='/' element={ <Crowdfunding/> } />
        <Route path='/Crowdfunding' element={ <Crowdfunding/> } />
        <Route path='/Bounties' element={ <Bounties/> } />
        <Route path='/Review' element={ <Review/> } />
        <Route path='/Research' element={ <Research/> } />
        <Route path='/Login' element={<Login/>} />
        <Route path='/ResearchForm' element={<ResearchForm/>} />
        <Route path='/BountyForm' element={<BountyForm/>} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Collections' element={<Collections/>} />
        
      </Routes>
      </ResearchProvider>
      </ApolloProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
}

export default App;
