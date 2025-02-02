import{i as a,a as m,S as y}from"./assets/vendor-C_7oAj77.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const h="48551671-8e0bd0e05b8a9090cbea8e4d9";let l=1;async function f(i){const o="https://pixabay.com/api/";try{if(!i){a.error({title:"Error",message:"Please enter search request!",position:"topRight"});return}const s=await m.get(o,{params:{key:h,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:l}});return l+=1,s.data.hits}catch(s){return console.error("REQUEST ERROR",s),a.error({title:"Error",message:"Failed to fetch images. Please try again!",position:"topRight"}),[]}}function b(){l=1}function v(){l+=1}function g(){return l}function R(i){const o=document.getElementById("gallery");if(i.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const s=i.map(r=>`
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
  `).join("");o.insertAdjacentHTML("beforeend",s)}const d=document.getElementById("gallery"),c=document.querySelector(".pagebutton"),p=10,E=new y(".image-link",{captionsData:"alt",captionDelay:500});async function u(i,o){i.preventDefault();const s=document.getElementById("input").value.trim();if(!s){a.error({title:"Error",message:"Please enter search request!",position:"topRight"});return}o?(b(),d.innerHTML=""):v();const r=document.querySelector(".loader");r.style.visibility="visible";try{const e=await f(s);e.length===0?(a.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),c.style.visibility="hidden"):(R(e),E.refresh(),setTimeout(()=>{const t=document.querySelector(".image-card");if(t){const{height:n}=t.getBoundingClientRect();window.scrollBy({top:n*2,behavior:"smooth"})}},100),g()>=p&&(c.style.visibility="hidden",a.warning({title:"Warning",message:"You have reached the last page!",position:"topRight"})))}catch(e){console.error("RENDER ERROR",e),a.error({title:"Error",message:"Failed to load images. Please try again!",position:"topRight"})}finally{r.style.visibility="hidden",d.children.length>0&&g()<p?c.style.visibility="visible":c.style.visibility="hidden"}}document.getElementById("form").addEventListener("submit",i=>{u(i,!0)});document.getElementById("page-button").addEventListener("click",i=>{u(i,!1)});
//# sourceMappingURL=index.js.map
