let chave = "cebcd482eda57fa9a6714c1c2ba91885";

async function buscarCidade(cidade) {

    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        cidade +
        "&appid=" +
        chave +
        "&lang=pt_br" +
        "&units=metric"
    )
        .then(resposta => resposta.json())

    colocarNaTela(dados);

}

const input = document.querySelector('.input-cidade');

// busca cidade
function cliqueiNoBotao() {
    let cidade = input.value;
    buscarCidade(cidade);
}

// exibe na tela e altera background
function colocarNaTela(dados) {
    console.log(dados);
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".descricao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";

    if (dados.weather[0].description == "nublado" || dados.weather[0].description == "algumas nuvens" || dados.weather[0].description == "nuvens dispersas") {
        document.body.style.backgroundImage = "url('img/nublado.jpg')";
    } else if (dados.weather[0].description == "céu limpo" || dados.weather[0].description == "poucas nuvens") {
        document.body.style.backgroundImage = "url('img/sol.jpg')";
    } else if (dados.weather[0].description == "névoa" || dados.weather[0].description == "neblina") {
        document.body.style.backgroundImage = "url('img/nevoa.jpg')";
    } else if (dados.weather[0].description == "trovoadas") {
        document.body.style.backgroundImage = "url('img/tempestade.png')";
    } else if (dados.weather[0].description == "neve") {
        document.body.style.backgroundImage = "url('img/neve.png')";
    } else {
        document.body.style.backgroundImage = "url('img/chuva.jpg')";
    }

    input.value = '';
    sugestoes.innerHTML = '';
}

// buscar quando apertar enter
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        cliqueiNoBotao();
    }
});

// sugere nome de cidades/países
const opcoes = [
    "Brasil", "Estados Unidos", 
    "Canadá", "Mexico", "Reino Unido", 
    "França", "Alemanha", "Japão", 
    "China", "Índia", "Austrália", 
    "Rússia", "Argentina", "Chile", 
    "Espanha", "Italia", "Portugal",
    "Nova York", "Los Angeles", "Londres", 
    "Paris", "Tóquio", "Sydney", 
    "Rio de Janeiro", "Mumbai", "Pequim", 
    "Roma", "Berlim", "Cidade do México", 
    "Toronto", "Istambul", "Dubai", "Bangkok",
    "Santos", "Sao Vicente", "Orlando",
    "Miami", "Vancouver", "Quebec",
    "Salvador", "Fortaleza", "Las Vegas",
    "Roma", "New York", "Moscow"
];

const sugestoes = document.getElementById("sugestoes");

input.addEventListener("input", () => {
    const nome = input.value.toLowerCase();
    const opcoesFiltradas = opcoes.filter((opcao) => opcao.toLowerCase().includes(nome));
    
    sugestoes.innerHTML = '';

   if(opcoesFiltradas.length > 0){
    opcoesFiltradas.forEach(opcao => {
        const sugestao = document.createElement("p");
        sugestao.textContent = opcao;

        sugestao.addEventListener('click', () => {
            input.value = opcao;
            sugestoes.style.display = "none";
        });
        sugestoes.appendChild(sugestao);

        if(opcoesFiltradas.length == opcoes.length) {
            sugestoes.innerHTML = '';
        } 
    })
    sugestoes.style.display = "block";
   } else {
    sugestoes.style.display = "none"
   }
})






