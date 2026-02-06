import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware' // createJSONStorage опціонально, але корисно знати
import type { Participant } from '../types/participant'
import { mockParticipants } from '../data/mockParticipants'

interface ParticipantState {
  participants: Participant[]
  setParticipants: (participants: Participant[]) => void
}

const CURRENT_STORE_VERSION = 1;

export const useParticipantStore = create<ParticipantState>()(
  persist(
    
    (set) => ({
      participants: mockParticipants,
      setParticipants: (participants) => set({ participants }),
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