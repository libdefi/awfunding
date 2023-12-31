// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

interface ITokenSystem {
  function donateEth(bytes32 _projectId, uint256 _amount) external payable;

  function withdrawByOwner(bytes32 _projectId) external;

  function withdrawByDonator(bytes32 _projectId) external payable;
}
