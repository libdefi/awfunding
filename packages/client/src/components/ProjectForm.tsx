import { FC, useEffect } from 'react';
import DateTimePicker from './DateTimePicker';
import { useMUD } from '../MUDContext';
import { useState } from 'react';
import { PRIZE_TOKEN_TEST } from '../constants/constants';
import { utils } from 'ethers';
import {
  getPrizeTokenSymbol,
  numberToBigNumber,
} from '../utils/common';

type ProjectFormProps = {
  onClose: () => void;
  maxProjectNum: number;
  setMaxProjectNum: (num: number) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
};

const ProjectForm: FC<ProjectFormProps> = ({
  onClose,
  maxProjectNum,
  setMaxProjectNum,
  setError,
  setSuccess,
}) => {
  const donateTokens = PRIZE_TOKEN_TEST;

  const getWeeksLater = (weeks: number) => {
    const date = new Date();
    date.setDate(date.getDate() + 7 * weeks);
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(0);
    return date;
  };

  const getTimestampFromDateAsUTC = (date: Date) => {
      // getTimezoneOffset() returns the difference from UTC in minutes
      const offsetMinutes = date.getTimezoneOffset();

      // Adjust the date using the offset
      const adjustedDate = new Date(date.getTime() - offsetMinutes * 60 * 1000);

      // Return the UNIX timestamp of the adjusted date
      return Math.floor(adjustedDate.getTime() / 1000);
  };

  const {
    systemCalls: { createProject },
  } = useMUD();
  const [donateToken, setDonateToken] = useState(donateTokens.ETH);
  const [startTimestamp, setStartTimestamp] = useState(getWeeksLater(0.5));
  const [fundTarget, setFundTarget] = useState(1.005);
  const [name, setName] = useState('');
  const [uri, setUri] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [description, setDescription] = useState('');
  const [demoUri, setDemoUri] = useState('');

  return (
    <div className="p-4 overflow-y-auto max-h-[800px]">
      <h1 className="text-sm mb-1 font-bold">Title</h1>
      <input
        type="text"
        placeholder="Enter your project title"
        className="input input-bordered w-full max-w-xs text-gray-900"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h1 className="text-sm mb-1 mt-4 font-bold">Detail URL</h1>
      <p className="text-sm text-gray-500 mb-1">Please provide details of your project.</p>
      <input
        type="text"
        placeholder="https://xxxxxxx.framer.website/"
        className="input input-bordered w-full max-w-xs text-gray-900"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
      />

      <h1 className="text-sm mb-1 mt-4 font-bold">Demo URL</h1>
      <p className="text-sm text-gray-500 mb-1">Please provide details of your project.</p>
      <input
        type="text"
        placeholder="https://xxxxxxx.framer.website/"
        className="input input-bordered w-full max-w-xs text-gray-900"
        value={demoUri}
        onChange={(e) => setDemoUri(e.target.value)}
      />
      
      <h1 className="text-sm mb-1 mt-4 font-bold">Title image</h1>
      <p className="text-sm text-gray-500 mb-1">
        The ideal aspect ratio is 16 : 9 - for example 1200 x 630 px.
      </p>
      <input
        type="text"
        placeholder="http://arweave.net/xxxxxxxxxxxxxx"
        className="input input-bordered w-full max-w-ms text-gray-900"
        value={imageUri}
        onChange={(e) => setImageUri(e.target.value)}
      />
      
      <h1 className="text-sm mt-4 mb-1 font-bold">Description</h1>
      <textarea
        placeholder="Enter your project overview"
        className="input input-bordered w-full max-w-ms text-gray-900 pt-2"
        value={description}
        maxLength={200}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="flex">
        <div className="flex-1">
          <h1 className="text-sm mb-1 mt-4 font-bold">Donate start(GMT)</h1>
          <DateTimePicker
            selectedDateTime={startTimestamp}
            setSelectedDateTime={setStartTimestamp}
          />
        </div>
      </div>
      
      <h1 className="text-sm mb-1 mt-4 font-bold">Target Amount</h1>
      <p className="text-sm text-gray-500 mb-1">
        If you fail to achieve the goal by the deadline, you will not receive the prize.
      </p>
      <input
        type="number"
        placeholder="1.00005" 
        className="input input-bordered w-full max-w-xs text-gray-900"
        value={fundTarget}
        onChange={(e) => setFundTarget(parseFloat(e.target.value))}
      />
      
      <div className="mt-4">
        <button
          className="btn bg-[#F5BD41] text-white rounded-lg"
          
          onClick={async (event) => {
            event.preventDefault();
            try {
              await createProject(
                donateToken,
                numberToBigNumber(fundTarget, 18),
                getTimestampFromDateAsUTC(startTimestamp),
                name,
                uri,
                imageUri,
                description,
                demoUri,
              );
              const newMaxProjectNum = maxProjectNum + 1;
              setMaxProjectNum(newMaxProjectNum);
              setSuccess('Your project has been created!.');
            } catch (error) {
              console.error(error);
              setError('An error occurred while creating a project.');
            }
            onClose();
          }}
        >
          Create project
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;
