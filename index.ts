/*

*/

import { ethers } from 'ethers';

var domain: string | undefined = undefined;

export function sendTransaction(
  contract: { address: string; abi: any[] },
  name: string,
  params: any[],
  callback: (transaction?: ethers.Transaction) => any
) {
  let eventCallback = (event: MessageEvent<any>) => {
    let transaction = event.data.transaction as ethers.Transaction;
    let origin = event.origin;

    if (!checkDomain(origin, domain)) {
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
  };

  window.postMessage(JSON.stringify(data), '*');
}

function checkDomain(origin: string = '', domain: string = '') {
  let origins = [origin, origin.replace('https://', 'https://www.')];

  let domains = [domain, domain.replace('https://', 'https://www.')];

  if (origins.find((o) => domains.find((d) => o == d))) {
    return true;
  }
  return false;
}

export function initApp(appStoreDomain: string) {
  domain = appStoreDomain;
}

module.exports = { initApp, sendTransaction };
