import { useMemo } from "react";
import { ethers } from "ethers";
import { useProvider } from "./useProvider";

const useContract = ({ address, abi }: { address: string; abi: any }) => {
  const { provider } = useProvider();

  const contract = useMemo(() => {
    if (!address || !abi || !provider) {
      return null;
    }
    try {
      return new ethers.Contract(address, abi, provider);
    } catch (error) {
      return null;
    }
  }, [abi, address, provider]);

  const error = !contract ? "Failed to connect to the contract" : null;

  return { contract, error };
};

export default useContract;
