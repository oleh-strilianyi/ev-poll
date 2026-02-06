import type { Participant } from '../../types/participant';
import { ParticipantItem } from './ParticipantItem';

interface ParticipantListProps {
  items: Participant[];
}

export const ParticipantList = ({ items }: ParticipantListProps) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md mx-auto p-4">
      {items.map((item) => (
        <ParticipantItem key={item.id} data={item} />
      ))}
    </div>
  );
};