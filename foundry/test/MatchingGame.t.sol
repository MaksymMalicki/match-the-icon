// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "../src/MatchingGame.sol";

contract MatchingGameTest is Test {
    MatchingGame public game;

    function setUp() public {
        /**
         * @notice Calculate hash of the right answer to prevent players
         * from knowing it during the gameplay
         * @dev Salt is added to prevent retrieveing the answer from
         * the known list of hashes
         *
         * In the game contract answerChain will be provided as an argument
         * to the parameter, so it won't be visible to anyone
         *
         * At the end of the game hash of the right answer
         * will be compared with the hash of the player's answers
         * to tell if he actually finished the game
         */
        string memory answerChain = "123456789";
        bytes32 salt = bytes32("182731238");
        bytes32 hashedAnswerChain = keccak256(
            abi.encodePacked(salt, answerChain)
        );
        /// @dev create game instance
        game = new MatchingGame(hashedAnswerChain);
    }

    /**
     * @dev Wrong answer is submitted
     * test fails if game instance accept the wrong answer
     * test succeds if game instance revert
     **/
    function testGameFail() public {
        try game.submitAnswer("135856772") {
            assertTrue(false);
        } catch {
            assertTrue(true);
        }
    }
}
