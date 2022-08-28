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
}
