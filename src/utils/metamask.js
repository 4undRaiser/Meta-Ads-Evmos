import { addressConverter, provider, transactions } from "evmosjs";



export async function signAndBroadcastWithMetamask(
  ) {

    var sender = transactions.sender;
    var tx = transactions.TxGenerated;
    // EIP712
    const signature = await window.ethereum.request({
      method: "eth_signTypedData_v4",
      params: [
        addressConverter.evmosToEth(sender.accountAddress),
        JSON.stringify(tx.eipToSign),
      ],
    });
  
    const extension = transactions.signatureToWeb3Extension(
      TESTNET_CHAIN,
      sender,
      signature
    );
  
    const txToBroadcast = transactions.createTxRawEIP712(
      tx.legacyAmino.body,
      tx.legacyAmino.authInfo,
      extension
    );
  
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: provider.generatePostBodyBroadcast(txToBroadcast),
    };
  
    let broadcastPost = await fetch(
      `${ENDPOINT_URL}${provider.generateEndpointBroadcast()}`,
      postOptions
    );
  
    return await broadcastPost.json();
  }