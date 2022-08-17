import add from "./test";

const root = document.getElementById('root');

const element = document.createElement('div');
element.innerHTML = String(add(232,43));
root.appendChild(element);

console.log(element.innerHTML);