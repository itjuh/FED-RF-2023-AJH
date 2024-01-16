import { infoData, skillStack } from "./infoData.js";

console.log(infoData, skillStack);

let htmlCode = '';
for(let x in infoData){
    htmlCode += `
    <div class="group-info ${x}">
    <div class="group-title">
    <h2>${x}</h2>
    </div>
    <ul>
        ${infoData[x].map(v=>`<li>${v}</li>`).join('')}
    </ul>
    </div>`;
}

document.querySelector(".info-me").innerHTML += htmlCode;

