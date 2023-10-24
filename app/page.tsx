// @ts-ignore: We are ignoring this because the "use client" might not be valid or recognized by TS
"use client"
import React, { useState, useEffect, FC } from "react";
import Navbar from "./component/navbar";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { ethers } from 'ethers';
import { formatEther, parseUnits } from "@ethersproject/units";
import Abi from "./json/adi.json";

// Here, we assume the type of initializeConnector to derive the type of the resulting array
const [metaMask, hooks] = initializeConnector((actions: any) => new MetaMask({ actions }));
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } = hooks;
const contractChain = 11155111;
const contractAddress = "0x64E6c5C4a741eC407Eb8d9EeDAbD4231C612f24a";

const Page: FC = () => {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActive = useIsActive();

  const provider = useProvider();
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, []);

  const handleConnect = () => {
    metaMask.activate(contractChain);
  }

  const handleDisconnect = () => {
    metaMask.resetState();
  }

  return (
    <div>
      <Navbar isActive={isActive} onConnect={handleConnect} onDisconnect={handleDisconnect} accounts={accounts} />
      <div className="container-center">
        <div className="card">
            <p>chainId: {contractChain}</p>
            <p>isActive: {isActive.toString()}</p>
            <p>accounts: {accounts ? accounts[0] : ''}</p>
            {isActive ?
                <button onClick={handleDisconnect}>Disconnect</button>
                :
                <button onClick={handleConnect}>Connect</button>
            }
        </div>
    </div>
    </div>
  );
}

export default Page;
