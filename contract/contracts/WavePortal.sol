// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 totalHighFives;
    uint256 totalWavesAndHighFives;
    uint256 private seed;

    // WAVES
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // Address of user who waved
        string message; // Message user sent
        uint256 timestamp; // Timestamp when user waved
    }

    Wave[] waves;

    // Associates address with number – stores address with last time this user waved
    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("Contract constructed!");

        // Sets initial seed
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        // Ensures current timestamp is min 15 minutes later than last stored for user
        require(
            lastWavedAt[msg.sender] + 22 minutes < block.timestamp,
            "Wait 22 min"
        );

        // Updates current timestamp for user
        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved!", msg.sender);

        // Stores wave data in array
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // Generates new seed for next user 
        seed = (block.difficulty + block.timestamp + seed) % 100;

        if (seed <= 1) {
            console.log("%s won!", msg.sender);

            // Sends prize
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }


    // HIGH FIVES
    event NewHighFive(address indexed from, uint256 timestamp);

    struct HighFive {
        address highFiver; // Address of user who waved
        uint256 timestamp; // Timestamp when user waved
    }

    HighFive[] highFives;

    function highFive() public {
        totalHighFives += 1;
        console.log("%s has high fived!", msg.sender);

        highFives.push(HighFive(msg.sender, block.timestamp));

        emit NewHighFive(msg.sender, block.timestamp);
    }

    function getAllHighFives() public view returns (HighFive[] memory) {
        return highFives;
    }

    function getTotalHighFives() public view returns (uint256) {
        console.log("We have %d total high fives!", totalHighFives);
        return totalHighFives;
    }


    // TOTAL WAVES + HIGH FIVES
    function getTotalWavesAndHighFives() public returns (uint256) {
        totalWavesAndHighFives = totalWaves + totalHighFives;
        console.log("We have %d total waves and high fives!", totalWavesAndHighFives);
        return totalWavesAndHighFives;
    }
}