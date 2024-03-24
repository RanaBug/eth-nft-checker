import { BigNumberish } from "ethers";

export type NFTDataContract = {
  nftImage: string;
  nftMintsPerAddress: BigNumberish;
  nftOwner: string;
  nftName: string;
  nftTotalSupply: BigNumberish;
};

export type NFTData = {
  nftImage: string;
  nftMintsPerAddress: number;
  nftOwner: string;
  nftName: string;
  nftTotalSupply: number;
};
