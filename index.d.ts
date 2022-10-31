import { ethers } from "ethers";
export declare function sendTransaction(name: string, params: any[], callback: (transaction?: ethers.Transaction) => any): void;
export declare function initApp(appStoreDomain: string): void;
