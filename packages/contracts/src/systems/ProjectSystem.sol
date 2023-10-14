// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Administrator, AdministratorTableId, Config, ConfigTableId, Project, ProjectData, ProjectTableId, ProjectInfo, ProjectInfoData, ProjectInfoTableId } from "../codegen/Tables.sol";

contract ProjectSystem is System {
  modifier onlyAdmin() {
    require(Administrator.get() == _msgSender(), "Only administrator can call this function.");
    _;
  }

  function createProject(
    address _fundToken,
    uint256 _fundTarget,
    uint256 _startTimestamp,
    ProjectInfoData memory _projectInfo
  ) public  {
    require(_startTimestamp >= block.timestamp, "StartTimestamp is not future.");
    bytes32 _projectId = _incrementProjectId();
    uint256 withdrawalPeriod = _startTimestamp + 2 weeks;
    uint256 fundingPeriod = _startTimestamp + 30 days;
    Project.set(_projectId,ProjectData(
      _msgSender(),
      _fundToken,
      _fundTarget,
      0,
      fundingPeriod,
      withdrawalPeriod
    ));
    ProjectInfo.set(_projectId,_projectInfo);
  }

  function _incrementProjectId() internal returns(bytes32 newProjectId_){
    newProjectId_ = bytes32(uint256(Config.get()) + 1);
    Config.set(newProjectId_);
  }

  function deleteProjectByAdmin(bytes32 _projectId) public onlyAdmin() {
    _deleteProject(_projectId);
  }

  function _deleteProject(bytes32 _projectId) internal {
    ProjectData memory _projectData = Project.get(_projectId);
    require(_projectData.fundTarget > 0, "Your project is not exist.");
    Project.deleteRecord(_projectId);
    ProjectInfo.deleteRecord(_projectId);
  }
}
