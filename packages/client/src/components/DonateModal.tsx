import React, { useEffect } from 'react';
import { useMUD } from '../MUDContext';
import { useState } from 'react';
import { utils, Contract, BigNumber } from 'ethers';
import { getPrizeTokenSymbol, numberToBigNumber } from '../utils/common';
import { erc20abi } from '../constants/erc20abi';
import { worldAbi } from '../constants/worldAbi';
import { useInterval } from '../hooks/useInterval';
import { useToast } from '../hooks/useToast';
import { Toast } from './Toast';

interface HackathonPrizeMocalProps {
  onClose: () => void;
  projectId: string;
  prizeToken: string;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}



const DonateModal = ({ onClose, projectId, prizeToken, setError, setSuccess }: HackathonPrizeMocalProps) => {
  const {
    systemCalls: { donateEth },
    network: { worldContract, signerOrProvider, chainId },
  } = useMUD();
  const [amount, setAmount] = useState(0);
  const [allowance, setAllowance] = useState(BigNumber.from('0'));
  const prizeTokenSymbol = getPrizeTokenSymbol(prizeToken, chainId);


  return (
    <div className="p-6">
      <p className="font-bold text-sm">Donate {prizeTokenSymbol}</p>
      <div className="mt-4 w-full">
        <input
          type="number"
          placeholder="0.0"
          className="input input-bordered w-full text-gray-900"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
 
        <div className="text-center">
          <button
            className="mt-4 font-bold pl-10 pr-10 pt-2 pb-2  bg-[#F5BD41] text-white rounded-lg"
            onClick={async (event) => {
              event.preventDefault();
              try {
                const world = new Contract(worldContract.address, worldAbi, signerOrProvider);
                await world.donateEth(projectId, numberToBigNumber(amount, 18), {
                  value: numberToBigNumber(amount, 18),
                });
                setSuccess('Donate success');
              } catch (error) {
                console.error(error);
                setError('Donate error');
              }
              onClose();
            }}
          >
            Donate ETH
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
