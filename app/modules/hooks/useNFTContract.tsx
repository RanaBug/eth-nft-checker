import { useState } from "react";
import useContract from "./useContract";
import nftAbi from "../../abi/nftAbi.json";

export const useNFTContract = () => {
  const { contract, error: contractError } = useContract({
    address: "0x2A9bb3fB4FBF8e536b9a6cBEbA33C4CD18369EaF" || "",
    abi: nftAbi,
  });

  const [error, setError] = useState<string>("");

  const getBalanceOf = async ({ address }: { address: string }) => {
    try {
      if (!contract) return contractError;
      const tx = await contract.balanceOf(address);
      return tx;
    } catch (error) {
      setError("getBalanceof error");
      return null;
    }
  };

  const getImage = async () => {
    try {
      if (!contract) return contractError;
      const tx = await contract.image();
      return tx;
    } catch (error) {
      setError("getImage error");
      return null;
    }
  };

  const getMintsPerAddress = async ({ address }: { address: string }) => {
    try {
      if (!contract) return contractError;
      const tx = await contract.mintsPerAddress(address);
      return tx;
    } catch (error) {
      setError("getMintsPerAddress error");
      return null;
    }
  };

  const getName = async () => {
    try {
      if (!contract) return contractError;
      const tx = await contract.name();
      return tx;
    } catch (error) {
      setError("getName error");
      return null;
    }
  };

  const getOwner = async () => {
    try {
      if (!contract) return contractError;
      const tx = await contract.owner();
      return tx;
    } catch (error) {
      setError("getOwner error");
      return null;
    }
  };

  const getTotalSupply = async () => {
    try {
      if (!contract) return contractError;
      const tx = await contract.totalSupply();
      return tx;
    } catch (error) {
      setError("getTotalSupply error");
      return null;
    }
  };

  return {
    contract,
    error: contractError || error,
    getBalanceOf,
    getImage,
    getMintsPerAddress,
    getOwner,
    getName,
    getTotalSupply,
  };
};
