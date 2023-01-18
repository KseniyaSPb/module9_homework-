/*Задание 1.
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, 
который будет преобразовывать XML в JS-объект и выводить его в консоль.
 XML:
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
JS-объект:
{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/
//Решение

// Создание экземпляра класса DOMParser. Он позволит парсить XML
const parser = new DOMParser();
//
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

//строим ДОМ дерево
let xmlDom = parser.parseFromString(xmlString, "text/xml");

//получаем все ДОМ атрибуты
const studentNode = xmlDom.querySelector("student");
const nameNode = studentNode.querySelector("name");
const ageNode = studentNode.querySelector("age");
const profNode = studentNode.querySelector("prof");

const langAttr = nameNode.getAttribute('lang');

//создаем js объект
const result = {
  lang: langAttr,
  name: nameNode.textContent,
  age: ageNode.textContent,
  prof: profNode.textContent,
};
console.log(result);


/*Задание 2.
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать 
JSON в JS-объект и выводить его в консоль.
Const JSON=`
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`
JS-объект:
{
  list: [
    { name: 'Petr', age: 20, prof: 'mechanic' },
    { name: 'Vova', age: 60, prof: 'pilot' },
  ]
}*/

// json object
const jsonStr = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;
// let parse json to gforet data
let data = JSON.parse(jsonStr);

console.log(data);

/*Задание 3
Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. 
При клике на кнопку происходит следующее:
        ◦ Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10». 
        ◦ Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, 
        где get-параметр limit — это введённое число. 
Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.*/

let url = "https://picsum.photos/v2/list?limit=10";

function pageLoaded() {
  // получаем доступ к узлам
  const input = document.querySelector("#input");
  const btn = document.querySelector("#btn");
  const output = document.querySelector("#output");

  //вешаем событие на кнопку
  btn.addEventListener("click", sendRequest);

  //ф-я которая ввыводит в див сообщение
  function writeOutput(message) {
    output.innerText = message;
  }

  //ф-я проверки инпута 
  function validateInput() {
    let validated = true;
    if (input.value < 1 || input.value > 10 || isNaN(+input.value)) {
      validated = false;
      writeOutput('число вне диапазона от 1 до 10');
    }
    return validated;
  }
  //ф-я которая отправляет запрос
  function sendRequest() {
    // если инпут корректный отправляем запрос
    if (validateInput()) {
      //инициализировали запрос
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `https://picsum.photos/v2/list?limit=${input.value}&from=10&to=1`);
      //отправили запрос
      xhr.send();

      xhr.onerror = function () {
        writeOutput('При отправке запроса произошла ошибка');
      }

      xhr.onload = function () {
        if (xhr.status == 200) {
          let data = JSON.parse(xhr.response);
          writeOutput(`Ответ: ${data.contents.answer}`);
        }
      }
    }
  }

}
document.addEventListener("DOMContentLoaded", pageLoaded);

/*Задание 4
Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.
При клике на кнопку происходит следующее:
        ◦ Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст 
        «одно из чисел вне диапазона от 100 до 300»; 
        ◦ Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по 
        URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота. 
Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
После получения данных вывести ниже картинку на экран.*/

const input1 = document.querySelector("#input2-1").value;
  const input2 = document.querySelector("#input2-2").value;
  const btn2 = document.querySelector("#btn2");
  const output2 = document.querySelector("#output2");
  
  //вешаем событие на кнопку
  btn2.addEventListener("click", myClick);
    function myClick(){
          
  //проверки инпута 
  if (!(input1 >= 100 && input1 <= 300 && input2 >= 100 && input2 <= 300)) {
    output2.textContent = 'одно из чисел вне диапазона от 100 до 300';
    return;
  }
  // если инпут корректный отправляем запрос
    fetch(`https://picsum.photos/${input1}/${input2}`)
    .then((response) => {
      document.getElementById('output2').src = response.url;
    }); 
 }
