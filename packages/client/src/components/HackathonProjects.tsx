import React, { FC, useState, useEffect } from 'react';
import { useMUD } from '../MUDContext';
import HackathonProjectCard from './HackathonProjectCard';
import FullScreenModal from './FullScreenModal';
import HackathonSubmit from './HackathonSubmit';
import { useInterval } from '../hooks/useInterval';
import VoteNone from './VoteNone';
import { ToastError } from './ToastError';
import { ToastSuccess } from './ToastSuccess';
import VoteModal from './VoteModal';

interface HackathonProjectsProps {
  hackathonId: string;
  phase: number;
}

const HackathonProjects = ({ hackathonId, phase }: HackathonProjectsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [modalOpenVote, setModalOpenVote] = useState(false);
  const openModalVote = () => {
    setModalOpenVote(true);
  };
  const closeModalVote = () => {
    setModalOpenVote(false);
  };

  const {
    network: { worldContract },
  } = useMUD();

  const [hackathonSubmitters, setHackathonSubmitters] = useState([]);
  const [votesNum, setVotesNum] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [error, success]);

  useInterval(() => {
    (async () => {
      const hackathonPrize = await worldContract.getHackathonPrize(hackathonId);
      setHackathonSubmitters(hackathonPrize?.submitters);
    })(); 
  }, 5000);

  return (
    <>
      {error && <ToastError message={error} />}
      {success && <ToastSuccess message={success} />}
      <FullScreenModal isOpen={modalOpenVote} onClose={closeModalVote}>
        <VoteModal
          onClose={closeModalVote}
          hackathonId={hackathonId}
          votesNum={votesNum}
          setError={setError}
          setSuccess={setSuccess}
          displayNum={true}
        />
      </FullScreenModal>
      <FullScreenModal isOpen={modalOpen} onClose={closeModal}>
        <HackathonSubmit onClose={closeModal} hackathonId={hackathonId} />
      </FullScreenModal>

      <div className="flex flex-wrap justify-center mb-20">
        {hackathonSubmitters &&
          hackathonSubmitters.map((submitter) => (
            <div key={submitter} className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 p-2">
              <HackathonProjectCard 
                hackathonId={hackathonId}
                submitter={submitter} 
                phase={phase}
                votesNum={votesNum}
                setVotesNum={setVotesNum} 
              />
            </div>
          ))
        }
        
      </div>
      
  
      <div className="text-center mb-10">
        <a onClick={openModal}>
          <button className="btn bg-[#333333] text-white rounded-lg">Submit project</button>
        </a>
        <p className="mt-2 text-[#333333] text-sm">1 project per address only</p>
      </div>
      
    </>
  );
};

export default HackathonProjects;
