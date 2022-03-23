import abi from "./abi/abi.json" assert {type: "json"};


//address contract 0xD82547E7E826Fe6CEf024A45dc476f07ae8b302D

const blockchain = new Promise((res, rej) => {
    
    //if metamask is not available
    if(typeof window.ethereum == "undefined"){
        rej("You should install Metamask to use it!");
            }

            //web3 instance
     let web3 = new Web3(window.ethereum);
     let contract = new web3.eth.Contract(abi, "0xD82547E7E826Fe6CEf024A45dc476f07ae8b302D");

     //Get my Metamask address
     web3.eth.getAccounts().then((accounts) =>{
         console.log("-> My account is: ", accounts[0]);
     });

     //Get the current supply of NFT Token
     web3.eth.getAccounts().then((accounts) =>{
         contract.methods.totalSupply().call({from: accounts[0]}).then((supply) =>{
         console.log("Current supply of NFT Tokens is: ", supply);

             });
             });

         //Get the maximum supply of NFT Token
     web3.eth.getAccounts().then((accounts) =>{
        contract.methods.maxSupply().call({from: accounts[0]}).then((maxsupply) =>{
        console.log("Maximum supply of NFT Tokens is: ", maxsupply);

        });
       
     });

    //Get your buildings made in the Metaverse
    web3.eth.getAccounts().then((accounts) =>{
        contract.methods.getOwnerBuildings().call({from: accounts[0]}).then((buildings) =>{
        console.log("->Your buildings: ", buildings);

        });
       
     });

     //Get all the buildings made in the Metaverse

     web3.eth.getAccounts().then((accounts) =>{
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) =>{
         contract.methods.getBuildings().call({from: accounts[0]}).then((data) =>{
             res({supply: supply, building: data });

        });
       
     });
    });

});

export default blockchain;

