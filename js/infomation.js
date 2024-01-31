import { infoData, skillStack, edu, siteData } from "./infoData.js";

console.log(infoData, skillStack, edu);

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

let siteCode = '';
siteData.forEach((x,i)=>{
  siteCode = `
    <ul>
      <li><em>${x['tit']}</em></li>
      <li><em>${x['content'].replace('^','<br>')}</em></li>
      <li><em>${x['period']}</em></li>
      <li>${x['tech'].map(v=>`<i>${v}</i>`).join('')}</li>
      <li>
        <div>
          <img src='${x['imgsrc']}' alt=${x['tit']}>
        </div>
        <div>
          <i><a href="${x['link1']}">바로가기</a></i>
          <i><a href="${x['link2']}">가이드문서</a></i>
        </div>
      </li>
    </ul>
  `;
  document.querySelector(`.box-${i+1}`).innerHTML += siteCode;
});

