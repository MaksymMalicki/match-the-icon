// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

/**
 * @author Contact us on twitter: @MaksymMalicki, @kamilchmielu
 * @title Match the icon game
 * @notice This game is inspired by the great game of Dobble
 */
contract MatchingGame {
    bytes32 public salt = bytes32("182731238");
    bytes32 public hashedAnswerChain;

    constructor(bytes32 _hashedAnswerChain) {
        hashedAnswerChain = _hashedAnswerChain;
    }
}
