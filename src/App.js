import React, { useState, useEffect } from "react";
import Web3 from "web3";
import MyContract from "./contracts/Donut.json";
import Image from 'react-bootstrap/Image'
import './App.css'
import { Button } from "react-bootstrap";
function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  useEffect(() => {
    async function setupWeb3() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          setWeb3(web3);
        } catch (error) {
          console.error(error);
        }
      }
      // Legacy dapp browsers, should remove in future
      else if (window.web3) {
        setWeb3(new Web3(window.web3.currentProvider));
      }
      // Non-dapp browsers
      else {
        alert("You have to install MetaMask !");
      }
    }
    setupWeb3();
  }, []);

  useEffect(() => {
    async function loadAccounts() {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        if (accounts.length > 0) {
          const balance = await web3.eth.getBalance(accounts[0]);
          const contractBal = await web3.eth.getBalance("0x95C11A0cf7867dc068745079880A1764Cfb6C18C");
          setContractBalance(web3.utils.fromWei(contractBal, "ether"));
          setBalance(web3.utils.fromWei(balance, "ether"));
        }
      }
    }
    loadAccounts();
  }, [web3]);

  useEffect(() => {
    async function loadContract() {
      if (web3) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MyContract.networks[networkId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(
            MyContract.abi,
            deployedNetwork.address
          );
          setContract(instance);
        } else {
          alert("MyContract not deployed to detected network.");
        }
      }
    }
    loadContract();
  }, [web3]);

  async function handleBuy() {
    if (contract) {
      const price = await contract.methods.price().call();
      const weiValue = price;
      await contract.methods.buy().send({
        from: accounts[0],
        value: weiValue
      });
      const balance = await contract.methods.balances(accounts[0]).call();
      console.log(`New balance: ${balance}`);
      window.location.reload();
    }
  }
  async function handleBuy2() {
    if (contract) {
      const price = await contract.methods.price2().call();
      const weiValue = price;
      await contract.methods.buy2().send({
        from: accounts[0],
        value: weiValue
      });
      const balance = await contract.methods.balances(accounts[0]).call();
      console.log(`New balance: ${balance}`);
      window.location.reload();
    }
  }

  return (

    
      <section className="bg-white" style={{ height: "100vh" }}>
      <div className="container p-5 text-center">
      <div className="container py-5 border rounded-5" style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}}>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 text-center" >
          <h5 className="text">My Balance: {balance} ETH</h5>
              <div className="container p-2 text-center">
    
                  <Image src=
"https://content2.kawasaki.com/ContentStorage/KMC/Products/8798/8c85b065-f4e9-4ee6-966f-2b7993daff08.png?w=767"
height="300" rounded/>
                  
            
                
                <h5>Rent a Motorcycle - 1 ETH</h5>
                <Button onClick={handleBuy}>Rent</Button>
                </div>
                <div className="container p-2 text-center">
    
                  <Image src=
"https://content2.kawasaki.com/ContentStorage/KMC/Products/8798/8c85b065-f4e9-4ee6-966f-2b7993daff08.png?w=767"
height="300" rounded/>
                  
            
                
                <h5>Rent a Motorcycle - 5 ETH</h5>
                <Button onClick={handleBuy2}>Rent</Button>
                </div>
              </div>
         
          </div>
        </div>
        <div className="p-5 text-center">
        <div className="container py-5 border rounded-5" style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}}>
       <h5> Contract Balance : {contractBalance} ETH</h5>
        </div>
        </div>
        </div>
    </section>
  );
}

export default App;
