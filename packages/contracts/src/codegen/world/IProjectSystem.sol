// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

import { ProjectInfoData } from "./../Tables.sol";

interface IProjectSystem {
  function createProject(
    address _fundToken,
    uint256 _fundTarget,
    uint256 _startTimestamp,
    ProjectInfoData memory _projectInfo
  ) external;

  function deleteProjectByAdmin(bytes32 _projectId) external;
}
