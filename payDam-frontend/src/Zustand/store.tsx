import { create } from 'zustand'

export const useStore   = create((set) => ({
    token : "",
    setToken : (tokentobeSet : string) => set({token : tokentobeSet}),
    removeToken : () => set({token : ""})
    
    //   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
}))
