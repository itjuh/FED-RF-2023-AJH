import { infoData, skillStack, edu } from "./infoData.js";

console.log(infoData, skillStack, edu);

let htmlCode = "";
for (let x in infoData) {
  htmlCode += `
  0000000000000000000
    <div class="group-info ${x}">
    <div class="group-title">
    <h2>${x}</h2>
    </div>
    <ul>
    ${
      x === "Skills"
        ? infoData[x]
            .map(
              (v) => `<li><b>${v}</b> <ol>${skillStack[v].map((value) => `<li> - ${value}</li>`).join("")}</ol></li>`
            )
            .join("")
        : x === "Education"
        ? infoData[x]
            .map((v) => `<li><b>${v}</b> <ol>${edu[v].map((value) => `<li> ${value}</li>`).join("")}</ol></li>`)
            .join("")
        : infoData[x].map((v) => `<li>${v}</li>`).join("")
    }
    </ul>
    </div>`;
}

document.querySelector(".info-me").innerHTML += htmlCode;
