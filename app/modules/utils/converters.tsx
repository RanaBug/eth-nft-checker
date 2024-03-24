import { BigNumberish, formatEther } from "ethers";
import { NFTData, NFTDataContract } from "../type/type";

export const processBigNumber = (val: BigNumberish): number =>
  Number(val.toString());

export const processEth = (val: BigNumberish | BigInt): number => {
  if (typeof val === "bigint") {
    return +parseFloat(formatEther(val)).toFixed(2);
  }

  return +parseFloat(formatEther(val as BigNumberish)).toFixed(2);
};

export const convertNFTData = (nftData: NFTDataContract): NFTData => {
  const {
    nftImage,
    nftMintsPerAddress,
    nftOwner,
    nftName,
    nftTotalSupply,
  } = nftData;

  return {
    nftImage,
    nftMintsPerAddress: processBigNumber(nftMintsPerAddress),
    nftOwner,
    nftName,
    nftTotalSupply: processBigNumber(nftTotalSupply),
  };
};
