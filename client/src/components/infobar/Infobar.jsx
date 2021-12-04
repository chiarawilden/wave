import React, {useEffect, useRef, useState} from "react";
import "./infobar.css";

export default function Infobar({currentAccount}) {
    const [isOpen, setIsOpen] = useState(false);
    let menuRef = useRef();

	const openMenu = () => {
        setIsOpen(!isOpen);
	}
    
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if(!menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        })
    })

    // Prevents scroll when menu is active
    useEffect(() => {
        if(isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    })

    return (
        <>
            {!currentAccount && (
                <div className="toggle" onClick={openMenu}></div> 
            )}
            <div className={isOpen ? "menu open" : "menu"} ref={menuRef}>
                <div className="info">
                    <h1>My wallet?&nbsp;<em>Huh?</em></h1>
                    <h2>
                        This is an Ethereum blockchain based web app, or <span style={{backgroundColor: "rgba(191, 230, 255, 0.3)"}}>dapp (decentralized app)</span>. 
                        To interact with this dapp, first connect to the <a href="https://ethereum.org/en/what-is-ethereum/" target="_blank" alt="What is Ethereum?">Ethereum blockchain</a>, 
                        via a <span style={{backgroundColor: "rgba(191, 230, 255, 0.3)"}}>Web3 provider</span>, like <a href="https://metamask.io/" target="_blank" alt="MetaMask">MetaMask!</a> 
                        &nbsp;Applications such as MetaMask are commonly referred to as <span style={{backgroundColor: "rgba(191, 230, 255, 0.3)"}}>wallets</span>, because they allow you
                        to obtain and manage cryptocurrencies.
                    </h2>
                    <h2>
                        Make sure to grab some <span style={{backgroundColor: "rgba(191, 230, 255, 0.3)"}}>test ether</span>, or ETH, for the Rinkeby Testnet, before you begin. 
                        Test ETH is how you will "pay" to interact with this dapp. (Don't worry, it's free in terms of fiat.)&nbsp;<a href="https://faucets.chain.link/rinkeby" 
                        target="_blank" alt="Chainlink Rinkeby Faucet">Chainlink</a>&nbsp; provides <span style={{backgroundColor: "rgba(191, 230, 255, 0.3)"}}>faucets</span>&nbsp; 
                        for many different testnets, where you can obtain fake ETH to experiment with. (FYI The Ethereum Mainnet is where you would transact with <em>real</em> ETH.)
                    </h2>
                    <h2>
                        Follow Buildspace on <a href="https://twitter.com/_buildspace" target="_blank" alt="Buildspace Twitter">Twitter</a> or join the Buildspace 
                        &nbsp;<a href="https://discord.gg/vPmqZqgpsS" target="_blank" alt="Buildspace Discord">Discord</a> to build your own message board.
                    </h2>
                </div>
                <div className="close" onClick={openMenu}>✕</div>
            </div>
        </>  
    )
}
