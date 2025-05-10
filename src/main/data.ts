import Store from 'electron-store'

const store = new Store()
store.set('unicorn', 'format')
console.log(store.get('unicorn'))
