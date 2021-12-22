const {
  nftsOwnedByAddressUsingLogs,
  mintNft,
  transferNft,
} = require("./utils");

// mintNft("0xdbed5153ea6f2704686c32d107229972cb9d9e1a", {
//   from: "0x447c2b66E4ED8c1BB45c666DeBAc685E40760984",
// });

// transferNft(
//   "0x447c2b66E4ED8c1BB45c666DeBAc685E40760984",
//   "0xf32573904fD48f26ef5d500b5a6323b38a4899ad",
//   6,
//   "0xdbed5153ea6f2704686c32d107229972cb9d9e1a",
//   { from: "0x447c2b66E4ED8c1BB45c666DeBAc685E40760984" }
// );

nftsOwnedByAddressUsingLogs(
  "0x447c2b66E4ED8c1BB45c666DeBAc685E40760984",
  "0xdbed5153ea6f2704686c32d107229972cb9d9e1a"
);
