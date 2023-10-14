import { BigNumber, ethers } from 'ethers';
import { useMUD } from '../MUDContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPrizeTokenSymbol, bigNumberToNumber } from '../utils/common';

interface ProjectCardProps {
  projectNum: number;
}

export const ProjectCard = ({ projectNum }: ProjectCardProps) => {
  const {
    // components: { Hackathon, HackathonPrize },
    network: { worldContract, chainId },
  } = useMUD();
  const [imageUri, setImageUri] = useState('');
  const [name, setName] = useState('');
  const [projectsSum, setProjectsSum] = useState(0);
  const [submitPeriod, setSubmitPeriod] = useState(BigNumber.from(0));
  const [deposit, setDeposit] = useState(BigNumber.from(0));
  const [prizeToken, setPrizeToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const bigNum = ethers.BigNumber.from(projectNum);
        const paddedHexStr = '0x' + bigNum.toHexString().slice(2).padStart(64, '0');

        const project = await worldContract.getProject(paddedHexStr);
        const projectInfo = await worldContract.getProjectInfo(paddedHexStr);
        console.log('@@project', project);
        console.log('@@projectInfo', projectInfo);
        setName(projectInfo.name);
        setImageUri(projectInfo.imageUri);
        // setSubmitPeriod(project.submitPeriod);
        // setPrizeToken(project.prizeToken);

        // const projectPrize = await worldContract.getProjectPrize(paddedHexStr);
        // setDeposit(projectPrize.deposit);
        // const projectSum = projectPrize?.submitters.length ? projectPrize.submitters.length : 0;
        // setProjectsSum(projectSum);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, []);

  const calculateTimeRemaining = () => {
    const timeInSeconds = Number(submitPeriod) - Date.now() / 1000;
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

  // const depositAmount = deposit
  //   ? bigNumberToNumber(deposit, getDecimalPlaces(prizeToken, chainId))
  //   : 0;

  // function getDecimalPlaces(prizeToken: string, chainId: number): number {
  //   return getPrizeTokenSymbol(prizeToken, chainId) === 'USDC' ? 6: 18;
  // }

  return loading ? (
    <div className="flex items-center justify-center">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  ) : name ? (
    <Link to={`/project/${projectNum}`}>
      <div className="card w-80 bg-base-100 shadow-xl">
        <figure><img src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F582309379%2F1637870253013%2F1%2Foriginal.20230824-143912?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C120%2C1920%2C960&s=a8b9007be433fbfd7df29137c550abbb" alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">Malaysia to host largest ever dev event in 2024</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {/* SVGアイコンのコンテンツ */}
              </svg>
              <p className="">14days</p>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {/* SVGアイコンのコンテンツ */}
              </svg>
              <p className="ml-auto">100 ETH</p>
            </div>
          </div>

          <div className="flex items-center w-100 ">
            <div className="bg-[#C6EF50] h-2" style={{ width: `100%` }}></div>
            <p className="ml-2">100%</p>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center space-x-4 custom-border h-[190px]">
        <div className="ml-3">
          <figure>
            <img 
              src={imageUri.startsWith('http') ? imageUri : 'http://arweave.net/SFQNZecr_C3oxxsJBFItR6HYnlVyC4vAzsV_PlKcn5E'} 
              alt="Hackathon image" 
              className="w-full h-[108px] object-cover " 
            />
          </figure>
        </div>
        <div className="card-compact">
          <h2 className="card-title text-md">{name}</h2>
          <div className="card-actions mt-2">
            <button className="bg-[#333333] text-white pl-4 pr-4 pt-1 pb-1 text-sm rounded-3xl">
              {calculateTimeRemaining()}
            </button>
          </div>
          <div className="mt-2">
            <span className="font-bold">
              {getPrizeTokenSymbol(prizeToken, chainId)}
            </span>
            <span className="p-2 text-gray-600">deposited</span>
            <span className="font-bold">{projectsSum}</span>
            <span className="p-2 text-gray-600">projects</span>
          </div>
        </div>
      </div> */}
    </Link>
  ) : null;
};
