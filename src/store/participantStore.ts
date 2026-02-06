import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Participant } from '../types/participant'
import { mockParticipants } from '../data/mockParticipants'

interface ParticipantState {
  participants: Participant[]
  setParticipants: (participants: Participant[]) => void
}

export const useParticipantStore = create<ParticipantState>()(
  persist(
    (set) => ({
      participants: mockParticipants,
      setParticipants: (participants) => set({ participants }),
    }),
    {
      name: 'participant-storage',
    }
  )
)