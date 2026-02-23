import{a as d,S as m,i as n}from"./assets/vendor-B5nsgUv9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const y="54763862-120f6024ab5c76e4f921b86ff",g="https://pixabay.com/api/";async function h(o){return(await d.get(g,{params:{key:y,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}const l=document.querySelector(".gallery"),u=document.querySelector(".loader"),b=new m(".gallery a",{captionsData:"alt",captionDelay:250});function L(o){const r=o.map(({webformatURL:s,largeImageURL:a,tags:e,likes:t,views:i,comments:f,downloads:p})=>`
      <li class="gallery-item">
        <a href="${a}">
          <img src="${s}" alt="${e}" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${t}</p>
          <p><b>Views</b> ${i}</p>
          <p><b>Comments</b> ${f}</p>
          <p><b>Downloads</b> ${p}</p>
        </div>
      </li>
    `).join("");l.insertAdjacentHTML("beforeend",r),b.refresh()}function v(){l.innerHTML=""}function w(){u.classList.add("is-visible")}function S(){u.classList.remove("is-visible")}const c=document.querySelector(".form");c.addEventListener("submit",async o=>{o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(!r){n.error({message:"Please enter a search query!",position:"topRight"});return}v(),w();try{const s=await h(r);if(s.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(s.hits)}catch{n.error({message:"Something went wrong. Try again later!",position:"topRight"})}finally{S(),c.reset()}});
//# sourceMappingURL=index.js.map
