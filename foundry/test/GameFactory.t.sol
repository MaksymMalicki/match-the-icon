// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "forge-std/Vm.sol";
import "../src/GameFactory.sol";

contract GameFactoryTest is Test {
    GameFactory public factory;

    function setUp() public {
        factory = new GameFactory();
    }

    function testCreateGame() public {
        uint8 playerNumber = 2;
        string memory gameSolution = "123456789";
        bytes32 salt = bytes32("182731238");
        bytes32 hashedGameSolution = keccak256(abi.encodePacked(salt, gameSolution));
        factory.createGame(hashedGameSolution, playerNumber);
        MatchingGame game = factory.games(0);
        assertEq(game.hashedGameSolution(), hashedGameSolution);
    }

    function testGamesCount() public {
        uint8 playerNumber = 2;
        string memory gameSolution = "123456789";
        bytes32 salt = bytes32("182731238");
        bytes32 hashedGameSolution = keccak256(abi.encodePacked(salt, gameSolution));
        factory.createGame(hashedGameSolution, playerNumber);
        factory.createGame(hashedGameSolution, playerNumber);
        MatchingGame[] memory games = factory.getGames();
        assertEq(games.length, 2);
    }
}
