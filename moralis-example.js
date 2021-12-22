require("dotenv").config();
const Moralis = require("moralis/node");

const { getTokenUri, getNftMetadata } = require("./utils");

const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;

Moralis.start({ serverUrl, appId });

const getNFTsForContract = async (walletAddress, contractAddress) => {
  const options = {
    chain: "rinkeby",
    address: walletAddress,
    token_address: contractAddress,
  };
  const { result: rinkebyNFTs } =
    await Moralis.Web3API.account.getNFTsForContract(options);

  console.log(
    `NFTs owned by wallet address ${walletAddress} corresponding contract address ${contractAddress} \n`,
    rinkebyNFTs,
    "\n"
  );

  for (let nft of rinkebyNFTs) {
    getTokenUri(nft.token_id, contractAddress);
    const metadata = await getNftMetadata(nft.token_uri);
    console.log(
      `MetaData for tokenId ${nft.token_id} corresponding contract address ${contractAddress} \n`,
      metadata,
      "\n"
    );
  }
};

//examples
getNFTsForContract(
  "0x6257bb73F4f0085f6394b4ab6Da5658862C2BE50",
  "0xF2d8EF612A34301B522e0800297D737f9cc84BE1"
);

getNFTsForContract(
  "0x6257bb73F4f0085f6394b4ab6Da5658862C2BE50",
  "0xF78431C27EbC2A00f9dB9697fE02d89c295bC85f"
);
