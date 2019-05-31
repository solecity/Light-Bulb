import axios from "axios";

export default () => {
    return axios.create({
        baseURL: "http://localhost:3000/"
    })
}

/*function getCourses() {
    var resultElement = document.getElementById('getResult1');
    resultElement.innerHTML = '';
    axios.get('http://jsonplaceholder.typicode.com/todos')
    .then(function (response) {
        resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(function (error) {
        resultElement.innerHTML = generateErrorHTMLOutput(error);
    });
}*/

async function getUser() {
    try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

function getCourses(){
    let tempCourses = []

    axios.get('https://teste-ginasio-diogof98.c9users.io/').then(res => {
      tempCourses = res.data
      console.log(res.data);
    });
}

function getTags(){
    let tempTags = []

    axios.get('https://teste-ginasio-diogof98.c9users.io/').then(res => {
      tempTags = res.data
      console.log(res.data);
    });
}