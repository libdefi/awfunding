import { ProjectCard } from './ProjectCard';

interface ProjectCardsProps {
  maxProjectNum: number;
}

export const ProjectCards = ({ maxProjectNum }: ProjectCardsProps) => {
  return (
    <div
      className="bg-white mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 mb-20"
      style={{ minHeight: '500px' }}
    >
      {Array.from({ length: maxProjectNum }, (_, i) => i + 1).map((projectNum) => (
        <ProjectCard key={projectNum} projectNum={projectNum} />
      ))}
    </div>
  );
};

export const abi = [
  {
    inputs: [],
    name: 'getMaxProjectId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
