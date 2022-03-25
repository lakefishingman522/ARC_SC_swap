// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

import "contracts/interfaces/IChi.sol";

interface IGasDiscountExtension {
    function calculateGas(
        uint256 gasUsed,
        uint256 flags,
        uint256 calldataLength
    ) external view returns (IChi, uint256);
}
