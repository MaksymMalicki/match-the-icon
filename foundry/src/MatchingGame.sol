// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.13;

/**
 * @author Contact us on twitter: @MaksymMalicki, @kamilchmielu
 * @title Match the icon game
 * @notice This game is inspired by the great game of Dobble
 */
contract MatchingGame {
    bytes32 public salt = bytes32("182731238");
    bytes32 public hashedGameSolution;
    mapping(address => uint16) public gameScores;
    mapping(address => uint256) public stakings;

    event Staked(address stakingPlayer, uint256 amountOfEtherStaked);
    event RoomCreated(address gameInstanceAddress, uint8 playerNumber);

    constructor(bytes32 _hashedGameSolution) {
        hashedGameSolution = _hashedGameSolution;
    }

    /**
     * @notice This function is used to submit and compare the user's answer
     * with the correct solution
     * @dev Function first needs to convert answer string to the Keccak256 hash
     *
     * Two hashes are later compared together and:
     * if they match -> user provided right answer
     * if they don't match -> user provided wrong answer
     */
    function submitAnswer(string calldata answer, uint16 scoredPoints) public {
        require(
            keccak256(abi.encodePacked(salt, answer)) == hashedGameSolution
        );
        gameScores[msg.sender] = scoredPoints;
    }

    function stake(uint256 amountOfEther) public payable {
        stakings[msg.sender] += amountOfEther;
        emit Staked(msg.sender, amountOfEther);
    }

    fallback() external payable {
        stakings[msg.sender] += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    receive() external payable {
        stakings[msg.sender] += msg.value;
        emit Staked(msg.sender, msg.value);
    }
}
