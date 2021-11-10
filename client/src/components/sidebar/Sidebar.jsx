import React from "react";
import "./sidebar.css";


export default function Sidebar({currentAccount, connectWallet}) {
    return (
        <div className="sidebar">
            {!currentAccount && (
                <>
                    <div className="banner1">
                        <div className="banner1-text">To Begin Connect</div>
                        <div className="banner1-text">To Begin Connect</div>
                        <div className="banner1-text">To Begin Connect</div>
                        <div className="banner1-text">To Begin Connect</div>
                        <div className="banner1-text">To Begin Connect</div>
                    </div>
                    <button className="connect" onClick={connectWallet}>
                        Connect Wallet
                    </button>
                    <div className="banner2">
                        <div className="banner2-text">Begin to Connect</div>
                        <div className="banner2-text">Begin to Connect</div>
                        <div className="banner2-text">Begin to Connect</div>
                        <div className="banner2-text">Begin to Connect</div>
                        <div className="banner2-text">Begin to Connect</div>
                    </div>
                </>
            )}
            {currentAccount && (
                <>
                    <div className="content">
                        <img src="./images/c.jpg" alt="" className="profile"/>
                        <h2 style={{paddingBottom: "22px"}}>Nice to meet you 👋🏽</h2>
                        <h4>
                            I'm Chiara. I love fancy tea, dance music, flowers, and vegan ice cream. 
                            In college, I studied film. But before that, I made websites. (Shoutout 
                            to freewebs and Paint Shop Pro, the OGs know). Naturally, my favorite 
                            language is CSS. I believe Blockchain will change the world.
                        </h4>
                    </div>
                    <div className="social">
                        <a href="https://linkedin.com/in/chiarawilden"><i className="fab fa-linkedin-in"></i></a>
                        <a href="https://twitter.com/chiarawilden"><i className="fab fa-twitter"></i></a>
                        <a href="https://github.com/chiarawilden/wave-portal"><i className="fab fa-github"></i></a>
                        <a href="mailto:contact@chiarawilden.com"><i className="fas fa-envelope"></i></a>
                        <a href="https://t.me/chiarawilden"><i className="fas fa-paper-plane"></i></a>
                        <a href="https://chiarawilden.com"><i className="fas fa-external-link-alt"></i></a>
                    </div>
                </>
            )}
        </div>
    )
}
