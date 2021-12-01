import React, {useCallback, useEffect, useState} from "react";
import "./main.css";
import {ethers} from "ethers";
import wavePortalAbi from "../../utils/WavePortal.json";
import Infobar from "../infobar/Infobar";

export default function Main({currentAccount}) {   
    const contractAddress = "0x0B7c6E03554209f99aed7A0f3D6c95F4367B0b71";
    const [allWaves, setAllWaves] = useState([]);
    const [allHighFives, setAllHighFives] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    let wavePortalContract = {};

    const {ethereum} = window;

    if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        wavePortalContract = new ethers.Contract(contractAddress, wavePortalAbi.abi, signer);
    } else {
        console.log("We do not have the ethereum object");
    }

    const getAllWaves = useCallback(async () => {
        try {
            if (currentAccount) {
                const waves = await wavePortalContract.getAllWaves();
                
                let wavesCleaned = waves.map(wave => {
                    let options = { 
                        weekday: "short", year: "numeric", month: "short", day: "numeric", 
                        hour: "2-digit", minute: "2-digit", second: "2-digit"
                    };
                    return {
                        address: wave.waver,
                        timestamp: new Date(wave.timestamp * 1000).toLocaleString("en-US", options),
                        message: wave.message
                    };
                });
                setAllWaves(wavesCleaned);
            } else {
                console.log("Connect your MetaMask wallet to interact with this dapp.")
            }
        } catch(error) {
            console.log(error);
        }
    }, []);

    const getAllHighFives = useCallback(async () => {
        try {
            if (currentAccount) {
                const highFives = await wavePortalContract.getAllHighFives();
                setAllHighFives(highFives);      
            } else {
                console.log("Connect your MetaMask wallet to interact with this dapp.")
            }
        } catch(error) {
            console.log(error);
        }
    }, []);

    const wave = async () => {
        try {
            let count = await wavePortalContract.getTotalWaves();
            console.log("Retrieved total wave count...", count.toNumber());

            const waveTxn = await wavePortalContract.wave(inputMessage, {gasLimit: 300000});
            console.log("Mining...", waveTxn.hash);

            await waveTxn.wait();
            console.log("Mined -- ", waveTxn.hash);

            count = await wavePortalContract.getTotalWaves();
            console.log("Retrieved total wave count...", count.toNumber());
            setInputMessage("");
        } catch(error) {
            console.log(error);
        }
    };

    const highFive = async () => {
        try {
            let count = await wavePortalContract.getTotalHighFives();
            console.log("Retrieved total high five count...", count.toNumber());

            const highFiveTxn = await wavePortalContract.highFive();
            console.log("Mining...", highFiveTxn.hash);

            await highFiveTxn.wait();
            console.log("Mined -- ", highFiveTxn.hash);

            count = await wavePortalContract.getTotalHighFives();
            console.log("Retrieved total high five count...", count.toNumber());
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        try {
            const onNewWave = (from, timestamp, message) => {
                let options = { 
                    weekday: "short", year: "numeric", month: "short", day: "numeric", 
                    hour: "2-digit", minute: "2-digit", second: "2-digit"
                };

                console.log("NewWave", from, timestamp, message);

                setAllWaves(prevState => [
                ...prevState,
                {
                    address: from,
                    timestamp: new Date(timestamp * 1000).toLocaleString("en-US", options),
                    message: message,
                }
                ]);
            };
            
            const onNewHighFive = (from, timestamp) => {
                console.log("NewHighFive", from, timestamp);
                setAllHighFives(prevState => [
                    ...prevState,
                    {
                        address: from,
                        timestamp: new Data(timestamp * 100).toLocaleString("en-US")
                    }
                ]);
            };

            wavePortalContract.on("NewWave", onNewWave);
            wavePortalContract.on("NewHighFive", onNewHighFive);

            console.log("NewWave/HighFive componentDidUpdate");

            return () => {
                if (wavePortalContract) {
                    wavePortalContract.off("NewWave", onNewWave);
                    wavePortalContract.off("NewHighFive", onNewHighFive)
                }
                console.log("NewWave || HighFive componentDidUnmount");
            };
        } catch(error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getAllWaves();
        getAllHighFives();
        console.log("getAllWaves || getAllHighFives componentDidUpdate");
        return () => {
            console.log("getAllWaves || getAllHighFives componentDidUnmount");
        }
    }, [getAllWaves, getAllHighFives]);

    
    return (
        <div className="main">
           <Infobar/>
            {!currentAccount && (
                <div className="disconnected">
                    <>
                        <div className="blur1"></div>
                        <div className="blur2"></div>
                        <div className="content">
                            <h1>Hi, I'm
                                <a href="https://chiarawilden.com" style={{textDecoration: "none", transition: "0.8s ease"}} target="_blank" alt="Personal Website">
                                &nbsp;Chiara Wilden
                                </a>
                            </h1>
                            <h2>
                                Welcome to my decentralized message board. Connect your wallet to 
                                drop a high five, or leave me a message on Rinkeby if you're feeling 
                                fancy ✨ Remember, blockchain is forever!
                            </h2>
                        </div>       
                        <div className="buildspace-desc">
                            <p>
                                This app was created with the help of Buildspace. Buildspace is a 
                                platform for learning Web3 development by building projects with a 
                                community. For more information, <a href="https://buildspace.so/">
                                visit the Buildspace website</a>, or connect with Buildspace on 
                                social media.
                            </p>
                        </div>  
                    </>
                </div>
            )}
            {currentAccount && ( 
                <>
                    <div className="blur3"></div>
                    <div className="banner">
                        <p>Submit a message for a chance to win 0.0001 testnet ETH!</p>
                    </div>
                    <div className="connected">
                        {/* MESSAGE FORM */}
                        <div className="message-form">
                            <input type="text" placeholder="Say hello!" value={inputMessage}
                            onChange={event => setInputMessage(event.target.value)}/>
                            <button className="wave-button" onClick={wave}>Wave</button>
                        </div>
                        {/* WAVE + HIGH FIVE STATS */}
                        <div className="stats">
                            <div>
                                <span style={{paddingRight: "22px"}}>WAVES: {allWaves.length}</span>
                                <span>HIGH FIVES: {allHighFives.length}</span>
                            </div>
                            {/* HIGH FIVE BUTTON */}
                            <div>
                                <div className="high-five" onClick={highFive}>
                                <span style={{marginRight: "11px"}}>Not feeling chatty? How 'bout a high five?</span>
                                <button className="high-five-button">✋🏽</button>
                            </div>
                        </div>
                        </div>
                        {/* MESSAGES */}
                        {allWaves.map((wave, index) => {
                            return (
                                <div key={index} className="message">
                                    <div className="sender">
                                        <span><strong>FROM:</strong> {wave.address}</span>
                                        <span><strong>DATE:</strong> {wave.timestamp.toString()}</span>
                                    </div>
                                    <div>{wave.message}</div>
                                </div>
                            )
                        }).reverse()}
                        {/* FOOTER */}
                        <div className="copyright">
                            <div><a href="https://chiarawilden.com">Chiara Wilden</a> 2021</div> 
                            <div>
                               Created With&nbsp;<a href="http://buildspace.so">Buildspace</a>&nbsp;
                                <span style={{fontSize: "0.6rem"}}>♥</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}