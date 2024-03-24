"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { useProvider } from "../hooks/useProvider";
import useStagedTransaction from "../hooks/useStagedTransactions";
import { GetETHBalanceStageMessages } from "../utils/constants";
import { useNFTContract } from "../hooks/useNFTContract";
import useSWRMutation from "swr/mutation";
import {
  convertNFTData,
  processBigNumber,
  processEth,
} from "../utils/converters";
import LoadingSpinner from "./LoadingSpinner";
import { MdWarning } from "react-icons/md";
import { NFTData } from "../type/type";
import LoadingData from "./LoadingData";

const EthereumNFTBalance = () => {
  const [address, setAddress] = useState<string>("");
  const [ethBalance, setEthBalance] = useState<number | null>(null);
  const [nftBalance, setNFTBalance] = useState<number | null>(null);
  const [nftData, setNFTData] = useState<NFTData | null>(null);
  const [isValidAddress, setIsValidAddress] = useState<boolean>(true);
  const {
    getBalanceOf,
    getImage,
    getMintsPerAddress,
    getOwner,
    getName,
    getTotalSupply,
  } = useNFTContract();
  const { stage, run } = useStagedTransaction(GetETHBalanceStageMessages.INFO);
  const { provider } = useProvider();

  const isWalletAddress = () => {
    return ethers.isAddress(address);
  };

  const handleReset = () => {
    setAddress("");
    setEthBalance(null);
    setNFTBalance(null);
    setNFTData(null);
    setIsValidAddress(true);
  };

  const getBalanceHandler = async () => {
    handleReset();
    if (!isWalletAddress()) {
      setIsValidAddress(false);
      return;
    }
    setIsValidAddress(true);
    await run(
      [
        GetETHBalanceStageMessages.UPDATE,
        GetETHBalanceStageMessages.ERROR,
        GetETHBalanceStageMessages.SUCCESS,
      ],
      async () => {
        const balanceData = await provider?.getBalance(address);
        setEthBalance(processEth(balanceData || ""));

        const nftBalanceData = await getBalanceOf({ address });
        setNFTBalance(processBigNumber(nftBalanceData));

        if (nftBalanceData) {
          const nftImage = await getImage();
          const nftMintsPerAddress = await getMintsPerAddress({ address });
          const nftOwner = await getOwner();
          const nftName = await getName();
          const nftTotalSupply = await getTotalSupply();

          const convertedData: NFTData = convertNFTData({
            nftImage,
            nftMintsPerAddress,
            nftOwner,
            nftName,
            nftTotalSupply,
          });

          setNFTData(convertedData);
        } else {
          setNFTData(null);
        }
      }
    );
  };

  const { trigger: searchBalance, isMutating: isLoading } = useSWRMutation(
    "getBalance",
    () => getBalanceHandler()
  );

  return (
    <div className="p-12 flex flex-col justify-center items-center h-screen">
      <div className="bg-gradient-to-r from-dark-purple to-medium-purple px-32 py-20 max-sm:p-12 rounded-xl">
        <h1 className="text-3xl font-semibold mb-4 capitalize text-center">
          Ethereum & NFT balance checker
        </h1>
        <div className="flex items-start p-6 max-sm:flex-col max-sm:items-center">
          <div>
            <input
              type="text"
              placeholder="Enter a wallet address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-2 p-4 border-light-purple bg-dark-purple rounded-[50px] placeholder-light-purple text-light-purple h-14 min-w-[500px] max-sm:min-w-[300px] text-lg hover:bg-dark-medium-purple focus:bg-dark-medium-purple focus:outline-none"
            />
            <div className="flex ml-4 mt-4 items-end">
              {stage === GetETHBalanceStageMessages.ERROR || !isValidAddress ? (
                <MdWarning color="red" size="25px" />
              ) : null}
              <p className="text-light-purple">
                {!isValidAddress ? "This is not a valid address" : stage}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => searchBalance()}
              className="flex justify-center items-center px-6 py-2 rounded-[50px] ml-6 text-lg text-dark-purple hover:shadow-xl h-14 bg-light-purple uppercase min-w-[120px]"
            >
              {isLoading ? <LoadingSpinner /> : "Search"}
            </button>
            {isLoading ? null : (
              <p
                className="text-light-purple underline cursor-pointer ml-6"
                onClick={() => handleReset()}
              >
                Reset
              </p>
            )}
          </div>
        </div>

        {ethBalance !== null && nftBalance !== null ? (
          <div className="flex max-sm:flex-col justify-between bg-dark-purple rounded-lg p-6 mx-8 border-2 border-light-purple">
            <div className="border-r-2 max-sm:border-b-2 max-sm:border-r-0 max-sm:mr-0 max-sm:pb-6 border-light-purple flex flex-col basis-3/6 mr-6">
              <h2 className="text-[24px] font-semibold">ETH</h2>
              <p className="text-lg">Balance: {ethBalance} ETH</p>
            </div>
            <div className="flex flex-col basis-3/6 ml-6 max-sm:ml-0 max-sm:mt-6">
              <h2 className="text-[24px] font-semibold">NFT</h2>
              <p className="text-lg">
                {nftBalance === 0 ? "No NFT found" : `Balance: ${nftBalance}`}
              </p>
              {isLoading ? <LoadingData /> : null}
              {!nftData ? null : (
                <>
                  <p className="text-lg">Name: {nftData.nftName}</p>
                  <p className="text-lg">Mints: {nftData.nftMintsPerAddress}</p>
                  <p className="text-lg">
                    Owner: {nftData.nftOwner.slice(0, 12)}...
                  </p>
                  <p className="text-lg">
                    Total supply: {nftData.nftTotalSupply}
                  </p>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EthereumNFTBalance;
