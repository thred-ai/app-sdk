/*

*/

import { ethers } from 'ethers';

var key: string | undefined = undefined;

export interface Tx {
  type: string;
  data?: ethers.Transaction | any;
}

export function sendTransaction(
  contract: { address: string; abi: any[] },
  name: string,
  params: any[],
  value: number,
  waitMode: string = 'none',
  callback: (tx: Tx) => any
) {
  let eventCallback = (event: MessageEvent<any>) => {
    let transaction = event.data.transaction as ethers.Transaction;
    let sessionKey = event.data.key;

    if (key !== sessionKey && sessionKey !== undefined) {
      return;
    } else if (transaction) {
      callback({ type: 'transact', data: transaction });
      window.removeEventListener('message', eventCallback);
      return;
    }
  };

  window.addEventListener('message', eventCallback);

  let data = {
    contract,
    name,
    params,
    value,
    key,
    waitMode,
    type: 'transact',
  };

  window.postMessage(data, '*');
}

export function requestFunction(
  contract: { address: string; abi: any[] },
  name: string,
  params: any[],
  callback: (tx: Tx) => any
) {
  let eventCallback = (event: MessageEvent<any>) => {
    let data = event.data.viewData as any;
    let sessionKey = event.data.key;

    if (key !== sessionKey && sessionKey !== undefined) {
      return;
    } else if (data) {
      callback({ type: 'view', data: data });
      window.removeEventListener('message', eventCallback);
      return;
    }
  };

  window.addEventListener('message', eventCallback);

  let data = {
    contract,
    name,
    params,
    key,
    type: 'view',
  };

  window.postMessage(data, '*');
}

export function initApp(sessionKey: string) {
  key = sessionKey;
}

module.exports = { initApp, sendTransaction, requestFunction };
