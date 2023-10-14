import { getComponentValue } from '@latticexyz/recs';
import { awaitStreamValue } from '@latticexyz/utils';
import { ClientComponents } from './createClientComponents';
import { SetupNetworkResult } from './setupNetwork';
import { ethers } from 'ethers';

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { }: ClientComponents,
) {
  const createProject = async (
    _fundToken: string,
    _fundTarget: ethers.BigNumber,
    _startTimestamp: number,
    _name: string,
    _uri: string,
    _imageUri: string,
    _description: string,
    _demoUri: string
    
  ) => {
    const tx = await worldSend('createProject', [
      _fundToken,
      _fundTarget,
      _startTimestamp,
      { name: _name, uri: _uri, imageUri: _imageUri, description: _description, demoUri: _demoUri }
    ]);
  };


  const deleteProjectByAdmin = async (_hackathonId: string) => {
    const tx = await worldSend('deleteProject', [_hackathonId]);
  };

  const donateEth = async (_hackathonId: string, _amount: ethers.BigNumber) => {
    const tx = await worldSend('donateEth', [_hackathonId, _amount]);
  };


  const withdrawByOwner = async (_hackathonId: string) => {
    const tx = await worldSend('withdrawByOwner', [_hackathonId]);
  };

  const withdrawByDonator = async (_hackathonId: string) => {
    const tx = await worldSend('withdrawByDonator', [_hackathonId]);
  };

  return {
    createProject,
    deleteProjectByAdmin,
    donateEth,
    withdrawByOwner,
    withdrawByDonator
  };
}
