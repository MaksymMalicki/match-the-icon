// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "forge-std/Test.sol";
import "../src/MatchingGame.sol"

contract MatchingGameTest is Test {
    function setUp()public {
    
        // chain of emoji numbers provided by the game logic
        string memory answerChain = "12345678910";

        // random salt to be added to the answer 
        // it will make it harder to retrieve the answer 
        // from prehashed data
        bytes32 salt = bytes32("2163126323687461423612846");

        bytes32 hashedAnswer = keccak256(abi.encodePacked(salt, answerChain));
    }
    function testExample() public {
        assertTrue(true);
    }
}
