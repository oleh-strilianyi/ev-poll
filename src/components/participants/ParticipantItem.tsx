import type { Participant } from '../../types/participant';

interface ParticipantItemProps {
  data: Participant;
}

export const ParticipantItem = ({ data }: ParticipantItemProps) => {
  return (
    <div className="p-3 border border-gray-200 rounded bg-white shadow-sm">
      <span className="font-medium text-gray-800">{data.name}</span>
    </div>
  );
};