const stories = [
  {id:"vipera", title:"A VÍPERA DONNA", genre:["Drama","Máfia"], episodeCount:20, episodes:"20 episódios", cover:"capa-vipera-donna.jpeg", desc:"A Justiça da Madrasta na Máfia. Traição, poder e vingança. Ela foi julgada, mas agora é quem decide o destino.", tag:"EM ALTA", bonus:"Bônus exclusivo da história."},
 {id:"chamas", title:"ENTRE CHAMAS E ESCAMAS", genre:["Fantasia","Romance"], episodeCount:18, episodes:"18 episódios", cover:"capa-entre-chamas-e-escamas.jpeg", desc:"Um romance cercado por segredos, perigos e um destino que pode mudar tudo."},
{id:"dragao", title:"ME REJEITE, REI DRAGÃO", genre:["Fantasia","Romance","Drama"], episodeCount:1, episodes:"Episódio único", cover:"capa-me-rejeite-rei-dragao.jpg", desc:"Uma história de amor, rejeição e destino, onde nada é o que parece."},
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
  return `<article class="featured-tcard" data-story="${s.id}">
    <img class="cover" src="${s.cover}" alt="Capa de ${s.title}">
    <div class="featured-info">
      <span class="tag">${s.tag}</span>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <div class="meta">◉ História completa &nbsp; • &nbsp; 
      <button class="buy" data-story="${s.id}">Ver detalhes e comprar</button>
    </div>
  </article>`;
}
function storyCard(s){
  return `<article class="story-card" data-story="${s.id}">
    <img src="${s.cover}" alt="Capa de ${s.title}">
    <div class="meta">• História completa &nbsp; 
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
  const s = stories.find(x => x.id === id);
  if(!s) return;

  modalTitle.textContent = s.title;
  modalText.textContent = s.desc;
  detailCover.src = s.cover;
  detailCover.alt = `Capa de ${s.title}`;

  detailMeta.innerHTML = `
    <span>História completa</span>
    <strong>R$ 5,00</strong>
  `;

  detailBenefits.innerHTML = `
    <li>História completa da novelinha</li>
    <li>Acesso individual a esta novelinha</li>
  `;

  episodeCount.textContent = "";
  episodeList.innerHTML = "";

  modal.classList.remove("hidden");
}

document.querySelector("#closeModal").onclick = () => {
  modal.classList.add("hidden");
};

modal.addEventListener("click", e => {
  if(e.target === modal){
    modal.classList.add("hidden");
  }
});
document.addEventListener("click", (e) => {
  const btn = e.target.closest("#demoBuy");

  if (!btn) return;

  window.location.href = "https://link.picpay.com/p/17898585596aaf12ff19cc2";
});

    
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
