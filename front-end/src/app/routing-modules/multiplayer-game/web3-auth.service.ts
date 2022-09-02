import {Injectable} from '@angular/core';
import {ethers} from 'ethers';
import {web3props} from "../../shared-interfaces/web3props.interface";

@Injectable({
  providedIn: 'root'
})
export class Web3AuthService {

  public web3Props: web3props = {provider: null, signer: null, account: null, chainId: null}

  public connectToMetamask(): void {
    if ((!window as any).ethereum) {
      return;
    }
    let provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');

    const connection = async (): Promise<web3props> => {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      const chainId = await signer.getChainId();
      return {provider, signer, account, chainId};
    }
    connection().then(
      r => this.web3Props = r,
    );
  }
}
