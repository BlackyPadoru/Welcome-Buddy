// Login system
let registeredUsers = [
  { username: 'Ania', password: '123', name: 'Ania' }
];

function showLogin(event) {
  if (event) event.preventDefault();
  document.getElementById('login-modal').style.display = 'flex';
  document.getElementById('login-form').style.display = 'flex';
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('modal-title').textContent = 'Zaloguj się';
}

function showRegister(event) {
  if (event) event.preventDefault();
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'flex';
  document.getElementById('modal-title').textContent = 'Utwórz konto';
}

function hideLogin() {
  document.getElementById('login-modal').style.display = 'none';
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = registeredUsers.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', user.name);
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    
    // Zaktualizuj powitanie
    const greeting = document.querySelector('#zapoznania h2');
    if (greeting) {
      greeting.textContent = `Cześć, ${user.name}! 👋`;
    }
    
    return false;
  } else {
    alert('Nieprawidłowe dane logowania!');
    return false;
  }
}

function handleRegister(event) {
  event.preventDefault();
  
  const name = document.getElementById('reg-name').value;
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const kierunek = document.getElementById('reg-kierunek').value;
  const zainteresowania = document.getElementById('reg-zainteresowania').value;
  const smielosc = document.getElementById('reg-smielosc').value;
  const password = document.getElementById('reg-password').value;
  const passwordConfirm = document.getElementById('reg-password-confirm').value;

  // Walidacja
  if (password !== passwordConfirm) {
    alert('Hasła nie są identyczne!');
    return false;
  }

  if (registeredUsers.find(u => u.username === username)) {
    alert('Użytkownik o tej nazwie już istnieje!');
    return false;
  }

  // Dodaj użytkownika
  registeredUsers.push({
    username: username,
    password: password,
    name: name,
    email: email,
    kierunek: kierunek,
    zainteresowania: zainteresowania,
    smielosc: smielosc
  });

  alert(`Witaj ${name}! 🎉\nKonto zostało utworzone. Możesz się teraz zalogować.`);
  
  // Przełącz na formularz logowania
  showLogin();
  
  // Wypełnij dane logowania
  document.getElementById('username').value = username;
  document.getElementById('password').value = password;

  return false;
}

function updateSmielosc(value) {
  const stars = '⭐'.repeat(value);
  document.getElementById('smielosc-display').textContent = stars;
}

function logout() {
  localStorage.removeItem('currentUser');
  document.getElementById('app').style.display = 'none';
  document.getElementById('landing-page').style.display = 'block';
  showScreen('zapoznania');
}


// Screen navigation
function showScreen(screenName) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));
  
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(t => t.classList.remove('active'));
  
  document.getElementById(screenName).classList.add('active');
  
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// TUTAJ JEST NAJWAŻNIEJSZA CZĘŚĆ - Dane czatów
const chatData = {
  'Julia Kowalska': [
    { type: 'received', text: 'Cześć! Jak tam pierwszy tydzień? 😊', time: '10:23' },
    { type: 'sent', text: 'Hej! Trochę przytłaczająco, ale jakoś daję radę 😅', time: '10:25' },
    { type: 'received', text: 'Wiem, na początku tak jest. Ale szybko się przyzwyczaisz! Jeśli coś, pisz śmiało 💪', time: '10:26' },
    { type: 'sent', text: 'Dzięki! Mam pytanie o projekt z programowania...', time: '10:28' },
    { type: 'received', text: 'Jasne, pytaj! O który projekt chodzi?', time: '10:29' }
  ],
  'Grupa: Informatycy 1. rok': [
    { type: 'received', text: 'Marek: Ktoś ma notatki z dzisiejszych zajęć?', time: '14:12' },
    { type: 'received', text: 'Kasia: Ja mam! Wyślę za chwilę 📝', time: '14:14' },
    { type: 'sent', text: 'Super! Ja byłam nieobecna, bardzo by się przydały', time: '14:15' },
    { type: 'received', text: 'Kasia: [plik] Notatki_Algorytmy_09.12.pdf', time: '14:16' },
    { type: 'received', text: 'Tomek: Dzięki Kasia! 🙏', time: '14:17' },
    { type: 'sent', text: 'Dziękuję bardzo! ❤️', time: '14:18' }
  ],
  'Marek': [
    { type: 'received', text: 'Hej, idziesz na kawę w sobotę?', time: '18:45' },
    { type: 'sent', text: 'Cześć! Tak, planuję iść na to spotkanie z grami planszowymi', time: '18:50' },
    { type: 'received', text: 'Super! Ja też będę. Lubisz Catan?', time: '18:52' },
    { type: 'sent', text: 'Nie grałam jeszcze, ale chętnie spróbuję! 😊', time: '18:54' },
    { type: 'received', text: 'Świetnie! To będzie fajnie, pokażę Ci zasady', time: '18:55' }
  ]
};

// Chat functions
function openChat(name) {
  showScreen('czat');
  setTimeout(() => openChatWindow(name), 100);
}

function openChatWindow(name) {
  document.querySelector('.chat-list').style.display = 'none';
  document.getElementById('chat-window').style.display = 'flex';
  document.getElementById('chat-title').textContent = name;
  
  // TA FUNKCJA ŁADUJE WŁAŚCIWE WIADOMOŚCI
  loadChatMessages(name);
}

function loadChatMessages(name) {
  const messagesContainer = document.querySelector('.chat-messages');
  messagesContainer.innerHTML = ''; // Wyczyść poprzednie wiadomości
  
  const messages = chatData[name] || [];
  
  messages.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${msg.type}`;
    msgDiv.innerHTML = `
      <p>${msg.text}</p>
      <span class="time">${msg.time}</span>
    `;
    messagesContainer.appendChild(msgDiv);
  });
  
  // Scroll do dołu
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function closeChatWindow() {
  document.querySelector('.chat-list').style.display = 'block';
  document.getElementById('chat-window').style.display = 'none';
}

// Icebreaker generator
const icebreakers = [
  "Co lubisz robić w wolnym czasie?",
  "Jaki jest Twój ulubiony film lub serial?",
  "Gdybyś mógł/mogła nauczyć się czegoś nowego, co by to było?",
  "Jakie miejsce na uczelni najbardziej Ci się podoba?",
  "Co najbardziej Cię zaskoczyło w pierwszym tygodniu studiów?",
  "Jaka jest Twoja ulubiona gra lub książka?",
  "Jakiego supermocy byś chciał/a mieć?",
  "Co sprawia, że czujesz się zrelaksowany/a?",
  "Jaka muzyka Cię relaksuje?",
  "Gdybyś mógł/mogła pojechać gdziekolwiek, dokąd byś pojechał/a?"
];

function randomIcebreaker() {
  const text = icebreakers[Math.floor(Math.random() * icebreakers.length)];
  document.getElementById('icebreaker-text').textContent = `"${text}"`;
}
