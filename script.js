// Login system
function showLogin() {
    document.getElementById('login-modal').style.display = 'flex';
}

function hideLogin() {
    document.getElementById('login-modal').style.display = 'none';
}

function showRegister() {
    document.getElementById('register-modal').style.display = 'flex';
}

function hideRegister() {
    document.getElementById('register-modal').style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const saved = JSON.parse(localStorage.getItem('userData') || '{}');
    if (saved.username === username && saved.password === password) {
        loadUserData(saved);
        hideLogin();
        showApp();
        return false;
    }
    
    if (username === 'Ania' && password === '123') {
        hideLogin();
        showApp();
        return false;
    }
    
    alert('Nieprawidłowe dane logowania!\nPoprawne dane:\nKonto: Ania\nHasło: 123');
    return false;
}

function handleRegister(event) {
    event.preventDefault();
    const userData = {
        username: document.getElementById('reg-username').value,
        email: document.getElementById('reg-email').value,
        password: document.getElementById('reg-password').value,
        boldness: document.getElementById('boldness-level').value,
        bio: document.getElementById('reg-bio').value || 'Nowy użytkownik Buddy Welcome'
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('loggedIn', 'true');
    loadUserData(userData);
    hideRegister();
    showApp();
    return false;
}

// Poprawione opisy poziomu śmiałości
const boldnessDescriptions = {
    '1': {
        short: 'bardzo introwertyczny',
        full: '🤐 Bardzo nieśmiały/a – preferuję kontakt online i działanie solo',
        hint: 'Dopasujemy Cię do spokojnych wydarzeń online i mentora rozumiejącego introwertyzm.'
    },
    '2': {
        short: 'introwertyczny',
        full: '😌 Nieśmiały/a – najlepiej czuję się w grupach 2-3 osoby',
        hint: 'Polecamy małe grupy, ciche spotkania i stopniową integrację.'
    },
    '3': {
        short: 'raczej spokojny',
        full: '🙂 Raczej nieśmiały/a – komfortowo w grupach do 5 osób',
        hint: 'Znajdziesz u nas mikro-grupy i wydarzenia dostosowane do Twojego tempa.'
    },
    '4': {
        short: 'umiarkowanie spokojny',
        full: '😊 Nieco nieśmiały/a – lubię małe, kameralne wydarzenia',
        hint: 'Doskonały balans – spotkania 5-8 osób i opcjonalne większe wydarzenia.'
    },
    '5': {
        short: 'zbalansowany',
        full: '😌 Zbalansowany/a – zarówno ciche jak i aktywne spotkania są OK',
        hint: 'Pełna elastyczność – polecamy różnorodne wydarzenia i grupy.'
    },
    '6': {
        short: 'umiarkowanie otwarty',
        full: '😄 Nieco śmiały/a – większe grupy są w porządku',
        hint: 'Oprócz małych grup polecamy warsztaty i wydarzenia do 15 osób.'
    },
    '7': {
        short: 'otwarty',
        full: '😁 Śmiały/a – lubię większe wydarzenia i nowe znajomości',
        hint: 'Polecamy aktywne grupy, warsztaty i wydarzenia integracyjne.'
    },
    '8': {
        short: 'bardzo otwarty',
        full: '🤗 Bardzo śmiały/a – duże wydarzenia mnie energetyzują',
        hint: 'Większe integracje, organizacja wydarzeń i aktywna rola w społeczności.'
    },
    '9': {
        short: 'ekstrawertyczny',
        full: '🎉 Ekstrawertyk/czka – uwielbiam tłumy i aktywność',
        hint: 'Możesz zostać liderem grupy lub organizować własne wydarzenia!'
    },
    '10': {
        short: 'bardzo ekstrawertyczny',
        full: '🔥 Mega śmiały/a – chcę organizować i angażować innych!',
        hint: 'Idealne dla liderów społeczności – pomożemy Ci tworzyć wydarzenia dla innych.'
    }
};

function loadUserData(userData) {
    document.getElementById('welcome-name').textContent = userData.username;
    document.getElementById('profile-name').textContent = userData.username;
    document.getElementById('profile-bio').textContent = userData.bio;
    document.querySelector('.profile-view .avatar.huge').textContent = userData.username[0].toUpperCase();
    
    const boldnessLevel = userData.boldness || '5';
    const boldnessInfo = boldnessDescriptions[boldnessLevel];
    
    if (boldnessInfo) {
        document.getElementById('boldness-display').textContent = boldnessInfo.full;
    } else {
        document.getElementById('boldness-display').textContent = 'Poziom: ' + boldnessLevel + '/10';
    }
}

function showApp() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    updateBlockedList();
}

function logout() {
    document.getElementById('app').style.display = 'none';
    document.getElementById('landing-page').style.display = 'block';
    showScreen('zapoznania');
}

// JEDEN wspólny DOMContentLoaded - tutaj cała inicjalizacja
document.addEventListener('DOMContentLoaded', () => {
    // Slider śmiałości
    const slider = document.getElementById('boldness-level');
    if (slider) {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('boldness-value').textContent = value;
            
            const boldnessInfo = boldnessDescriptions[value];
            if (boldnessInfo) {
                const descElement = document.getElementById('boldness-description');
                if (descElement) {
                    descElement.textContent = boldnessInfo.short;
                }
                
                const hintElement = document.querySelector('.boldness-hint');
                if (hintElement) {
                    hintElement.innerHTML = `<strong>${boldnessInfo.full}</strong><br>${boldnessInfo.hint}`;
                }
            }
        });
        
        // Ustaw początkowy opis przy załadowaniu strony
        const initialValue = slider.value;
        const initialInfo = boldnessDescriptions[initialValue];
        if (initialInfo) {
            const descElement = document.getElementById('boldness-description');
            if (descElement) {
                descElement.textContent = initialInfo.short;
            }
            
            const hintElement = document.querySelector('.boldness-hint');
            if (hintElement) {
                hintElement.innerHTML = `<strong>${initialInfo.full}</strong><br>${initialInfo.hint}`;
            }
        }
    }
    
    // High contrast toggle
    const hcBtn = document.getElementById('high-contrast-toggle');
    if (hcBtn) {
        hcBtn.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            const isHC = document.body.classList.contains('high-contrast');
            localStorage.setItem('highContrast', isHC);
            hcBtn.textContent = isHC ? 'Kontrast: Wysoki' : 'Kontrast: Normalny';
        });
        
        if (localStorage.getItem('highContrast') === 'true') {
            document.body.classList.add('high-contrast');
            hcBtn.textContent = 'Kontrast: Wysoki';
        }
    }
    
    updateBlockedList();
});

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

// Chat data
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

// Zmienna śledząca skąd otwarto czat
let chatReturnScreen = 'czat';

// POPRAWIONA funkcja openChat - zapamiętuje ekran źródłowy
function openChat(name, fromScreen) {
    if (fromScreen) {
        chatReturnScreen = fromScreen;
    } else {
        chatReturnScreen = 'czat';
    }
    
    showScreen('czat');
    setTimeout(() => openChatWindow(name), 100);
}

function openChatWindow(name) {
    const blocked = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
    if (blocked.includes(name)) {
        alert('Ten użytkownik jest zablokowany.');
        return;
    }
    
    document.querySelector('.chat-list').style.display = 'none';
    document.getElementById('chat-window').style.display = 'flex';
    document.getElementById('chat-title').textContent = name;
    loadChatMessages(name);
}

function loadChatMessages(name) {
    const messagesContainer = document.querySelector('.chat-messages');
    messagesContainer.innerHTML = '';
    
    const messages = chatData[name] || [];
    messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${msg.type}`;
        msgDiv.innerHTML = `<p>${msg.text}</p><span class="time">${msg.time}</span>`;
        messagesContainer.appendChild(msgDiv);
    });
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// POPRAWIONA funkcja closeChatWindow - wraca do zapamiętanego ekranu
function closeChatWindow() {
    document.getElementById('chat-window').style.display = 'none';
    
    if (chatReturnScreen === 'czat') {
        document.querySelector('.chat-list').style.display = 'block';
    } else {
        // Wróć do ekranu źródłowego (np. mentoring)
        showScreen(chatReturnScreen);
        chatReturnScreen = 'czat'; // Reset
    }
}

// Expanded icebreakers (25+)
const icebreakers = [
    "Co lubisz robić w wolnym czasie?",
    "Jaki jest Twój ulubiony film lub serial?",
    "Gdybyś mógł/mogła nauczyć się czegoś nowego, co by to było?",
    "Jakie miejsce na uczelni najbardziej Ci się podoba?",
    "Co najbardziej Cię zaskoczyło w pierwszym tygodniu studiów?",
    "Jaka jest Twoja ulubiona gra lub książka?",
    "Jakiej supermocy byś chciał/a mieć?",
    "Co sprawia, że czujesz się zrelaksowany/a?",
    "Jaka muzyka Cię relaksuje?",
    "Gdybyś mógł/mogła pojechać gdziekolwiek, dokąd byś pojechał/a?",
    "Jaki jest Twój ulubiony sposób na spędzenie wieczoru?",
    "Co Cię motywuje do nauki?",
    "Ulubione danie z dzieciństwa?",
    "Najlepsza rada, jaką dostałeś/aś?",
    "Hobby, które chciałbyś/abyś spróbować?",
    "Idealny dzień wolny wygląda jak?",
    "Książka, która zmieniła Twoje życie?",
    "Najzabawniejsza wpadka na studiach?",
    "Co Cię relaksuje po ciężkim dniu?",
    "Ulubiony cytat lub motto?",
    "Gdybyś mógł/a zmienić jedną rzecz w uczelni, co by to było?",
    "Najlepsze wspomnienie z wakacji?",
    "Co Cię inspiruje w programowaniu/studiach?",
    "Ulubiona kawa czy herbata?",
    "Zwierzę domowe - masz, chciałbyś/abyś?"
];

function randomIcebreaker() {
    const text = icebreakers[Math.floor(Math.random() * icebreakers.length)];
    document.getElementById('icebreaker-text').textContent = `"${text}"`;
}

// Block users feature
function blockUser(user) {
    let blocked = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
    if (!blocked.includes(user)) {
        blocked.push(user);
        localStorage.setItem('blockedUsers', JSON.stringify(blocked));
        alert(`${user} został zablokowany.`);
        updateBlockedList();
        hideBlockedUsers();
    }
}

function clearBlocks() {
    if (confirm('Czy na pewno chcesz odblokować wszystkich użytkowników?')) {
        localStorage.removeItem('blockedUsers');
        alert('Wszystkie blokady zostały usunięte.');
        updateBlockedList();
        showAllUsers();
    }
}

function updateBlockedList() {
    const blocked = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
    const listEl = document.getElementById('blocked-list');
    if (listEl) {
        if (blocked.length === 0) {
            listEl.innerHTML = '<li style="color: var(--muted)">Brak zablokowanych użytkowników</li>';
        } else {
            listEl.innerHTML = blocked.map(u => `<li>🚫 ${u} <button onclick="unblockUser('${u}')" class="btn-small">Odblokuj</button></li>`).join('');
        }
    }
    hideBlockedUsers();
}

function unblockUser(user) {
    let blocked = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
    blocked = blocked.filter(u => u !== user);
    localStorage.setItem('blockedUsers', JSON.stringify(blocked));
    alert(`${user} został odblokowany.`);
    updateBlockedList();
    showAllUsers();
}

function hideBlockedUsers() {
    const blocked = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
    document.querySelectorAll('.chat-item, .profile-card').forEach(item => {
        const userName = item.getAttribute('data-user') || item.querySelector('h4')?.textContent.trim();
        if (blocked.includes(userName)) {
            item.style.display = 'none';
        }
    });
}

function showAllUsers() {
    document.querySelectorAll('.chat-item, .profile-card').forEach(item => {
        item.style.display = '';
    });
    hideBlockedUsers();
}

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
        closeChatWindow();
    }
});
