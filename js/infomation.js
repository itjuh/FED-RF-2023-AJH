import { infoData, skillStack } from "./infoData.js";

console.log(infoData, skillStack);

let htmlCode = "";
for (let x in infoData) {
    htmlCode += `
    <div class="group-info ${x}">
    <div class="group-title">
    <h2>${x}</h2>
    </div>
    <ul>
    ${
        x === "Skills"
            ? infoData[x]
                  .map((v) => `<li><b>${v}</b> <ol>${skillStack[v].map((value) => `<li> - ${value}</li>`).join("")}</ol></li>`)
                  .join("")
            : infoData[x].map((v) => `<li>${v}</li>`).join("")
    }
    </ul>
    </div>`;
}

document.querySelector(".info-me").innerHTML += htmlCode;
