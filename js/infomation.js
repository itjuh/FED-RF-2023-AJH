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
      <li><em class='big-font'>${x['content'].replace('^','<br>')}</em></li>
      <li><em class='mini-font'>제작기간 : ${x['period']}</em></li>
      <li>${x['tech'].map(v=>`<i>${v}</i>`).join('')}</li>
      <li>
        <a href="${x['link1']}">
          <img src='${x['imgsrc']}' alt=${x['tit']}>
        </a>
        <div class='link-btn'>
          <i><a href="${x['link1']}">바로가기</a></i>
          ${
            x['link2'] ?
            `<i><a href='${x['link2']}'>가이드문서</a></i>`
            :
            ``
          }
        </div>
      </li>
    </ul>
  `;
  document.querySelector(`.box-${i+1}`).innerHTML += siteCode;
});

