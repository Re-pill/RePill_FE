import { create } from 'zustand'

export type PillType = {
  id: number
  name: string
  type: string
  dailyDose: number
  expirationDate: string
  notifyBefore: number[]
  isActive: boolean
}

export type PillStore = {
  pills: PillType[]
  setPills: (pills: PillType[]) => void
  setActive: (id: number, isActive: boolean) => void
  updatePill: (id: number, data: Partial<PillType>) => void
}

export const usePillStore = create<PillStore>((set) => ({
  pills: [
    {
      id: 1,
      name: '타이레놀',
      type: 'pill',
      dailyDose: 3,
      expirationDate: '2025.05.17',
      notifyBefore: [1],
      isActive: true,
    },
    {
      id: 2,
      name: '타이레놀',
      type: 'powder',
      dailyDose: 1,
      expirationDate: '2025.05.09',
      notifyBefore: [3, 7],
      isActive: false,
    },
    {
      id: 3,
      name: '아목사실린',
      type: 'etc',
      dailyDose: 2,
      expirationDate: '2025.05.25',
      notifyBefore: [5],
      isActive: false,
    },
  ],
  setPills: (pills: PillType[]) => set({ pills }),
  setActive: (id: number, isActive: boolean) =>
    set((state: PillStore) => ({
      pills: state.pills.map((pill) =>
        pill.id === id ? { ...pill, isActive } : pill
      ),
    })),
  updatePill: (id, data) =>
    set((state) => ({
      pills: state.pills.map((pill) =>
        pill.id === id ? { ...pill, ...data } : pill
      )
    }))
}))
