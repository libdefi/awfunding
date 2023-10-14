// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { 
  Config, 
  Administrator,
  Project,
  ProjectData,
  ProjectInfo,
  ProjectInfoData,
  ProjectDonator,
  ProjectDonatorData
} from "../codegen/Tables.sol";
import { Phase } from "../codegen/Types.sol";

contract ViewSystem is System {

  function getMaxProjectId() public view returns(bytes32){
    return Config.get();
  }

  function getAdministrator() public view returns(address) {
    return Administrator.get();
  }

  function getProject(bytes32 _projectId) public view returns(ProjectData memory){
    return Project.get(_projectId);
  }

  function getProjectInfo(bytes32 _projectId) public view returns(ProjectInfoData memory){
    return ProjectInfo.get(_projectId);
  }

  function getProjectAchievedTarget(bytes32 _projectId) public view returns (bool) {
    ProjectData memory _projectData =  Project.get(_projectId);
    return _projectData.fundTarget < _projectData.fundedSum;
  }

  function getProjectIsBeforeDeadline(bytes32 _projectId) public view returns (bool) {
    ProjectData memory _projectData =  Project.get(_projectId);
    return _projectData.fundingPeriod < block.timestamp;
  }

  function getProjectIsBeforeWithdrawDeadline(bytes32 _projectId) public view returns (bool) {
    ProjectData memory _projectData =  Project.get(_projectId);
    return _projectData.withdrawalPeriod < block.timestamp;
  }

  function getProjectDonator(bytes32 _projectId) public view returns(uint256[] memory, address[] memory){
    ProjectDonatorData memory _data =  ProjectDonator.get(_projectId);
    return (_data.amounts, _data.walletAddress);
  }
}
