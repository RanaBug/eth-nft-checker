import { ethers } from "ethers";

export const useProvider = () => {
  try {
    const provider = new ethers.JsonRpcProvider("https://rpc2.sepolia.org");
    return {
      provider,
      error: null,
    };
  } catch (error) {
    console.error("Error with the provider:", error);
    return {
      provider: null,
      error: "Error with the provider",
    };
  }
};
