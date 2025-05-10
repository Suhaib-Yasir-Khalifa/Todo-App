import axios from 'axios';

const dataGetting = (): any => {

    axios.get('https://jsonplaceholder.typicode.com/todos').then((data) => {
        console.log(data)
    }).catch((err) => console.error(err))
}

export default dataGetting