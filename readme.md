# Thred App Developer SDK

Thred is a decentralized App Store Protocol. Using Thred, developers can create installable web3 applications and list them for sale on the Thred App Store. This SDK provides all the functions needed to create web3 applications. 


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the Thred App Developer SDK.

```bash
npm install thred-app-sdk
```

### Import Module

```typescript
import * as thredSDK from "thred-app-sdk"

// import the module 2 different ways

const thredSDK = require("thred-app-sdk")
```

### Initialize the SDK

```typescript
const appKey = "..."

thredSDK.initApp(appKey) //Establish a secure connection to the App Store with the App Key passed in the URL. 
```
### Call Smart Contract function

Instead of natively handling the connection to the user's wallet, use the below method to call the Smart Contract with the existing wallet connected to an App Store Client.

```typescript
const address = '0x.....293' // Address of the contract
const abi = [ [ { "anonymous": false, "inputs": [] } ] .... ] // ABI of the contract

const data = {
     address,
     abi
}

thredSDK.sendTransaction(data, "mySolidityFunction", [param1, param2, param3], (transaction) => {

     //Returns the transaction information in the form of an ethers.js Transaction

})
```



## License
[MIT](https://choosealicense.com/licenses/mit/)