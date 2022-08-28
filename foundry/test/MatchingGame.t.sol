// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "forge-std/Vm.sol";
import "../src/MatchingGame.sol";

contract MatchingGameTest is Test {
    MatchingGame public game;
    event Staked(address stakingPlayer, uint256 amountOfEtherStaked);
    event RoomCreated(address gameInstanceAddress, uint8 playerNumber);

    function setUp() public {
        uint8 playerNumber = 2;
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
        game = new MatchingGame(hashedGameSolution, playerNumber);

        vm.deal(address(this), 1 ether);
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
        address(game).call{value: 0.05 ether}("");
        assertEq(game.stakings(address(this)), 0.05 ether);
    }

    function testUpdatingStakingBalanceAfterCallingStake() public {
        game.stake(0.5 ether);
        assertEq(game.stakings(address(this)), 0.5 ether);
    }

    function testTriggeringFallback() public {
        address(game).call{value: 0.5 ether}(
            abi.encodeWithSignature("nonExistingFunction()")
        );
        assertEq(game.stakings(address(this)), 0.5 ether);
    }

    function testEmitEventStaked() public {
        vm.expectEmit(false, false, false, true);
        emit Staked(address(this), 0.5 ether);
        game.stake(0.5 ether);
    }

    function testTemporaryWithdraw() public {
        uint256 startBalance = address(this).balance;
        game.stake(0.1 ether);
        game.withdraw();
        assertEq(address(this).balance, startBalance);
    }

    fallback() external payable {}

    receive() external payable {}
}
