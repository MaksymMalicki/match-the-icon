// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "forge-std/Vm.sol";
import "../src/MatchingGame.sol";

contract MatchingGameTest is Test {
    MatchingGame public game;

    function setUp() public {
        /**
         * @notice Points scored by the user will be passed as an argument
         * to Submit Answer function, after the game is finished
         */
        uint16 memory pointsScored = 10_000;
        /**
         * @notice Calculate hash of the right answer to prevent players
         * from knowing it during the gameplay
         * @dev Salt is added to prevent retrieveing the answer from
         * the known list of hashes
         *
         * In the game contract game solution will be provided as an argument
         * to the parameter and then hashed, so it won't be visible to anyone
         *
         * At the end of the game hash of the right answer (gameSolution)
         * will be compared with the hash of the player's answers
         * to tell if he actually finished the game
         */
        string memory gameSolution = "123456789";
        bytes32 salt = bytes32("182731238");
        bytes32 hashedGameSolution = keccak256(
            abi.encodePacked(salt, gameSolution)
        );
        /// @dev create game instance
        game = new MatchingGame(hashedGameSolution);
    }

    /**
     * @dev Wrong answer is submitted:
     * - test fails if the game instance accept the wrong answer
     * - test succeeds if the game instance revert
     */
    function testSubmitWrongAnswer() public {
        try game.submitAnswer("135856772") {
            assertTrue(false);
        } catch {
            assertTrue(true);
        }
    }

    function testSubmitGoodAnswer() public {
        try game.submitAnswer("123456789") {
            assertTrue(true);
        } catch {
            assertTrue(false);
        }
    }

    fallback() external payable {}

    receive() external payable {}
}
