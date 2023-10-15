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
  const [projectsTargetRate, setProjectsTargetRate] = useState(0);
  const [submitPeriod, setSubmitPeriod] = useState(BigNumber.from(0));
  const [deposit, setDeposit] = useState(BigNumber.from(0));
  const [prizeToken, setPrizeToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const bigNum = ethers.BigNumber.from(projectNum);
        const projectId = '0x' + bigNum.toHexString().slice(2).padStart(64, '0');

        const project = await worldContract.getProject(projectId);
        const projectInfo = await worldContract.getProjectInfo(projectId);
        console.log('@@project', project);
        console.log('@@projectInfo', projectInfo);
        setName(projectInfo.name);
        setImageUri(projectInfo.imageUri);
        setSubmitPeriod(project.fundingPeriod);
        setPrizeToken(project.fundedSum);

        if ((project.fundedSum / project.fundTarget) > 100) {
          setProjectsTargetRate(100);
        } else {
          setProjectsTargetRate(project.fundedSum / project.fundTarget);
        }
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

  console.log("", )

  return loading ? (
    <div className="flex items-center justify-center">
      <span className="loading-spinner text-info"></span>
    </div>
  ) : name ? (
    <Link to={`/project/${projectNum}`}>
      <div className="card w-80 bg-base-100 shadow-xl">
        <figure><img src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F582309379%2F1637870253013%2F1%2Foriginal.20230824-143912?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C120%2C1920%2C960&s=a8b9007be433fbfd7df29137c550abbb" alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg width="20" height="16" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_402_7022)">
                <path d="M2.90918 17C2.90918 24.8592 9.67863 31.2525 18.0001 31.2525V18.3562H6.54576V15.6087H16.5455V6.18184H18.0001V2.7475C9.67863 2.7475 2.90918 9.14087 2.90918 17Z" fill="white"/>
                <path d="M19.4545 6.18184V18.3562H18V31.2525C26.3215 31.2525 33.0909 24.8592 33.0909 17C33.0909 9.14087 26.3215 2.7475 18 2.7475V6.18184H19.4545Z" fill="white"/>
                <path d="M18 0V2.74747C26.3215 2.74747 33.0909 9.14085 33.0909 17C33.0909 24.8591 26.3215 31.2525 18 31.2525V34C27.9251 34 36 26.3737 36 17C36 7.6263 27.9251 0 18 0Z" fill="black"/>
                <path d="M18 31.2525C9.67854 31.2525 2.90909 24.8591 2.90909 17C2.90909 9.14085 9.67854 2.74747 18 2.74747V0C8.07491 0 0 7.6263 0 17C0 26.3737 8.07491 34 18 34V31.2525Z" fill="black"/>
                <path d="M19.4548 6.18182H16.5457V15.6087H6.5459V18.3562H19.4548V6.18182Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_402_7022">
                <rect width="36" height="34" fill="white"/>
                </clipPath>
                </defs>
              </svg>

              <p className="ml-1">{calculateTimeRemaining()}</p>
            </div>
            <div className="flex items-center">
              <p className="ml-auto">{ethers.utils.formatUnits(prizeToken, 18)}  ETH</p>
            </div>
          </div>

          <div className="flex items-center w-100 ">
            <div className="bg-[#C6EF50] h-2" style={{ width: `${projectsTargetRate.toString()}%` }}></div>
            <p className="ml-2">{projectsTargetRate}%</p>
          </div>
        </div>
      </div>
    </Link>
  ) : null;
};
