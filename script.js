// === 1. ГЕНЕРАЦИЯ КОНТЕНТА ===
function generateContent() {
    const render = (id, data, template) => {
        const el = document.getElementById(id);
        if(el) el.innerHTML = data.map((item, index) => template(item, index)).join('');
    };

    render('features-grid', featuresData, item => `
        <div class="text-card tilt-element fade-in-up">
            <div class="feature-icon-wrapper">${item.icon}</div>
            <h3 class="text-xl font-bold text-primary mb-3">${item.title}</h3>
            <p class="text-gray-500 leading-relaxed text-sm">${item.desc}</p>
        </div>
    `);

    render('communities-grid', communitiesData, item => `
        <div class="text-card tilt-element fade-in-up cursor-pointer flex flex-col justify-between hover:border-gray-900 transition-colors" onclick="window.location.href='chat.html?room=${item.id}'">
            <div>
                <div class="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4">${item.category}</div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">${item.title}</h3>
                <p class="text-gray-500 text-sm mb-6">${item.desc}</p>
            </div>
            <div class="flex items-center justify-between text-sm border-t border-gray-200 pt-4 mt-auto">
                <span class="text-gray-900 font-bold">Войти в сообщество &rarr;</span>
            </div>
        </div>
    `);

    render('interactive-grid', interactiveData, item => `
        <div class="text-card tilt-element fade-in-up cursor-pointer flex flex-col justify-between border border-gray-200 hover:border-gray-900 transition-colors" onclick="window.location.href='${item.link}'">
            <div>
                <div class="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span class="live-dot"></span> ${item.type}
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">${item.title}</h3>
                <p class="text-gray-500 text-sm mb-6">${item.desc}</p>
            </div>
            <div class="flex items-center justify-between text-sm border-t border-gray-200 pt-4 mt-auto">
                <span class="text-gray-900 font-bold">Участвовать &rarr;</span>
            </div>
        </div>
    `);

    render('events-list', eventsData, item => `
        <div class="text-card tilt-element fade-in-up p-0 flex flex-col sm:flex-row border-gray-200 transition-colors" style="cursor: default;">
            <div class="bg-gray-50 border-b sm:border-b-0 sm:border-r border-gray-200 p-6 flex flex-col justify-center items-center min-w-[140px]">
                <span class="text-4xl font-bold text-gray-900">${item.date}</span>
                <span class="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-1">${item.month}</span>
            </div>
            <div class="p-6 flex-grow">
                <div class="text-xs font-bold text-gray-900 mb-2 uppercase tracking-widest">${item.time}</div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">${item.title}</h3>
                <p class="text-gray-500 text-sm mb-4">${item.desc}</p>
                <div class="text-sm font-medium text-gray-500">Ведущий: <span class="text-gray-900">${item.host}</span></div>
            </div>
        </div>
    `);
}

// === 2. ЧТЕНИЕ СТАТЕЙ ===
function loadArticle(index) {
    currentArticleIndex = index;
    const container = document.getElementById('article-content');
    if(!container) return; 

    const article = articlePages[index] || articlePages[0];
    
    container.style.opacity = 0;
    container.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        container.innerHTML = `
            <div class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">${article.category} • 7 мин чтения</div>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">${article.title}</h1>
            <div class="text-lg text-gray-700 leading-relaxed space-y-6" id="article-body">
                ${article.content}
            </div>
        `;
        
        container.style.opacity = 1;
        
        const headerElements = container.querySelectorAll(':scope > div:first-child, :scope > h1');
        const bodyElements = container.querySelectorAll('#article-body > *');
        const allElements = [...headerElements, ...bodyElements];
        
        allElements.forEach(el => {
            el.classList.add('fade-in-up');
            el.classList.remove('show');
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        requestAnimationFrame(() => {
            allElements.forEach((el, i) => {
                setTimeout(() => el.classList.add('show'), i * 100); 
            });
        });
        
    }, 300); 
}

function loadNextArticle() {
    const nextIndex = (currentArticleIndex + 1) % articlePages.length;
    window.location.hash = nextIndex; 
    loadArticle(nextIndex);
}

// === 3. ДВУСТОРОННИЙ АВТОПЕРЕВОДЧИК ===
async function translateText(text, langpair) {
    try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`);
        const data = await res.json();
        return data.responseData.translatedText;
    } catch (err) {
        return text; 
    }
}

// === 4. ЛОГИКА ЧАТА ===
async function appendSingleMessage(msg, index = 0, isInitialLoad = false, roomId = currentRoomId) {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const isSent = msg.type === 'sent';
    let displayContent = msg.content;

    if (!isSent && msg.lang && msg.lang !== 'ru') {
        const translated = await translateText(msg.content, `${msg.lang}|ru`);
        displayContent = `<span class="block border-b border-gray-100 pb-1 mb-1 opacity-60 text-[11px] italic">${msg.content}</span>${translated}`;
    }

    if (isSent && roomLangs[roomId]) {
        const targetLang = roomLangs[roomId];
        const translated = await translateText(msg.content, `ru|${targetLang}`);
        displayContent = `<span class="block border-b border-white/20 pb-1 mb-1 opacity-80 text-[11px] italic">${msg.content}</span>${translated}`;
    }

    const msgHtml = `
    <div class="flex flex-col mb-4 ${isSent ? 'items-end' : 'items-start'} fade-in-up">
        <div class="text-xs text-gray-500 mb-1">${msg.name}, ${msg.time}</div>
        <div class="${isSent ? 'bg-primary text-white rounded-tr-sm' : 'bg-white text-gray-900 border border-gray-200 rounded-tl-sm'} rounded-2xl px-5 py-3 max-w-[85%] text-sm shadow-sm relative group">
            ${displayContent}
        </div>
    </div>
    `;

    container.insertAdjacentHTML('beforeend', msgHtml);
    const lastMsg = container.lastElementChild;

    const delay = isInitialLoad ? index * 60 : 10;
    setTimeout(() => {
        lastMsg.classList.add('show');
        container.scrollTop = container.scrollHeight;
    }, delay);
}

function loadChatRoom(roomId) {
    const room = allChatRooms[roomId];
    if(!room) return;
    
    document.getElementById('chat-header-title').textContent = room.title;
    document.getElementById('chat-header-desc').textContent = room.desc;

    const container = document.getElementById('chat-messages-container');
    container.innerHTML = ''; 

    room.messages.forEach((msg, index) => {
        appendSingleMessage(msg, index, true, roomId);
    });
}

function initChat() {
    const sidebar = document.getElementById('chat-sidebar-list');
    if (!sidebar) return;

    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get('room');
    
    if (roomParam && allChatRooms[roomParam] && !activeChatRooms.includes(roomParam)) {
        activeChatRooms.unshift(roomParam);
    }

    function createRoomHTML(key) {
        const room = allChatRooms[key];
        return `
            <div class="chat-room-item group relative p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-300 flex items-center gap-4 border border-transparent hover:border-gray-200 hover:-translate-y-0.5" data-room="${key}">
                <div class="w-10 h-10 rounded-full bg-gray-100 text-gray-900 text-xs font-bold flex items-center justify-center shrink-0 border border-gray-200">${room.icon}</div>
                <div class="flex-1 overflow-hidden">
                    <div class="font-bold text-gray-900 text-sm truncate">${room.title}</div>
                    <div class="text-xs text-gray-500 truncate">${room.desc}</div>
                </div>
                <button class="delete-room-btn absolute right-3 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-900 transition-all bg-white rounded-full p-1 border border-gray-200 hover:scale-110" data-room="${key}" title="Удалить чат">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        `;
    }

    function renderSidebar() {
        sidebar.innerHTML = activeChatRooms.map(key => createRoomHTML(key)).join('');
        bindRoomEvents();
    }

    renderSidebar();

    if(activeChatRooms.length > 0) {
        document.querySelector(`.chat-room-item[data-room="${activeChatRooms[0]}"]`).click();
    } else {
        document.getElementById('chat-messages-container').innerHTML = '<div class="text-center text-gray-500 mt-10">Нет активных чатов. Нажмите + чтобы добавить.</div>';
    }

    function bindRoomEvents() {
        document.querySelectorAll('.chat-room-item').forEach(item => {
            item.onclick = function(e) {
                if (e.target.closest('.delete-room-btn')) return; 
                document.querySelectorAll('.chat-room-item').forEach(r => r.classList.remove('bg-gray-50', 'border-gray-200'));
                this.classList.add('bg-gray-50', 'border-gray-200');
                
                currentRoomId = this.getAttribute('data-room');
                loadChatRoom(currentRoomId);
            };
        });

        document.querySelectorAll('.delete-room-btn').forEach(btn => {
            btn.onclick = function(e) {
                e.stopPropagation();
                const roomId = this.getAttribute('data-room');
                const roomEl = document.querySelector(`.chat-room-item[data-room="${roomId}"]`);
                
                roomEl.style.setProperty('--current-height', roomEl.offsetHeight + 'px');
                roomEl.classList.add('chat-item-exit');
                
                setTimeout(() => {
                    activeChatRooms = activeChatRooms.filter(r => r !== roomId);
                    if (currentRoomId === roomId) currentRoomId = null;
                    roomEl.remove();
                    
                    if (activeChatRooms.length > 0) {
                        document.querySelector('.chat-room-item').click();
                    } else {
                        document.getElementById('chat-messages-container').innerHTML = '<div class="text-center text-gray-500 mt-10">Нет активных чатов. Нажмите + чтобы добавить.</div>';
                        document.getElementById('chat-header-title').textContent = 'Чаты удалены';
                        document.getElementById('chat-header-desc').textContent = 'Выберите новую комнату';
                    }
                }, 400); 
            };
        });
    }

    const addBtn = document.getElementById('chat-add-btn');
    const modal = document.getElementById('add-room-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const modalList = document.getElementById('modal-rooms-list');

    if(addBtn && modal) {
        addBtn.onclick = () => {
            const available = Object.keys(allChatRooms).filter(k => !activeChatRooms.includes(k));
            if(available.length === 0) {
                modalList.innerHTML = '<p class="text-center text-gray-500 text-sm py-4">Вы уже добавили все доступные комнаты.</p>';
            } else {
                modalList.innerHTML = available.map(key => {
                    const r = allChatRooms[key];
                    return `
                        <div class="p-3 border border-gray-200 rounded-xl hover:border-gray-900 hover:-translate-y-1 hover:shadow-sm transition-all cursor-pointer flex items-center gap-3 add-specific-room" data-room="${key}">
                            <div class="text-xs font-bold w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full border border-gray-200">${r.icon}</div>
                            <div>
                                <div class="font-bold text-sm text-gray-900">${r.title}</div>
                                <div class="text-xs text-gray-500">${r.desc}</div>
                            </div>
                        </div>
                    `;
                }).join('');

                document.querySelectorAll('.add-specific-room').forEach(el => {
                    el.onclick = function() {
                        const newRoomId = this.getAttribute('data-room');
                        activeChatRooms.unshift(newRoomId);
                        modal.classList.remove('active');
                        
                        const html = createRoomHTML(newRoomId);
                        sidebar.insertAdjacentHTML('afterbegin', html);
                        const newItem = sidebar.firstElementChild;
                        newItem.classList.add('chat-item-enter');
                        
                        bindRoomEvents();
                        newItem.click();
                        setTimeout(() => newItem.classList.remove('chat-item-enter'), 500);
                    };
                });
            }
            modal.classList.add('active');
        };

        closeBtn.onclick = () => modal.classList.remove('active');
        modal.onclick = (e) => { if(e.target === modal) modal.classList.remove('active'); };
    }

    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');

    async function sendMessage() {
        if (!currentRoomId || !chatInput.value.trim()) return;

        const text = chatInput.value.trim();
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        const activeRoom = currentRoomId; 

        chatInput.value = ''; 

        const newMessage = { type: 'sent', name: 'Вы', time: timeStr, content: text };
        allChatRooms[activeRoom].messages.push(newMessage);
        await appendSingleMessage(newMessage, 0, false, activeRoom);

        setTimeout(async () => {
            const replyTime = new Date();
            const replyTimeStr = replyTime.getHours().toString().padStart(2, '0') + ':' + replyTime.getMinutes().toString().padStart(2, '0');
            
            const botLang = roomLangs[activeRoom] || 'en';
            const botName = botNames[activeRoom] || 'Собеседник';
            
            const fakeReplies = [
                "Звучит отлично! Я полностью согласен.",
                "Ого, не знал об этом. Расскажи подробнее?",
                "Это очень интересная мысль.",
                "Да, именно так мы тут и живем!",
                "Хаха, точно подмечено."
            ];
            const randomReply = fakeReplies[Math.floor(Math.random() * fakeReplies.length)];
            
            const nativeText = await translateText(randomReply, `ru|${botLang}`);
            
            const botMsg = { type: 'received', name: botName, time: replyTimeStr, content: nativeText, lang: botLang };
            allChatRooms[activeRoom].messages.push(botMsg);
            
            if (currentRoomId === activeRoom) {
                await appendSingleMessage(botMsg, 0, false, activeRoom);
            }
        }, 2500); 
    }

    if (chatSendBtn && chatInput) {
        chatSendBtn.onclick = sendMessage;
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
}

// === 5. ЛОГИКА QUIZ (БЛИЦ) ===
function initQuiz() {
    const qContainer = document.getElementById('quiz-container');
    if(!qContainer) return;
    
    function renderQ() {
        if(currentQuizQ >= quizQuestions.length) {
            qContainer.innerHTML = `
                <div class="text-center py-10 fade-in-up show">
                    <div class="text-5xl mb-4 text-gray-900"></div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Блиц завершен!</h2>
                    <p class="text-gray-500 mb-6">Ваш результат: <strong class="text-gray-900 text-xl">${quizScore} из ${quizQuestions.length}</strong> правильных ответов.</p>
                    <div class="tilt-hitbox inline-block">
                        <button onclick="window.location.href='communities.html'" class="tilt-inner bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition shadow-sm">Вернуться в сообщества</button>
                    </div>
                </div>
            `;
            initTiltEffect();
            return;
        }

        const q = quizQuestions[currentQuizQ];
        qContainer.innerHTML = `
            <div class="fade-in-up show">
                <div class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex justify-between">
                    <span>Вопрос ${currentQuizQ + 1} из ${quizQuestions.length}</span>
                    <span class="text-gray-900">Баллы: ${quizScore}</span>
                </div>
                <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-snug">${q.q}</h3>
                <div class="space-y-3">
                    ${q.options.map((opt, i) => `
                        <button onclick="handleAnswer(this, ${i}, ${q.correct})" class="w-full text-left p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-900 hover:shadow-md transition-all font-medium text-gray-700">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderQ();
    
    window.handleAnswer = (btn, selected, correct) => {
        const buttons = btn.parentElement.querySelectorAll('button');
        buttons.forEach(b => {
            b.disabled = true;
            b.classList.remove('hover:border-gray-900', 'hover:shadow-md');
        }); 
        
        const originalText = btn.textContent.trim();

        if(selected === correct) {
            btn.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
            btn.innerHTML = `${originalText} — <span class="font-bold">Верно!</span>`;
            quizScore++;
        } else {
            btn.classList.add('bg-gray-100', 'text-gray-400', 'border-gray-200', 'line-through');
            btn.innerHTML = `${originalText} (Неверно)`;
            
            const correctBtn = buttons[correct];
            const correctText = correctBtn.textContent.trim();
            correctBtn.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
            correctBtn.innerHTML = `${correctText} — Правильный ответ!`;
        }
        
        setTimeout(() => {
            currentQuizQ++;
            renderQ();
        }, 1500);
    };
}

// Запасная функция для старого HTML Стрима (не удаляем, чтобы избежать ошибок)
window.handleStreamPoll = (btn, isCorrect) => {
    const container = document.getElementById('poll-container');
    if (!container) return;
    const buttons = container.querySelectorAll('button');
    const scoreBadge = document.getElementById('stream-score-display');
    
    buttons.forEach(b => {
        b.disabled = true;
        b.classList.remove('hover:border-gray-900', 'hover:-translate-y-1', 'hover:shadow-sm');
    });
    
    const originalText = btn.textContent;

    if(isCorrect) {
        btn.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
        btn.innerHTML = `${originalText} — <span class="font-bold">Верно! +10</span>`;
        if(scoreBadge) scoreBadge.innerHTML = `Баллы: 10`;
    } else {
        btn.classList.add('bg-gray-100', 'text-gray-400', 'border-gray-200', 'line-through');
        btn.innerHTML = `${originalText} (Неверно)`;
        
        const correctBtn = buttons[1];
        correctBtn.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
        correctBtn.innerHTML = `${correctBtn.textContent} — Правильный ответ!`;
    }
};

// === 6. ИНТЕРАКТИВ И АНИМАЦИИ ===
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.closest('#article-body')) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

function initTiltEffect() {
    const elements = document.querySelectorAll('.tilt-element');
    elements.forEach(el => {
        if (el.dataset.tiltInit) return;
        el.dataset.tiltInit = true;

        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const intensity = 1.5; 
            const rotateX = ((y - centerY) / centerY) * -intensity; 
            const rotateY = ((x - centerX) / centerX) * intensity;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
        });
    });

    const hitboxes = document.querySelectorAll('.tilt-hitbox');
    hitboxes.forEach(hitbox => {
        if (hitbox.dataset.tiltInit) return;
        hitbox.dataset.tiltInit = true;
        
        const inner = hitbox.querySelector('.tilt-inner');
        if(!inner) return;

        hitbox.addEventListener('mousemove', e => {
            const rect = hitbox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const intensity = 2; 
            const rotateX = ((y - centerY) / centerY) * -intensity; 
            const rotateY = ((x - centerX) / centerX) * intensity;
            
            inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        hitbox.addEventListener('mouseleave', () => {
            inner.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    });
}

// === 7. ЛОКАЛЬНАЯ БАЗА ДАННЫХ И УВЕДОМЛЕНИЯ ===
window.handleRegistration = function(event) {
    event.preventDefault(); 
    
    const checkbox = document.getElementById('terms-checkbox');
    if (checkbox && !checkbox.checked) return; 
    
    localStorage.setItem('isRegistered', 'true');
    
    const toast = document.createElement('div');
    toast.className = 'fixed top-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-[100] transition-all duration-500 opacity-0 translate-x-10';
    
    toast.innerHTML = `
    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    <div class="font-medium text-white">Успешно! Добро пожаловать.</div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('opacity-0', 'translate-x-10');
    }, 10);
    
    const btn = event.target.querySelector('button[type="submit"]');
    if(btn) {
        btn.innerHTML = '<span class="animate-pulse">Перенаправление...</span>';
        btn.classList.add('bg-gray-800');
        btn.disabled = true; 
    }

    setTimeout(() => {
        window.location.href = 'communities.html';
    }, 1500);
};

function checkAuthStatus() {
    const isRegistered = localStorage.getItem('isRegistered');
    
    if (isRegistered === 'true') {
        const regLinks = document.querySelectorAll('a[href="register.html"]');
        
        regLinks.forEach(link => {
            if (link.textContent.trim() === 'Присоединиться') {
                const wrapper = link.closest('.tilt-hitbox');
                if (wrapper) wrapper.style.display = 'none';
            }
            if (link.textContent.trim() === 'Начать общение') {
                link.textContent = 'Мои сообщества';
                link.href = 'communities.html';
            }
        });
    }
}

function updateNavState() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 10) nav.classList.add('nav-scrolled');
        else nav.classList.remove('nav-scrolled');
    }
}

window.addEventListener('scroll', updateNavState);

document.getElementById('mobile-menu-button')?.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// === 8. ЗАПУСК ВСЕХ СКРИПТОВ ===
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    updateNavState(); 
    
    // Проверка, подключен ли data.js
    if (typeof featuresData !== 'undefined') {
        generateContent(); 
    }
    
    if (typeof allChatRooms !== 'undefined') {
        initChat(); 
    }
    
    if (document.getElementById('quiz-container') && typeof quizQuestions !== 'undefined') {
        initQuiz();
    }
    
    if(document.getElementById('article-content') && typeof articlePages !== 'undefined') {
        const hash = window.location.hash.replace('#', '');
        loadArticle(hash ? parseInt(hash) : 0);
    }
    
    setTimeout(() => {
        initScrollAnimations();
        initTiltEffect();
    }, 100);
});