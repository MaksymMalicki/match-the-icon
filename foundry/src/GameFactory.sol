// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.13;

import "./MatchingGame.sol";

contract GameFactory {
    MatchingGame[] public games;
    event GameCreated(MatchingGame indexed game, address indexed creator);

    constructor() {}

    function createGame(bytes32 gameSolution, uint8 playerNumber) public {
        MatchingGame game = new MatchingGame(gameSolution, playerNumber);
        games.push(game);
        emit GameCreated(game, msg.sender);
    }

    function getGames() public view returns (MatchingGame[] memory) {
        return games;
    }
}
