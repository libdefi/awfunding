// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

// Import schema type
import { SchemaType } from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { PackedCounter, PackedCounterLib } from "@latticexyz/store/src/PackedCounter.sol";

bytes32 constant _tableId = bytes32(abi.encodePacked(bytes16(""), bytes16("Project")));
bytes32 constant ProjectTableId = _tableId;

struct ProjectData {
  address owner;
  address fundToken;
  uint256 fundTarget;
  uint256 fundedSum;
  uint256 fundingPeriod;
  uint256 withdrawalPeriod;
}

library Project {
  /** Get the table's schema */
  function getSchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](6);
    _schema[0] = SchemaType.ADDRESS;
    _schema[1] = SchemaType.ADDRESS;
    _schema[2] = SchemaType.UINT256;
    _schema[3] = SchemaType.UINT256;
    _schema[4] = SchemaType.UINT256;
    _schema[5] = SchemaType.UINT256;

    return SchemaLib.encode(_schema);
  }

  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](1);
    _schema[0] = SchemaType.BYTES32;

    return SchemaLib.encode(_schema);
  }

  /** Get the table's metadata */
  function getMetadata() internal pure returns (string memory, string[] memory) {
    string[] memory _fieldNames = new string[](6);
    _fieldNames[0] = "owner";
    _fieldNames[1] = "fundToken";
    _fieldNames[2] = "fundTarget";
    _fieldNames[3] = "fundedSum";
    _fieldNames[4] = "fundingPeriod";
    _fieldNames[5] = "withdrawalPeriod";
    return ("Project", _fieldNames);
  }

  /** Register the table's schema */
  function registerSchema() internal {
    StoreSwitch.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Register the table's schema (using the specified store) */
  function registerSchema(IStore _store) internal {
    _store.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Set the table's metadata */
  function setMetadata() internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    StoreSwitch.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Set the table's metadata (using the specified store) */
  function setMetadata(IStore _store) internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    _store.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Get owner */
  function getOwner(bytes32 key) internal view returns (address owner) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 0);
    return (address(Bytes.slice20(_blob, 0)));
  }

  /** Get owner (using the specified store) */
  function getOwner(IStore _store, bytes32 key) internal view returns (address owner) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 0);
    return (address(Bytes.slice20(_blob, 0)));
  }

  /** Set owner */
  function setOwner(bytes32 key, address owner) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    StoreSwitch.setField(_tableId, _keyTuple, 0, abi.encodePacked((owner)));
  }

  /** Set owner (using the specified store) */
  function setOwner(IStore _store, bytes32 key, address owner) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    _store.setField(_tableId, _keyTuple, 0, abi.encodePacked((owner)));
  }

  /** Get fundToken */
  function getFundToken(bytes32 key) internal view returns (address fundToken) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 1);
    return (address(Bytes.slice20(_blob, 0)));
  }

  /** Get fundToken (using the specified store) */
  function getFundToken(IStore _store, bytes32 key) internal view returns (address fundToken) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 1);
    return (address(Bytes.slice20(_blob, 0)));
  }

  /** Set fundToken */
  function setFundToken(bytes32 key, address fundToken) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    StoreSwitch.setField(_tableId, _keyTuple, 1, abi.encodePacked((fundToken)));
  }

  /** Set fundToken (using the specified store) */
  function setFundToken(IStore _store, bytes32 key, address fundToken) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    _store.setField(_tableId, _keyTuple, 1, abi.encodePacked((fundToken)));
  }

  /** Get fundTarget */
  function getFundTarget(bytes32 key) internal view returns (uint256 fundTarget) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 2);
    return (uint256(Bytes.slice32(_blob, 0)));
  }

  /** Get fundTarget (using the specified store) */
  function getFundTarget(IStore _store, bytes32 key) internal view returns (uint256 fundTarget) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 2);
    return (uint256(Bytes.slice32(_blob, 0)));
  }

  /** Set fundTarget */
  function setFundTarget(bytes32 key, uint256 fundTarget) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    StoreSwitch.setField(_tableId, _keyTuple, 2, abi.encodePacked((fundTarget)));
  }

  /** Set fundTarget (using the specified store) */
  function setFundTarget(IStore _store, bytes32 key, uint256 fundTarget) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    _store.setField(_tableId, _keyTuple, 2, abi.encodePacked((fundTarget)));
  }

  /** Get fundedSum */
  function getFundedSum(bytes32 key) internal view returns (uint256 fundedSum) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 3);
    return (uint256(Bytes.slice32(_blob, 0)));
  }

  /** Get fundedSum (using the specified store) */
  function getFundedSum(IStore _store, bytes32 key) internal view returns (uint256 fundedSum) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 3);
    return (uint256(Bytes.slice32(_blob, 0)));
  }

  /** Set fundedSum */
  function setFundedSum(bytes32 key, uint256 fundedSum) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    StoreSwitch.setField(_tableId, _keyTuple, 3, abi.encodePacked((fundedSum)));
  }

  /** Set fundedSum (using the specified store) */
  function setFundedSum(IStore _store, bytes32 key, uint256 fundedSum) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    _store.setField(_tableId, _keyTuple, 3, abi.encodePacked((fundedSum)));
  }

  /** Get fundingPeriod */
  function getFundingPeriod(bytes32 key) internal view returns (uint256 fundingPeriod) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 4);
    return (uint256(Bytes.slice32(_blob, 0)));
  }

  /** Get fundingPeriod (using the specified store) */
  function getFundingPeriod(IStore _store, bytes32 key) internal view returns (uint256 fundingPeriod) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 4);
    return (uint256(Bytes.slice32(_blob, 0)));
  }

  /** Set fundingPeriod */
  function setFundingPeriod(bytes32 key, uint256 fundingPeriod) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    StoreSwitch.setField(_tableId, _keyTuple, 4, abi.encodePacked((fundingPeriod)));
  }

  /** Set fundingPeriod (using the specified store) */
  function setFundingPeriod(IStore _store, bytes32 key, uint256 fundingPeriod) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    _store.setField(_tableId, _keyTuple, 4, abi.encodePacked((fundingPeriod)));
  }

  /** Get withdrawalPeriod */
  function getWithdrawalPeriod(bytes32 key) internal view returns (uint256 withdrawalPeriod) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 5);
    return (uint256(Bytes.slice32(_blob, 0)));
  }

  /** Get withdrawalPeriod (using the specified store) */
  function getWithdrawalPeriod(IStore _store, bytes32 key) internal view returns (uint256 withdrawalPeriod) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 5);
    return (uint256(Bytes.slice32(_blob, 0)));
  }

  /** Set withdrawalPeriod */
  function setWithdrawalPeriod(bytes32 key, uint256 withdrawalPeriod) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    StoreSwitch.setField(_tableId, _keyTuple, 5, abi.encodePacked((withdrawalPeriod)));
  }

  /** Set withdrawalPeriod (using the specified store) */
  function setWithdrawalPeriod(IStore _store, bytes32 key, uint256 withdrawalPeriod) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    _store.setField(_tableId, _keyTuple, 5, abi.encodePacked((withdrawalPeriod)));
  }

  /** Get the full data */
  function get(bytes32 key) internal view returns (ProjectData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = StoreSwitch.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Get the full data (using the specified store) */
  function get(IStore _store, bytes32 key) internal view returns (ProjectData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    bytes memory _blob = _store.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Set the full data using individual values */
  function set(
    bytes32 key,
    address owner,
    address fundToken,
    uint256 fundTarget,
    uint256 fundedSum,
    uint256 fundingPeriod,
    uint256 withdrawalPeriod
  ) internal {
    bytes memory _data = encode(owner, fundToken, fundTarget, fundedSum, fundingPeriod, withdrawalPeriod);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    StoreSwitch.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using individual values (using the specified store) */
  function set(
    IStore _store,
    bytes32 key,
    address owner,
    address fundToken,
    uint256 fundTarget,
    uint256 fundedSum,
    uint256 fundingPeriod,
    uint256 withdrawalPeriod
  ) internal {
    bytes memory _data = encode(owner, fundToken, fundTarget, fundedSum, fundingPeriod, withdrawalPeriod);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    _store.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using the data struct */
  function set(bytes32 key, ProjectData memory _table) internal {
    set(
      key,
      _table.owner,
      _table.fundToken,
      _table.fundTarget,
      _table.fundedSum,
      _table.fundingPeriod,
      _table.withdrawalPeriod
    );
  }

  /** Set the full data using the data struct (using the specified store) */
  function set(IStore _store, bytes32 key, ProjectData memory _table) internal {
    set(
      _store,
      key,
      _table.owner,
      _table.fundToken,
      _table.fundTarget,
      _table.fundedSum,
      _table.fundingPeriod,
      _table.withdrawalPeriod
    );
  }

  /** Decode the tightly packed blob using this table's schema */
  function decode(bytes memory _blob) internal pure returns (ProjectData memory _table) {
    _table.owner = (address(Bytes.slice20(_blob, 0)));

    _table.fundToken = (address(Bytes.slice20(_blob, 20)));

    _table.fundTarget = (uint256(Bytes.slice32(_blob, 40)));

    _table.fundedSum = (uint256(Bytes.slice32(_blob, 72)));

    _table.fundingPeriod = (uint256(Bytes.slice32(_blob, 104)));

    _table.withdrawalPeriod = (uint256(Bytes.slice32(_blob, 136)));
  }

  /** Tightly pack full data using this table's schema */
  function encode(
    address owner,
    address fundToken,
    uint256 fundTarget,
    uint256 fundedSum,
    uint256 fundingPeriod,
    uint256 withdrawalPeriod
  ) internal view returns (bytes memory) {
    return abi.encodePacked(owner, fundToken, fundTarget, fundedSum, fundingPeriod, withdrawalPeriod);
  }

  /** Encode keys as a bytes32 array using this table's schema */
  function encodeKeyTuple(bytes32 key) internal pure returns (bytes32[] memory _keyTuple) {
    _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;
  }

  /* Delete all data for given keys */
  function deleteRecord(bytes32 key) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /* Delete all data for given keys (using the specified store) */
  function deleteRecord(IStore _store, bytes32 key) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = key;

    _store.deleteRecord(_tableId, _keyTuple);
  }
}
