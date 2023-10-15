import { useMUD } from '../MUDContext';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FullScreenModal from '../components/FullScreenModal';
import DonateModal from '../components/DonateModal';
import { ToastError } from '../components/ToastError';
import { ToastSuccess } from '../components/ToastSuccess';
import { BigNumber, ethers } from 'ethers';

export const ProjectPage = () => {
  const { id } = useParams();
  const {
    network: { worldContract },
    systemCalls: { withdrawByOwner, withdrawByDonator },
  } = useMUD();
  const bigNum = ethers.BigNumber.from(id);
  const projectId = '0x' + bigNum.toHexString().slice(2).padStart(64, '0');

  const [activeTab, setActiveTab] = useState(1);
  const [name, setName] = useState('');
  const [uri, setUri] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [prizeToken, setPrizeToken] = useState('');
  const [phase, setPhase] = useState(0);
  const [winnerCount, setWinnerCount] = useState(0);
  const [voteNft, setVoteNft] = useState('');
  const [startTimestamp, setStartTimestamp] = useState(0);
  const [submitPeriod, setSubmitPeriod] = useState(0);
  const [votingPeriod, setVotingPeriod] = useState(0);
  const [withdrawalPeriod, setWithdrawalPeriod] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);;

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const initialSponsors: [BigNumber[], string[]] = [[], []];
  const [donator, setDonator] = useState(initialSponsors);

  useEffect(() => {
    (async () => {
      const fetchedSpecialVoters: number[] = [];
      const donators = await worldContract.getProjectDonator(projectId);
      if (donators && donators.length > 0 && donators[0].length > 0 && donators[1].length > 0) {
        // Sorted in order of the amount deposited.
        const sortedSponsors = donators[0].map((value, index) => ({
          depositSum: value,
          address: donators[1][index],
        })).sort((a, b) => b.depositSum.sub(a.depositSum).toNumber());
  
        setDonator([
          sortedSponsors.map(item => item.depositSum),
          sortedSponsors.map(item => item.address)
        ]);
      }

    })();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [error, success]);

  return (
    <div className="h-auto">
      {error && <ToastError message={error} />}
      {success && <ToastSuccess message={success} />}
      <div className="card lg:card-side shadow-xl bg-black">
        <figure><img src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F582309379%2F1637870253013%2F1%2Foriginal.20230824-143912?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C120%2C1920%2C960&s=a8b9007be433fbfd7df29137c550abbb" alt="Album"/></figure>
        <div className="card-body">
          <p className="text-white">Donated amount</p>
          <h2 className="card-title text-white">1.0005 ETH</h2>
          <p className="text-white">Target 1.25 ETH</p>
          <div className="text-white">
            <span>Donator</span>
            <span>33 people</span>
          </div>
          <div className="text-white">
            <span>Rest</span>
            <span>14 days</span>
          </div>
          <div className="card-actions justify-end">
            <a onClick={openModal}>
              <button className="btn bg-[#F5BD41] text-white">Donate</button>
            </a>
          </div>
          <FullScreenModal isOpen={modalOpen} onClose={closeModal}>
              <DonateModal 
                onClose={closeModal} 
                projectId={projectId} 
                prizeToken={prizeToken}
                setError={setError}
                setSuccess={setSuccess} 
              />
            </FullScreenModal>
        </div>
      </div>
      
      {donator.length > 0 && donator[0].length > 0 ? ( 
        <div className="grid grid-cols-2 p-4 rounded-md shadow-md mt-4 mb-12">
          <div className="col-span-1 border-b font-bold pb-2">Account</div>
          <div className="col-span-1 border-b font-bold pb-2">Amount</div>

          {donator[0].map((depositSum, index) => (
            <>
              <div key={`sum-${index}`}>
                <div className="col-span-1 border-b pb-2 pt-2 text-gray-500">
                  <a
                      href={`https://explorer.jolnir.taiko.xyz/address/${donator[1][index]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {`${donator[1][index].slice(0, 5)}...${donator[1][index].slice(-5)}`}
                    </a>
                </div>
              </div>
              <div key={`sponsor-${index}`}>
                <div className="col-span-1 border-b pb-2 pt-2 text-gray-500">
                  {ethers.utils.formatUnits(depositSum, 18)}
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <p>No one donated</p>
      )}
      <div className="mt-10 mx-auto">
        {
          (
            <div className="flex justify-center items-center">
              <button
                className="mt-4 font-bold pl-10 pr-10 pt-2 pb-2 shadow-xl rounded-lg"
                onClick={async (event) => {
                  event.preventDefault();
                  
                  try {
                    await withdrawByOwner(projectId);
                    setSuccess('Withdraw success');
                  } catch (error) {
                    console.error(error);
                    setError('Withdraw error');
                  }
                }}
              >
                WithdrawPrizeByOwner
              </button>
              
            </div>
          )
        }
      </div>
    </div>
  );
};
