import { useMUD } from './MUDContext';
// import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProjectCards } from './components/ProjectCards';
// import { SyncState } from '@latticexyz/network';
import FullScreenModal from './components/FullScreenModal';
import ProjectForm from './components/ProjectForm';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { ToastError } from './components/ToastError';
import { ToastSuccess } from './components/ToastSuccess';
import { useInterval } from './hooks/useInterval';

export const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    network: { worldContract },
  } = useMUD();
  const [maxProjectNum, setMaxProjectNum] = useState(0);

  useInterval(() => {
    (async () => {
      const maxHackathonId = await worldContract.getMaxProjectId();
      console.log('maxHackathonId: ', maxHackathonId);
      const _maxProjectNum = ethers.BigNumber.from(maxHackathonId).toNumber();
      if (_maxProjectNum !== maxProjectNum) {
        setMaxProjectNum(_maxProjectNum);
      }
    })();
  }, 5000);

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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {error && <ToastError message={error} />}
      {success && <ToastSuccess message={success} />}
      <div className="text-center mt-12 mb-6">
        <h1 className="font-bold text-4xl">
          Community driven support creates onchain worlds.<br /> hackathons for future
        </h1>
      </div>

      <div className="text-center">
        <a onClick={openModal}>
          <button className="btn bg-[#333333] text-white rounded-lg">Create a project</button>
        </a>
      </div>

      <FullScreenModal isOpen={modalOpen} onClose={closeModal}>
        <ProjectForm
          onClose={closeModal}
          maxProjectNum={maxProjectNum}
          setMaxProjectNum={setMaxProjectNum}
          setError={setError}
          setSuccess={setSuccess}
        />
      </FullScreenModal>

      {/* <ProjectCards maxProjectNum={maxProjectNum} /> */}

      <Footer />
    </>
  );
};
