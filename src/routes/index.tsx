import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ParticipantList } from '../components/participants/ParticipantList';
import { mockParticipants } from '../data/mockParticipants';
import type { Participant } from '../types/participant';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ParticipantList 
        items={participants} 
        onReorder={setParticipants}
      />
    </div>
  );
}