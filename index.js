import{a as d,i as a,S as p}from"./assets/vendor-C_7oAj77.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m="48551671-8e0bd0e05b8a9090cbea8e4d9";let c=1;async function u(i){const s="https://pixabay.com/api/";try{return(await d.get(s,{params:{key:m,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:c}})).data.hits}catch(o){return console.error("REQUEST ERROR",o),a.error({title:"Error",message:"Failed to fetch images. Please try again!",position:"topRight"}),[]}}function y(){c=1}function f(){c+=1}function h(){return c}function b(i){const s=document.getElementById("gallery");if(i.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const o=i.map(r=>`
    <div class="image-card">
      <a href="${r.largeImageURL}" class="image-link">
        <img src="${r.webformatURL}" alt="${r.tags}" class="image" />
      </a>
      <div class="image-info">
        <p class="image-likes text">Likes</p>
        <p class="image-views text">Views</p>
        <p class="image-downloads text">Downloads</p>
        <p class="image-comments text">Comments</p>
        <p class="number">${r.likes}</p>
        <p class="number">${r.views}</p>
        <p class="number">${r.downloads}</p>
        <p class="number">${r.comments}</p>
      </div>
    </div>
  `).join("");s.insertAdjacentHTML("beforeend",o)}const v=document.getElementById("gallery"),l=document.querySelector(".pagebutton"),R=10,E=new p(".image-link",{captionsData:"alt",captionDelay:500});async function g(i,s){i.preventDefault();const o=document.getElementById("input").value.trim();if(!o){a.error({title:"Error",message:"Please enter search request!",position:"topRight"}),l.style.visibility="hidden";return}s?(y(),v.innerHTML=""):f();const r=document.querySelector(".loader");r.style.visibility="visible";try{const e=await u(o);e.length===0?(a.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),l.style.visibility="hidden"):(b(e),E.refresh(),s||setTimeout(()=>{const t=document.querySelector(".image-card");if(t){const{height:n}=t.getBoundingClientRect();window.scrollBy({top:n*2,behavior:"smooth"})}},100),e.length<15||h()>=R?(l.style.visibility="hidden",a.warning({title:"Warning",message:"You have reached the last page!",position:"topRight"})):l.style.visibility="visible")}catch(e){console.error("RENDER ERROR",e),a.error({title:"Error",message:"Failed to load images. Please try again!",position:"topRight"})}finally{r.style.visibility="hidden"}}document.getElementById("form").addEventListener("submit",i=>{g(i,!0)});l.addEventListener("click",i=>{g(i,!1)});
//# sourceMappingURL=index.js.map
