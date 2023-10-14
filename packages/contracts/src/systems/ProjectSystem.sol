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
    uint256 _fundingPeriod,
    uint256 _withdrawalPeriod,
    ProjectInfoData memory _projectInfo
  ) public  {
    require(_startTimestamp >= block.timestamp, "StartTimestamp is not future.");
    bytes32 _projectId = _incrementProjectId();
    // withdrawはFunding期限後2週間以内に行う。
    Project.set(_projectId,ProjectData(
      _msgSender(),
      _fundToken,
      _fundTarget,
      0,
      _fundingPeriod,
      _withdrawalPeriod
    ));
    ProjectInfo.set(_projectId,_projectInfo);
    // ProjectFund.set(_prokectId,
    //   ProjectFundData( 0, new address[](0))
    // );
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

    Project.deleteRecord(_projectId);
    ProjectInfo.deleteRecord(_projectId);
  }
}
