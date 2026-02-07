import { createFileRoute } from '@tanstack/react-router';
import { ParticipantList } from '../components/participants/ParticipantList';
import { useParticipantStore } from '../store/participantStore';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { participants, setParticipants } = useParticipantStore();

  return (
    <ParticipantList 
      items={participants} 
      onReorder={setParticipants}
    />
  );
}