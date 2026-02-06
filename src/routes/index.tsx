import { createFileRoute } from '@tanstack/react-router';
import { ParticipantList } from '../components/participants/ParticipantList';
import { mockParticipants } from '../data/mockParticipants';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ParticipantList items={mockParticipants} />
    </div>
  );
}