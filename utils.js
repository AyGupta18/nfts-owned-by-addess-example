const axios = require("axios");

const { web3 } = require("./web3JsInstance");
const abi = require("./abi").abi;

const getTokenUri = async (tokenId, contractAddress) => {
  try {
    const contract = new web3.eth.Contract(abi, contractAddress, {
      from: "0x447c2b66E4ED8c1BB45c666DeBAc685E40760984",
    });
    const tokenUri = await contract.methods.tokenURI(tokenId).call();
    console.log(`Token uri for token id ${tokenId}`, tokenUri);
  } catch (err) {
    console.log(err);
  }
};

const nftsOwnedByAddressUsingLogs = async (accountAddress, contractAddress) => {
  try {
    const myContract = new web3.eth.Contract(abi, contractAddress);
    const outgoingNfts = await myContract.getPastEvents("Transfer", {
      filter: { from: [accountAddress] },
      fromBlock: 1,
    });

    const incomingNfts = await myContract.getPastEvents("Transfer", {
      filter: {
        to: [accountAddress],
      },
      fromBlock: 1,
    });

    const allNftsTransactions = [...incomingNfts, ...outgoingNfts];
    allNftsTransactions.sort((a, b) => {
      return a.blockNumber - b.blockNumber;
    });

    const nftsOwned = new Set();

    for (const log of allNftsTransactions) {
      const { from, to, tokenId } = log.returnValues;

      if (to == accountAddress) {
        nftsOwned.add(tokenId.toString());
      } else if (from == accountAddress) {
        nftsOwned.delete(tokenId.toString());
      }
    }
    console.log(nftsOwned);
  } catch (err) {
    console.log(err);
  }
};

const getNftMetadata = async (tokenUri) => {
  try {
    const { data } = await axios.get(tokenUri);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const mintNft = async (contractAddress, sendOptions) => {
  try {
    const myContract = new web3.eth.Contract(abi, contractAddress);
    const result = await myContract.methods.mint().send({ ...sendOptions });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const transferNft = async (from, to, tokenId, contractAddress, sendOptions) => {
  try {
    const myContract = new web3.eth.Contract(abi, contractAddress);
    const result = await myContract.methods
      .transferFrom(from, to, tokenId)
      .send({ ...sendOptions });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getTokenUri,
  nftsOwnedByAddressUsingLogs,
  getNftMetadata,
  mintNft,
  transferNft,
};
