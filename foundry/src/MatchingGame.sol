// SPDX-License-Identifier: MIT
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

    fallback() external payable {}

    receive() external payable {}
}
