// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

import "contracts/interfaces/IGasDiscountExtension.sol";

interface IAggregationExecutor is IGasDiscountExtension {
    function callBytes(bytes calldata data) external payable; // 0xd9c45357
}
