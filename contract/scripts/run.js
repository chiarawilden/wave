const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log("Contract address: ", waveContract.address);

    // Get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    // Send wave
    const waveTxn = await waveContract.wave("Howdy!");
    await waveTxn.wait();

    // Send high five
    let highFiveTxn = await waveContract.highFive();
    await highFiveTxn.wait();

    // Get updated contract balance
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    let allHighFives = await waveContract.getAllHighFives();
    console.log(allHighFives);

    // Add Waves and High Fives
    await waveTxn.wait();
    await highFiveTxn.wait();
    let waveAndHighFiveCount = await waveContract.getTotalWavesAndHighFives();
};
  
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();