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

  const [modalOpen, setModalOpen] = useState(false);;

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

  const [imageUri, setImageUri] = useState('');
  const [name, setName] = useState('');
  const [projectsTargetRate, setProjectsTargetRate] = useState(0);
  const [fundingPeriod, setFundingPeriod] = useState(BigNumber.from(0));
  const [fundingTarget, setFundingTarget] = useState(BigNumber.from(0));
  const [deposit, setDeposit] = useState(BigNumber.from(0));
  const [prizeToken, setPrizeToken] = useState('');
  const [donatedAmount, setDonatedAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [donatorsAmount, setDonatorsAmount] = useState(0);
  const [submitPeriod, setSubmitPeriod] = useState(BigNumber.from(0));

  const calculateTimeRemaining = () => {
    const timeInSeconds = Number(fundingPeriod) - Date.now() / 1000;
    const hoursRemaining = Math.floor(Math.abs(timeInSeconds) / 3600);

    let timeRemaining;
    if (hoursRemaining >= 24) {
      const daysRemaining = Math.floor(Math.abs(timeInSeconds) / 86400);
      timeRemaining = `${daysRemaining} days`;
    } else {
      timeRemaining = `${hoursRemaining} hours`;
    }
    return timeInSeconds >= 0 ? `about ${timeRemaining}` : `Finished`;
  };

  useEffect(() => {
    (async () => {
      try {
        const project = await worldContract.getProject(projectId);
        const projectInfo = await worldContract.getProjectInfo(projectId);
        console.log('@@project.fundedSum', project.fundedSum);
        console.log('@@projectInfo', projectInfo);
        setName(projectInfo.name);
        setImageUri(projectInfo.imageUri);
        setFundingPeriod(project.fundingPeriod);
        setDonatedAmount(project.fundedSum);

        setFundingTarget(project.fundTarget);

        // if ((project.fundedSum / project.fundTarget) > 100) {
        //   setProjectsTargetRate(100);
        // } else {
        //   setProjectsTargetRate(project.fundedSum / project.fundTarget);
        // }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
      setDonatorsAmount(donators[0].length);

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
        <figure><img src={imageUri} alt="Album"/></figure>
        <div className="card-body">
          
          <h1 className="card-title text-white">{name}</h1>
          <p className="text-white">Donated amount</p>
          <h2 className="card-title text-white">Donated{ethers.utils.formatUnits(donatedAmount, 18)}  ETH</h2>
          <p className="text-white">Target {ethers.utils.formatUnits(fundingTarget, 18)}  ETH</p>
          <div className="text-white">
            <span>Donator</span>
            <span>{donatorsAmount} people</span>
          </div>
          <div className="text-white">
            <span>Rest </span>
            <span>{calculateTimeRemaining()}</span>
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
        <p className="mt-10 mx-auto">No one donated</p>
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
