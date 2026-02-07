import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Participant } from '../types/participant'
import { mockParticipants } from '../data/mockParticipants'

interface ParticipantState {
  participants: Participant[]
  setParticipants: (participants: Participant[]) => void
  updateParticipant: (id: string, changes: Partial<Participant>) => void
}

const CURRENT_STORE_VERSION = 8; 

export const useParticipantStore = create<ParticipantState>()(
  persist(
    (set) => ({
      participants: mockParticipants,
      setParticipants: (participants) => set({ participants }),
      updateParticipant: (id, changes) => set((state) => ({
        participants: state.participants.map((p) => 
          p.id === id ? { ...p, ...changes } : p
        )
      })),
    }),
    {
      name: 'participant-storage',
      version: CURRENT_STORE_VERSION,
      migrate: (persistedState, version) => {
        if (version < CURRENT_STORE_VERSION) {
          return {
            participants: mockParticipants
          } as ParticipantState; 
        }
        return persistedState as ParticipantState;
      },
    }
  )
)