// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Administrator, AdministratorTableId, Config, ConfigTableId, Project, ProjectData, ProjectTableId, ProjectInfo, ProjectInfoData, ProjectInfoTableId, ProjectDonator, ProjectDonatorData, ProjectDonatorTableId, Donator, DonatorTableId} from "../codegen/Tables.sol";

contract TokenSystem is System {
  modifier onlyProjectOwner(bytes32 _projectId) {
    require(Project.get(_projectId).owner == _msgSender(), "Only owner can call this function.");
    _;
  }

  modifier donate(
    bytes32 _projectId,
    uint256 _amount
  ){
    ProjectData memory _projectData = Project.get(_projectId);
    require(_projectData.fundingPeriod <= block.timestamp, "fundingPeriod has already passed.");

    //set donate amount
    uint256 _donate = Project.getFundedSum(_projectId);
    Project.setFundedSum(_projectId, _donate + _amount);


    uint256 amounts = Donator.get(_projectId, _msgSender());
    if (amounts > 0) {
      Donator.set(_projectId, _msgSender(), _donate + amounts);
    } else {
      Donator.set(_projectId, _msgSender(), _donate);
    }
    

    // push ProjectPrizeSponsor amounts
    ProjectDonator.pushAmounts(_projectId, _amount);
    ProjectDonator.pushWalletAddress(_projectId, _msgSender());

    _;
  }

  function donateEth(
    bytes32 _projectId,
    uint256 _amount
  ) public payable donate(_projectId, _amount) {
    //transfer ETH
    require(msg.value == _amount, "ETH amount is not equal to the amount specified.");
  } 


  function withdrawByOwner(bytes32 _projectId) public onlyProjectOwner(_projectId) {
    ProjectData memory _projectData = Project.get(_projectId);
    require(_projectData.fundingPeriod > block.timestamp, "fundingPeriod is not passed.");
    require(_projectData.fundedSum >= _projectData.fundTarget, "You cant acheieved the target.");

    //if prize is still left, withdraw to owner
    uint256 _prize = Project.getFundedSum(_projectId);
    if(_prize > 0){
      Project.setFundedSum(_projectId,0);
      payable(_msgSender()).transfer(_prize);
    }
  }

  function withdrawByDonator(bytes32 _projectId) public payable {
    ProjectData memory _projectData = Project.get(_projectId);
    require(_projectData.fundingPeriod > block.timestamp, "fundingPeriod is not passed.");
    require(_projectData.fundedSum < _projectData.fundTarget, "The target overpassed, donators can't withdwaw it.");

    uint256 amounts = Donator.get(_projectId, _msgSender());
    payable(_msgSender()).transfer(amounts);
  }
}
