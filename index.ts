/*

*/

import { ethers } from 'ethers';

var key: string | undefined = undefined;

export function sendTransaction(
  contract: { address: string; abi: any[] },
  name: string,
  params: any[],
  callback: (transaction?: ethers.Transaction) => any
) {
  let eventCallback = (event: MessageEvent<any>) => {
    let transaction = event.data.transaction as ethers.Transaction;
    let storeKey = event.data.key;

    if (key !== storeKey) {
      return;
    } else if (transaction) {
      callback(transaction);
      window.removeEventListener('message', eventCallback);
      return;
    }
  };

  window.addEventListener('message', eventCallback);

  let data = {
    contract,
    name,
    params,
    key
  };

  window.postMessage(JSON.stringify(data), '*');
}


export function initApp(sessionKey: string) {
  key = sessionKey;
}

module.exports = { initApp, sendTransaction };
