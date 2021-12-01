import React, {useEffect, useState} from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";

export default function App() {
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
        try {
            const {ethereum} = window;
    
            if (!ethereum) {
                console.log("Make sure you have MetaMask!");
                return;
            } else {
                console.log("We have the Ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });
            
            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account: ", account);
                setCurrentAccount(account);
            } else {
                console.log("No authorized account found");
            }
        } catch(error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]); 
        } catch (error) {
            alert("You must have MetaMask installed to use this dapp!")
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        console.log("checkIfWalletIsConnected componentDidUpdate");
        return () => {
            console.log("checkIfWalletIsConnected componentDidUnmount");
        }
    }, [currentAccount]);

    return (
        <div className="app">
            <Sidebar currentAccount={currentAccount} connectWallet={connectWallet}/>
            <Main currentAccount={currentAccount}/>
        </div>
    )
};