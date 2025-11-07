// Elementos DOM
const popup = document.getElementById('popup');
const nomeInput = document.getElementById('nomeInput');
const entrarBtn = document.getElementById('entrarBtn');
const usuarioNome = document.getElementById('usuarioNome');
const msgInput = document.getElementById('msgInput');
const enviarBtn = document.getElementById('enviarBtn');
const messages = document.getElementById('messages');
const historico = document.getElementById('historico');
const limparBtn = document.getElementById('limpar');
const aMais = document.getElementById('aMais');
const aMenos = document.getElementById('aMenos');
const temaBtn = document.getElementById('temaBtn');
const falarBtn = document.getElementById('falarBtn');
const historicoBtn = document.getElementById('historicoBtn');
const sidebar = document.getElementById('sidebar');
const fecharHistorico = document.getElementById('fecharHistorico');

let tamanhoFonte = 16;
let temaEscuro = true;

// --- LOGIN ---
entrarBtn.addEventListener('click', () => {
  const nome = nomeInput.value.trim();
  if (nome) {
    usuarioNome.textContent = `Usuário: ${nome}`;
    popup.classList.add('hidden');
  }
});

// --- ENVIAR MENSAGEM ---
enviarBtn.addEventListener('click', enviarMensagem);
msgInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') enviarMensagem();
});

function enviarMensagem() {
  const msg = msgInput.value.trim();
  if (!msg) return;

  adicionarMensagem(usuarioNome.textContent, msg, 'user');
  salvarHistorico(msg);
  msgInput.value = '';

  // Resposta simulada da EVA
  setTimeout(() => {
    adicionarMensagem('EVA', '💬 Estou processando sua mensagem, Ka!', 'bot');
  }, 600);
}

function adicionarMensagem(remetente, texto, tipo) {
  const div = document.createElement('div');
  div.classList.add('message', tipo);
  const data = new Date().toLocaleString('pt-BR');
  div.innerHTML = `<strong>${remetente}</strong> - <small>${data}</small><br>${texto}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// --- HISTÓRICO ---
function salvarHistorico(texto) {
  const item = document.createElement('div');
  item.textContent = texto;
  item.classList.add('hist-item');

  item.addEventListener('click', () => {
    messages.innerHTML = '';
    adicionarMensagem(usuarioNome.textContent, texto, 'user');
  });

  historico.appendChild(item);
}

// Limpar histórico
limparBtn.addEventListener('click', () => {
  historico.innerHTML = '';
});

// Botão do histórico (toggle)
historicoBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Botão fechar histórico
fecharHistorico.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

// --- AJUSTE DE FONTE ---
aMais.addEventListener('click', () => {
  tamanhoFonte += 1;
  messages.style.fontSize = `${tamanhoFonte}px`;
});
aMenos.addEventListener('click', () => {
  tamanhoFonte -= 1;
  messages.style.fontSize = `${tamanhoFonte}px`;
});

// --- TEMA ---
temaBtn.addEventListener('click', () => {
  temaEscuro = !temaEscuro;
  document.body.style.background = temaEscuro
    ? "url('https://wallpapercave.com/wp/wp2757874.gif') no-repeat center center/cover"
    : "#fff";
});

// --- RECONHECIMENTO DE VOZ ---
falarBtn.addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Seu navegador não suporta reconhecimento de voz.');
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.start();

  recognition.onresult = (event) => {
    const texto = event.results[0][0].transcript;
    msgInput.value = texto;
    enviarMensagem();
  };

  recognition.onerror = (e) => {
    console.error(e);
    alert('Não foi possível reconhecer a voz.');
  };
});