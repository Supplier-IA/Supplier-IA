const chat = document.getElementById("chat");
const themeToggle = document.getElementById("themeToggle");
const logo = document.getElementById("logo");
 
let isDark = true;
 
// Troca de tema
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  isDark = !isDark;
  themeToggle.textContent = isDark ? "🌙" : "☀️";
});
 
// Função criar mensagem
function createMessage(text, sender) {
  const container = document.createElement("div");
  container.classList.add("msg-container", sender);

  const img = document.createElement("img");
  img.src = sender === "bot" ? "IMG/bot.png" : "IMG/user.png";
  img.classList.add("avatar");

  const bubble = document.createElement("div");
  bubble.classList.add("message", sender);
  bubble.innerHTML = text;

  container.appendChild(img);
  container.appendChild(bubble);
  chat.appendChild(container);
  chat.scrollTop = chat.scrollHeight;
}
 
// Animação digitando
function typingAnimation(callback) {
  const container = document.createElement("div");
  container.classList.add("msg-container", "bot");
 
  const img = document.createElement("img");
  img.src = "IMG/bot.png";
  img.classList.add("avatar", "typing-avatar"); // classe para girar
 
  const bubble = document.createElement("div");
  bubble.classList.add("message", "bot", "typing");
 
  // Animação digitando...
  let dots = "";
  let interval = setInterval(() => {
    dots = dots.length < 3 ? dots + "." : "";
    bubble.textContent = dots;
  }, 300);
 
  container.appendChild(img);
  container.appendChild(bubble);
  chat.appendChild(container);
 
  // Remove e mostra a mensagem
  setTimeout(() => {
    clearInterval(interval);
    container.remove();
    callback();
 
    // Rotação do avatar
    img.classList.remove("typing-avatar");
  }, 900);
}
 
// Fluxo de perguntas/respostas
const data = {
  inicio: {
    pergunta: "Como posso ajudar?",
    opcoes: ["Portfólio", "Implantações", "CAP",]
  },
  Portfólio: {
    pergunta: "Sobre Portfólio?",
    opcoes: ["Qual é o papel da área?", "Onde abrir um chamado?", "Como faço uma solicitação?", "Onde encontro o One Page?", "Onde encontro materiais de apoio?"],
    respostas: {
      "Qual é o papel da área?": '<img src="IMG/portfolioTema.jpg" width="250" style="margin-top:10px;border-radius:10px;"><br> A área de Portfólio é responsável pelas configurações dos parceiros após a implantação.',
      "Onde abrir um chamado?": 'Você pode abrir o chamado ultilizando o <a href="https://helpprodutos.supplier.com.br/new_ticket.aspx" target="_blank" style="color:#A3D65C;">Help Produtos</a>',
      "Como faço uma solicitação?": 'Assista ao vídeo explicativo abaixo:<br><iframe width="300" height="170" style="margin-top:10px;border-radius:10px;" src="IMG/AbrirChamadoHelp.mp4" title="Tutorial" frameborder="0" allowfullscreen></iframe>',
      "Onde encontro o One Page?": 'Baixe o One Page <a href="https://intranet.supplier.com.br/wp-content/uploads/2025/10/onepage-20102025.xlsm" target="_blank" style="color:#A3D65C;"> Aqui!</a>',
      "Onde encontro materiais de apoio?" : 'Os materiais de apoio estão disponíveis <a href="https://www.suppliermais.com.br" target="_blank" style="color:#A3D65C;"> Aqui!</a>',
    }
  },
  Implantações: {
    pergunta: "Sobre Implantações:",
    opcoes: ["Qual é o papel da área?", "Onde encontro os procedimentos?", "Como faço uma solicitação?", "Onde encontro materiais de apoio?",],
    respostas: {
      "Qual é o papel da área?": '<img src="IMG/implantacaoTema.png" width="250" style="margin-top:10px;border-radius:10px;"><br>A área de Implantações é responsável pelas implantações dos parceiros em diferentes produtos.',
      "Onde encontro os procedimentos?": ' Os procedimentos da área estão disponíveis <a href="https://www.suppliermais.com.br" target="_blank" style="color:#A3D65C;"> Aqui!</a>',
      "Como faço uma solicitação?": 'Assista ao vídeo explicativo abaixo:<br><iframe width="300" height="170" style="margin-top:10px;border-radius:10px;" src="IMG/AbrirChamadoHelp.mp4" title="Tutorial" frameborder="0" allowfullscreen></iframe>',
      "Onde encontro materiais de apoio?" :  'Os materiais de apoio estão disponíveis <a href="https://www.suppliermais.com.br" target="_blank" style="color:#A3D65C;"> Aqui!</a>',
    }
  },
  CAP: {
    pergunta: "Sobre CAP:",
    opcoes: ["Qual é o papel da área?", "Onde encontro os procedimentos?", "Onde encontro materiais de apoio?", "Como acessar a área de dados?"],
    respostas: {
      "Qual é o papel da área?": '<img src="IMG/CapTema.png" width="250" style="margin-top:10px;border-radius:10px;"><br>A área de CAP atua antes das implantações dos parceiros, apoiando o time de Hurtes em assuntos relacionados à implantação durante a prospecção dos leads.',
      "Onde encontro os procedimentos?": ' Os procedimentos da área estão disponíveis <a href="https://www.suppliermais.com.br" target="_blank" style="color:#A3D65C;"> Aqui!</a>',
      "Onde encontro materiais de apoio?" : 'Os materiais de apoio estão disponíveis <a href="https://www.suppliermais.com.br" target="_blank" style="color:#A3D65C;"> Aqui!</a>',
      "Como acessar a área de dados?" : 'Entre  <a href="https://www.suppliermais.com.br" target="_blank" style="color:#A3D65C;"> Aqui!</a>',
    }
  },
  
};
 
function startChat() {
  typingAnimation(() => {
    createMessage(data.inicio.pergunta, "bot");
    showOptions(data.inicio.opcoes, "inicio");
  });
}
 
function showOptions(options, context) {
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options-container");
 
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("message", "user");
 
    btn.onclick = () => {
      createMessage(opt, "user"); // histórico
      optionsContainer.remove(); // remove opções
      handleSelection(opt, context);
    };
 
    optionsContainer.appendChild(btn);
  });
 
  chat.appendChild(optionsContainer);
  chat.scrollTop = chat.scrollHeight;
}
 
function handleSelection(option, context) {
  if (context === "inicio") {
    typingAnimation(() => {
      createMessage(data[option].pergunta, "bot");
      showOptions(data[option].opcoes, option);
    });
  } else {
    typingAnimation(() => {
      createMessage(data[context].respostas[option], "bot");
 
      // Botão voltar ao início
      const restartBtn = document.createElement("button");
      restartBtn.textContent = "Voltar ao início";
      restartBtn.classList.add("message", "user");
      restartBtn.onclick = () => {
        chat.innerHTML = "";
        startChat();
      };
 
      chat.appendChild(restartBtn);
      chat.scrollTop = chat.scrollHeight;
    });
  }
}
 
// Inicia o chat

startChat();