import React from "react";

interface IPFSImageProps {
  cid: string;
}

const IPFSImage = ({ cid }: IPFSImageProps) => {
  const cidWithoutPrefix = cid.replace("ipfs://", "");
  const ipfsGatewayHost = "https://ipfs.io/ipfs/";

  return (
    <div
      className={
        "w-[140px] h-[140px] bg-contain border-4 border-light-purple my-6"
      }
      style={{
        backgroundImage: `url('${ipfsGatewayHost}${cidWithoutPrefix}')`,
      }}
    ></div>
  );
};

export default IPFSImage;
