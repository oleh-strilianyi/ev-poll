import { createFileRoute } from '@tanstack/react-router';
import { ParticipantList } from '../components/participants/ParticipantList';
import { useParticipantStore } from '../store/participantStore';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { participants, setParticipants } = useParticipantStore();

  return (
    <div className="min-h-screen bg-neutral-100">
      <ParticipantList 
        items={participants} 
        onReorder={setParticipants}
      />
    </div>
  );
}