import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class Web3AuthService {

  public web3Props = { provider: null, signer: null, account: null, chainId: null}

  public connectToMetamask(): void {
    let provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');

    const connection = async (): Promise<void> => {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      const chainId = await signer.getChainId();
      this.web3Props = {provider, signer, account, chainId}
    }
    connection();
  }
}
