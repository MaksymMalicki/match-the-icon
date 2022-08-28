// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "forge-std/Vm.sol";
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
        try game.submitAnswer("135856772", 5_000) {
            assertTrue(false);
        } catch {
            assertTrue(true);
        }
    }

    function testSubmitGoodAnswer() public {
        try game.submitAnswer("123456789", 5_000) {
            assertTrue(true);
        } catch {
            assertTrue(false);
        }
    }

    function testUpdateGameScoreAfterSubmitting() public {
        game.submitAnswer("123456789", 5_000);
        assertEq(game.gameScores(address(this)), 5_000);
    }

    function testStartingStakingBalance() public {
        assertEq(game.stakings(address(this)), 0);
    }

    function testUpdatingStakingBalanceAfterSendingEther() public {
        vm.deal(address(this), 1 ether);
        address(game).call{value: 0.05 ether}("");
        assertEq(game.stakings(address(this)), 0.05 ether);
    }

    function testUpdatingStakingBalanceAfterCallingStake() public {
        vm.deal(address(this), 1 ether);
        game.stake(0.5 ether);
        assertEq(game.stakings(address(this)), 0.5 ether);
    }

    function testTriggeringFallback() public {
        vm.deal(address(this), 1 ether);
        address(game).call{value: 0.5 ether}(
            abi.encodeWithSignature("nonExistingFunction()")
        );
        emit log_uint(game.stakings(address(this)));
        assertEq(game.stakings(address(this)), 0.5 ether);
    }

    fallback() external payable {}

    receive() external payable {}
}
