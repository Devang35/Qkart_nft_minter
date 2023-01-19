// import dotenv from "dotenv";
// dotenv.config();
// import "regenerator-runtime/runtime";
// import axios from "axios";
import { mintNFT } from "./smart-contract-interaction.js";

const fileInput = document.getElementById("file-input");
const pinButton = document.getElementById("pin-button");
const API_KEY = "ae24fa04c22562c2dccb";
const API_SECRET =
  "edf565a6c53873b40ab65a28a3186cda1f09eb4f311215b10c0fcc4a0e57b6d1";

fileInput.addEventListener("change", () => {
  pinButton.disabled = false;
});

pinButton.addEventListener("click", async () => {
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  const response = axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: API_KEY,
        pinata_secret_api_key: API_SECRET,
      },
    }
  );
  // .then((response) => {
  //   console.log(response.data);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  const ipfsHash = response.IpfsHash;

  const options = {
    from: "0x5Ac95bD02C42D3A804aA90AF6Da1f2FD058fF7B0",
    gas: "20000000000",
  };
  await mintNFT(ipfsHash, options);
});
