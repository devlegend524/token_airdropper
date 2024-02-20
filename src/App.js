import React from 'react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ALCHEMY_ID } from 'config';
import { RouterProvider } from 'react-router-dom';
import PageRouter from 'router';
import Layout from 'layout';
const { provider, chains } = configureChains(
  [mainnet, goerli],
  [alchemyProvider({ apiKey: ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Token AirDropper',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <RouterProvider router={PageRouter} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
