const stories = [
  {id:"vipera", title:"A VÍPERA DONNA", genre:["Drama","Máfia"], episodeCount:20, episodes:"20 episódios", cover:"capa-vipera-donna.jpeg", desc:"A Justiça da Madrasta na Máfia. Traição, poder e vingança. Ela foi julgada, mas agora é quem decide o destino.", tag:"EM ALTA", bonus:"Bônus exclusivo da história."},
  {id:"chamas", title:"ENTRE CHAMAS E ESCAMAS", genre:["Fantasia","Romance"], episodeCount:18, episodes:"18 episódios", cover:"capa-entre-chamas-e-escamas.jpeg", desc:"Uma história de fantasia, romance e drama em meio a mistérios que vão mudar seu destino.", tag:"NOVIDADE", bonus:"Cenas e conteúdos extras da história."},
  {id:"segredos", title:"Segredos do Passado", genre:["Mistério","Drama"], episodeCount:16, episodes:"16 episódios", cover:"capa-vipera-donna.jpeg"},
  {id:"preco", title:"O Preço da Liberdade", genre:["Drama","Romance"], episodeCount:14, episodes:"14 episódios", cover:"capa-entre-chamas-e-escamas.jpeg"},
  {id:"amor", title:"Amor Proibido", genre:["Romance"], episodeCount:12, episodes:"12 episódios", cover:"capa-vipera-donna.jpeg"},
  {id:"heranca", title:"Herança de Sangue", genre:["Drama","Mistério"], episodeCount:15, episodes:"15 episódios", cover:"capa-vipera-donna.jpeg"},
  {id:"mundos", title:"Entre Dois Mundos", genre:["Fantasia","Romance"], episodeCount:10, episodes:"10 episódios", cover:"capa-entre-chamas-e-escamas.jpeg"}
];


const featured = document.querySelector("#featuredGrid");
const catalog = document.querySelector("#catalog");
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const detailCover = document.querySelector("#detailCover");
const detailMeta = document.querySelector("#detailMeta");
const detailBenefits = document.querySelector("#detailBenefits");
const episodeCount = document.querySelector("#episodeCount");
const episodeList = document.querySelector("#episodeList");

function featuredCard(s){
  return `<article class="featured-card" data-story="${s.id}">
    <img class="cover" src="${s.cover}" alt="Capa de ${s.title}">
    <div class="featured-info">
      <span class="tag">${s.tag}</span>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <div class="meta">◉ ${s.episodes} &nbsp; • &nbsp; 🎁 Bônus</div>
      <button class="buy" data-story="${s.id}">Ver detalhes e comprar</button>
    </div>
  </article>`;
}
function storyCard(s){
  return `<article class="story-card" data-story="${s.id}">
    <img src="${s.cover}" alt="Capa de ${s.title}">
    <div class="story-info"><h3>${s.title}</h3><p>${s.episodes}</p>
    <button class="mini-buy" data-story="${s.id}">Ver novelinha — R$ 5</button></div>
  </article>`;
}
function render(filter="Todos"){
  const list = filter==="Todos" ? stories : stories.filter(s=>s.genre.includes(filter));
  featured.innerHTML = stories.slice(0,2).filter(s=>filter==="Todos" || s.genre.includes(filter)).map(featuredCard).join("");
  catalog.innerHTML = list.map(storyCard).join("");
  document.querySelectorAll("[data-story]").forEach(el=>{
    el.addEventListener("click",(e)=>{
      if(e.target.closest("button") || e.currentTarget===el) openDetail(el.dataset.story);
    });
  });
}
function openDetail(id){
  const s = stories.find(x=>x.id===id);
  if(!s) return;
  modalTitle.textContent = s.title;
  modalText.textContent = s.desc;
  detailCover.src = s.cover;
  detailCover.alt = `Capa de ${s.title}`;
  detailMeta.innerHTML = `<span>${s.episodes}</span><span>•</span><span>${s.genre.join(" • ")}</span>`;
  detailBenefits.innerHTML = `
    <li>✓ Acesso a todos os ${s.episodeCount} episódios</li>
    <li>✓ Bônus: ${s.bonus || "conteúdo extra da história."}</li>
    <li>✓ Acesso individual, sem incluir outras novelinhas</li>`;
  episodeCount.textContent = `${s.episodeCount} episódios`;
  episodeList.innerHTML = Array.from({length:s.episodeCount},(_,i)=>
    `<div class="episode-row"><span>Episódio ${i+1}</span><span class="locked">🔒</span></div>`
  ).join("");
  modal.classList.remove("hidden");
}
document.querySelector("#closeModal").onclick=()=>modal.classList.add("hidden");
modal.addEventListener("click",e=>{if(e.target===modal) modal.classList.add("hidden")});
document.querySelector("#demoBuy").onclick=()=>{
  alert("Demonstração: o pagamento real será conectado nesta próxima etapa. A compra será vinculada somente a esta novelinha.");
};
document.querySelector("#loginBtn").onclick=()=>alert("Área de login — será conectada na etapa de conta e acesso.");
document.querySelector("#searchBtn").onclick=()=>document.querySelector("#catalogo").scrollIntoView({behavior:"smooth"});
document.querySelectorAll(".genre").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".genre").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  render(btn.dataset.filter);
}));
document.querySelector("#newsletterForm").addEventListener("submit",e=>{
  e.preventDefault();
  alert("Cadastro demonstrativo realizado!");
  e.target.reset();
});
render();
