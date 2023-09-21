import create, { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface StoreState {
  searchValue: string
}

const createStore: StateCreator<StoreState> = (set, get) => ({
  searchValue: '',

  getSearchValue: () => get().searchValue,

  setData: (searchValue: string) => {
    set({
      searchValue,
    })
  },
})

const store: StateCreator<StoreState> = createStore
devtools(store)
persist(store, { name: 'store' })

export default create(store)
