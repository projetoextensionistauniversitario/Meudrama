const stories = [
  {id:"vipera", title:"A VÍPERA DONNA", genre:["Drama","Máfia"], episodes:"20 episódios", cover:"capa-vipera-donna.jpeg", desc:"A Justiça da Madrasta na Máfia. Traição, poder e vingança. Ela foi julgada, mas agora é quem decide o destino.", tag:"EM ALTA"},
  {id:"chamas", title:"ENTRE CHAMAS E ESCAMAS", genre:["Fantasia","Romance"], episodes:"18 episódios", cover:"capa-entre-chamas-e-escamas.jpeg", desc:"Uma história de fantasia, romance e drama em meio a mistérios que vão mudar seu destino.", tag:"NOVIDADE"},
  {id:"segredos", title:"Segredos do Passado", genre:["Mistério","Drama"], episodes:"16 episódios", cover:"capa-vipera-donna.jpeg"},
  {id:"preco", title:"O Preço da Liberdade", genre:["Drama","Romance"], episodes:"14 episódios", cover:"capa-entre-chamas-e-escamas.jpeg"},
  {id:"amor", title:"Amor Proibido", genre:["Romance"], episodes:"12 episódios", cover:"capa-vipera-donna.jpeg"},
  {id:"heranca", title:"Herança de Sangue", genre:["Drama","Mistério"], episodes:"15 episódios", cover:"capa-vipera-donna.jpeg"},
  {id:"mundos", title:"Entre Dois Mundos", genre:["Fantasia","Romance"], episodes:"10 episódios", cover:"capa-entre-chamas-e-escamas.jpeg"}
];

const featured = document.querySelector("#featuredGrid");
const catalog = document.querySelector("#catalog");
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");

function featuredCard(s){
  return `<article class="featured-card">
    <img class="cover" src="${s.cover}" alt="Capa de ${s.title}">
    <div class="featured-info">
      <span class="tag">${s.tag}</span>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <div class="meta">◉ ${s.episodes} &nbsp; • &nbsp; 🎁 Bônus</div>
      <button class="buy" data-buy="${s.title}">Assistir por R$ 5,00</button>
    </div>
  </article>`;
}
function storyCard(s){
  return `<article class="story-card">
    <img src="${s.cover}" alt="Capa de ${s.title}">
    <div class="story-info"><h3>${s.title}</h3><p>${s.episodes}</p>
    <button class="mini-buy" data-buy="${s.title}">Comprar por R$ 5</button></div>
  </article>`;
}
function render(filter="Todos"){
  const list = filter==="Todos" ? stories : stories.filter(s=>s.genre.includes(filter));
  featured.innerHTML = stories.slice(0,2).filter(s=>filter==="Todos" || s.genre.includes(filter)).map(featuredCard).join("");
  catalog.innerHTML = list.map(storyCard).join("");
  document.querySelectorAll("[data-buy]").forEach(btn=>{
    btn.addEventListener("click",()=>openBuy(btn.dataset.buy));
  });
}
function openBuy(title){
  modalTitle.textContent = `Acesso: ${title}`;
  modal.classList.remove("hidden");
}
document.querySelector("#closeModal").onclick=()=>modal.classList.add("hidden");
modal.addEventListener("click",e=>{if(e.target===modal) modal.classList.add("hidden")});
document.querySelector("#demoBuy").onclick=()=>alert("Demonstração: aqui será conectado o pagamento real e, após a confirmação, o acesso será liberado somente para esta novelinha.");
document.querySelector("#loginBtn").onclick=()=>alert("Área de login — será conectada na próxima etapa.");
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
