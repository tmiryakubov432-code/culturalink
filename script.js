// === 1. БАЗЫ ДАННЫХ ===
const featuresData = [
    { icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>`, title: 'Умный автопереводчик', desc: 'Общайтесь на родном языке — алгоритм переведет всё в реальном времени, сохраняя культурный контекст.' },
    { icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>`, title: 'Тематические комнаты', desc: 'Не ограничивайтесь изучением языков. Обсуждайте архитектуру, историю или рецепты блюд.' },
    { icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>`, title: 'Культурные лонгриды', desc: 'Узнавайте факты и глубоко погружайтесь в менталитет через авторские статьи от участников.' },
    { icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`, title: 'Безопасная среда', desc: 'Строгая модерация, верификация профилей и отсутствие ботов для качественного диалога.' }
];

const communitiesData = [
    { id: 'japanese', title: 'Сообщество Токио', desc: 'Обсуждаем японскую культуру, архитектуру и философию ваби-саби.', category: 'Япония' },
    { id: 'french', title: 'Сообщество Париж', desc: 'Мода, история Франции и секреты философии Joie de Vivre.', category: 'Франция' },
    { id: 'mexican', title: 'Сообщество Мехико', desc: 'Мексиканская кухня, национальные фестивали и традиции.', category: 'Мексика' },
    { id: 'italian', title: 'Сообщество Рим', desc: 'Архитектура, Искусство Ренессанса и итальянский образ жизни.', category: 'Италия' },
    { id: 'chinese', title: 'Сообщество Шанхай', desc: 'Китайская каллиграфия, технологии и концепция Гуаньси.', category: 'Китай' },
    { id: 'spanish', title: 'Сообщество Мадрид', desc: 'Долгие ужины, футбол и традиционная испанская сиеста.', category: 'Испания' }
];

const interactiveData = [
    { title: 'Мексиканская Кухня', desc: 'Угадайте секретный ингредиент такос на трансляции шефа Карлоса.', type: 'Стрим + Интерактив', link: 'stream.html' },
    { title: 'Глубокий Контекст', desc: 'Проверьте, насколько хорошо вы понимаете тонкости менталитета стран мира.', type: 'Блиц-задание', link: 'quiz.html' }
];

const eventsData = [
    { date: '28', month: 'Окт', title: 'Мастер-класс: Настоящие Такос', time: '19:00 МСК', host: 'Шеф Карлос', desc: 'Готовим аутентичную мексиканскую кухню в прямом эфире.' },
    { date: '02', month: 'Ноя', title: 'Введение в Ваби-Саби', time: '12:00 МСК', host: 'Акира Т.', desc: 'Лекция о поиске красоты в несовершенстве.' },
    { date: '05', month: 'Ноя', title: 'Языковой диалог', time: '20:00 МСК', host: 'Модератор', desc: 'Практика общения в небольших группах с носителями.' }
];

const allChatRooms = {
    'japanese': { title: 'Япония', desc: 'Токио, Киото', icon: 'JP', messages: [{ type: 'received', name: 'Такахиро', time: '14:25', content: 'Конничи ва! Обсуждаем Ханами.' }] },
    'brazilian': { title: 'Бразилия', desc: 'Рио, Сан-Паулу', icon: 'BR', messages: [{ type: 'received', name: 'Луис', time: '15:10', content: 'Ола! Как дела?' }] },
    'mexican': { title: 'Мексика', desc: 'Мехико', icon: 'MX', messages: [{ type: 'received', name: 'Карлос', time: '16:05', content: '¡Hola! Говорим о традициях.' }] },
    'italian': { title: 'Италия', desc: 'Рим, Милан', icon: 'IT', messages: [{ type: 'received', name: 'София', time: '12:00', content: 'Ciao! Обсуждаем Dolce Far Niente.' }] },
    'french': { title: 'Франция', desc: 'Париж, Лион', icon: 'FR', messages: [{ type: 'received', name: 'Жюльен', time: '10:30', content: 'Bonjour!' }] },
    'chinese': { title: 'Китай', desc: 'Пекин, Шанхай', icon: 'CN', messages: [{ type: 'received', name: 'Вэй', time: '09:15', content: 'Ни хао! Разбираем философию Гуаньси.' }] },
    'spanish': { title: 'Испания', desc: 'Мадрид, Барселона', icon: 'ES', messages: [{ type: 'received', name: 'Мария', time: '17:45', content: '¡Hola! Собремеса началась.' }] }
};

let activeChatRooms = [];
let currentRoomId = null;

// === ПОЛНЫЕ СТАТЬИ ===
const articlePages = [
    {
        category: 'Япония',
        title: 'Философия Ваби-Саби: почему японцы ищут красоту в несовершенстве',
        content: `
            <p>В западной культуре мы привыкли стремиться к идеалу: симметричные лица, новые вещи, безупречные достижения. Нам кажется, что если вещь поцарапана или сломана, её нужно немедленно заменить. Но в Японии существует совершенно иной подход к восприятию мира — философия <strong>Ваби-Саби</strong> (侘寂).</p>
            <p>Ваби-саби — это умение находить красоту в том, что неидеально, мимолетно и незакончено. Это старая деревянная дверь, покрытая мхом. Это чашка ручной работы с неровными краями, которая хранит тепло рук мастера. Это осенние листья, опадающие на землю.</p>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Кинцуги: искусство золотых шрамов</h2>
            <p>Самое яркое физическое воплощение этой философии — техника <em>кинцуги</em>. Когда любимая керамическая посуда разбивается, японские мастера не выбрасывают её. Вместо этого они аккуратно склеивают осколки специальным лаком, смешанным с настоящим золотым порошком.</p>
            <p>Вместо того чтобы скрывать трещины, кинцуги намеренно подчеркивает их. Вещь становится более красивой, уникальной и ценной именно благодаря своей истории, пережитому "разрушению" и последующему исцелению. Шрамы становятся предметом гордости, а не стыда.</p>
            <blockquote class="border-l-4 border-gray-900 pl-6 py-2 my-8 italic text-xl text-gray-700 bg-gray-50 rounded-r-xl">
                "Ничто не вечно, ничто не закончено и ничто не совершенно. В этом и заключается истинная свобода."
            </blockquote>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Как применить это в современной жизни?</h2>
            <p>В эпоху социальных сетей, где каждый транслирует безупречную, отретушированную картинку своей жизни, ваби-саби служит отличным противоядием от постоянной тревожности. Эта философия учит нас глубокому принятию.</p>
            <p>Она предлагает принимать себя со всеми нашими "трещинами" и недостатками. Ценить старые, потертые вещи, хранящие воспоминания, вместо бесконечной гонки за новыми трендами. Понимать, что увядание, старение и изменения — это естественная часть жизненного цикла, с которой не нужно бороться, её нужно уважать.</p>
        `
    },
    {
        category: 'Италия',
        title: 'Искусство Dolce Far Niente: радость ничегонеделания',
        content: `
            <p>Современный мир одержим продуктивностью. Мы чувствуем вину, если ничем не заняты, и пытаемся заполнить каждую свободную минуту прослушиванием подкастов, проверкой почты или планированием будущих задач. Итальянцы же возвели отдых в ранг национального искусства, назвав его <strong>Dolce Far Niente</strong> — «сладкое ничегонеделание».</p>
            <p>Важно понимать: это не лень, не апатия и не прокрастинация. Это глубоко осознанное наслаждение моментом без какой-либо цели и результата. Это способность сидеть за столиком на площади, наблюдая за прохожими, медленно пить эспрессо, слушать уличных музыкантов или просто смотреть на закат, не думая о дедлайнах.</p>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Остановка как жизненный ритуал</h2>
            <p>В Италии считается, что время, проведенное с удовольствием, априори не может быть потрачено зря. В отличие от других культур, где отдых нужно "заслужить" тяжелой работой или выгоранием, здесь отдых — это базовая потребность души, такая же важная, как еда или сон.</p>
            <blockquote class="border-l-4 border-gray-900 pl-6 py-2 my-8 italic text-xl text-gray-700 bg-gray-50 rounded-r-xl">
                "Красота жизни раскрывается только в те моменты, когда мы перестаем куда-то бежать."
            </blockquote>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Практика в реальной жизни</h2>
            <p>Попробуйте выделить хотя бы 15-20 минут в день на истинное "ничегонеделание". Оставьте телефон в другой комнате, выключите музыку и телевизор. Просто побудьте наедине с собой. Dolce Far Niente учит нас отключаться от цифровой суеты, перезагружать нервную систему и заново учиться чувствовать вкус настоящей жизни.</p>
        `
    },
    {
        category: 'Мексика',
        title: 'День Мертвых: почему в Мексике смеются над смертью',
        content: `
            <p>Для большинства мировых культур смерть — это абсолютная трагедия, одетая в черное, сопровождаемая тишиной и слезами. В Мексике же отношение к уходу из жизни совершенно иное. Здесь это яркий, красочный и даже радостный праздник жизни, известный во всем мире как <strong>Día de los Muertos</strong> (День Мертвых).</p>
            <p>Мексиканцы искренне верят, что в первые дни ноября души ушедших родственников получают разрешение вернуться домой, чтобы навестить живых. Чтобы их встретить и порадовать, семьи строят сложные домашние алтари (офренды).</p>
            <p>Эти алтари обильно украшаются ярко-оранжевыми бархатцами, десятками свечей, расписными сахарными черепами (калаверами) и, самое главное, любимой едой, напитками и вещами умерших.</p>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Праздник памяти, а не скорби</h2>
            <p>Вместо того чтобы тихо плакать на кладбище, мексиканцы приносят туда гитары. Они поют любимые песни ушедших, громко вспоминают смешные истории из их жизни, устраивают пикники прямо у могил и делятся радостью. Смерть здесь воспринимается не как конец, а как естественное продолжение большого пути.</p>
            <blockquote class="border-l-4 border-gray-900 pl-6 py-2 my-8 italic text-xl text-gray-700 bg-gray-50 rounded-r-xl">
                "Мы смеемся над смертью, чтобы показать, что не боимся её, и вспоминаем ушедших, чтобы они продолжали жить в наших сердцах."
            </blockquote>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Глубокий урок для каждого</h2>
            <p>Этот потрясающий праздник учит нас важнейшей истине: любовь и память гораздо сильнее физической смерти. Он напоминает нам каждый день: пока мы помним человека, пока мы рассказываем о нем истории своим детям и сохраняем его традиции — он всё еще жив и находится рядом с нами.</p>
        `
    },
    {
        category: 'Франция',
        title: 'Joie de Vivre: как французы находят радость в мелочах',
        content: `
            <p>Термин <strong>Joie de Vivre</strong> (дословно «радость жизни») — это не просто красивая стереотипная фраза для туристов. Это фундаментальный столп французского мировоззрения и повседневного поведения. Это осознанная способность испытывать неподдельный восторг от самых простых вещей.</p>
            <p>Это может быть хруст свежеиспеченного теплого багета по утрам. Это идеально подобранный бокал вина, выпитый в хорошей компании. Это долгий ужин за интересной, глубокой беседой, который затягивается за полночь. Французы категорически отказываются торопиться жить — они предпочитают её смаковать.</p>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Качество всегда выше количества</h2>
            <p>Эта философия тотально пронизывает всё: от формирования базобуго гардероба до рациона питания. Француз предпочтет купить одну, но безупречно сшитую и дорогую вещь, чем десять дешевых масс-маркет футболок.</p>
            <p>То же самое касается еды: лучше съесть очень маленький кусочек потрясающего фермерского сыра с рынка, чем огромную порцию безвкусного дешевого фастфуда на бегу.</p>
            <blockquote class="border-l-4 border-gray-900 pl-6 py-2 my-8 italic text-xl text-gray-700 bg-gray-50 rounded-r-xl">
                "Истинный секрет не в том, чтобы иметь всё на свете, а в том, чтобы уметь наслаждаться тем, что у тебя есть прямо сейчас."
            </blockquote>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Искусство жить каждый день</h2>
            <p>Чтобы перенять частичку Joie de Vivre, нужно перестать воспринимать бытовую рутину как тяжкую обязанность. Попробуйте превратить утреннее заваривание кофе в красивый неспешный ритуал. Накройте стол со скатертью даже для обычного вторничного ужина. Разрешите себе наслаждаться моментом без малейшего чувства вины за "потерянное время".</p>
        `
    },
    {
        category: 'Испания',
        title: 'Sobremesa: магия долгих разговоров после ужина',
        content: `
            <p>Во многих культурах прием пищи — это чисто функциональный процесс: поели, убрали посуду, разошлись по своим делам. Но в Испании еда — это лишь приятный повод собраться вместе. Самое важное и интересное начинается именно после того, как тарелки полностью опустели. Это магическое время называется <strong>Sobremesa</strong> (буквально переводится как «над столом»).</p>
            <p>Это могут быть часы, проведенные за столом после плотного обеда или ужина. Время наполнено беседами, громким смехом, жаркими спорами и философскими обсуждениями. Никто не спешит уходить, никто не поглядывает на часы и не просит счет. Телефоны убраны в карманы, всё внимание без остатка отдано сидящим рядом людям.</p>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Связь через глубокое общение</h2>
            <p>Собремеса — это главный инструмент того, как испанцы строят и цементируют свои социальные связи. Это драгоценное время, когда формируются по-настоящему глубокие отношения, когда мирятся старые друзья, когда обсуждаются планы на жизнь и просто течет настоящая, нецифровая жизнь.</p>
            <blockquote class="border-l-4 border-gray-900 pl-6 py-2 my-8 italic text-xl text-gray-700 bg-gray-50 rounded-r-xl">
                "В Испании самые важные жизненные решения и самые крепкие деловые союзы создаются не в холодных офисах, а за столом, когда уже подан десерт и кофе."
            </blockquote>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Почему нам критически этого не хватает?</h2>
            <p>В нашем турбулентном мире, где люди привыкли есть на бегу или уткнувшись в экраны смартфонов, древняя традиция Собремесы выглядит как спасательный круг. Попробуйте в следующий раз, собравшись с семьей или друзьями, не вставать из-за стола сразу после десерта. Заварите еще чая, расслабьтесь и просто поговорите друг с другом по душам.</p>
        `
    },
    {
        category: 'Китай',
        title: 'Гуаньси: невидимые нити, управляющие обществом',
        content: `
            <p>В западном корпоративном и социальном мире всё решают безупречные контракты, впечатляющие резюме и строгие законы. В Китае же общество, карьера и крупный бизнес исторически опираются на концепцию <strong>Гуаньси</strong> (关系) — сложнейшую, многоуровневую сеть личных связей, взаимных обязательств и негласного доверия.</p>
            <p>Важно понимать, что это не просто банальный "блат" или кумовство. Гуаньси строится годами кропотливого труда: через постоянный обмен услугами, своевременную помощь, правильные подарки и публичное проявление уважения ("сохранение лица"). Это огромный социальный капитал, который в Китае ценится в разы дороже прямых денег.</p>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Личное доверие прежде всего</h2>
            <p>В традиционной китайской культуре считается, что любые сделки заключаются исключительно между конкретными людьми, а не между безликими юридическими лицами или корпорациями. Если между партнерами нет глубокого личного доверия и налаженных гуаньси, никакие, даже самые строгие юридические бумаги, не смогут гарантировать успешный исход дела.</p>
            <blockquote class="border-l-4 border-gray-900 pl-6 py-2 my-8 italic text-xl text-gray-700 bg-gray-50 rounded-r-xl">
                "Без прочных Гуаньси у вас есть только жесткие правила. Когда есть Гуаньси, любые правила становятся удивительно гибкими."
            </blockquote>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Сила долгосрочных отношений</h2>
            <p>Понимание философии Гуаньси может научить западного человека главному — инвестировать в людей "в долгую". Вместо того чтобы пытаться извлечь сиюминутную выгоду из нового контакта, мы можем учиться выстраивать прочные, взаимовыгодные и искренние отношения, базирующиеся на взаимной поддержке и глубоком уважении.</p>
        `
    },
    {
        category: 'Бразилия',
        title: 'Саудаде: светлая грусть бразильского народа',
        content: `
            <p>В португальском языке (и особенно в бразильской культуре) есть одно уникальное слово, которое лингвисты считают почти невозможным точно и коротко перевести на другие языки мира — это слово <strong>Saudade</strong>. Это глубокая, пронзительная, но при этом удивительно светлая грусть по тому, чего больше нет, или даже по тому, чего никогда в реальности и не было.</p>
            <p>Чувство саудаде пронизывает буквально всю бразильскую культуру: оно звучит в каждом аккорде жанра босса-нова, оно лежит в основе национальной поэзии. Это уникальный вид ностальгии. Он не разрушает человека изнутри, не вгоняет в депрессию, а, наоборот, странным образом согревает его душу, напоминая о том, что он способен глубоко чувствовать.</p>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Любовь, которая осталась навсегда</h2>
            <p>Сами бразильцы часто поэтично говорят: "Саудаде — это присутствие отсутствия". Это горько-сладкое осознание того, что вы любили кого-то (или какой-то период своей жизни) настолько сильно и искренне, что само воспоминание об этом продолжает жить внутри вас, навсегда становясь неотъемлемой частью вашей личности.</p>
            <blockquote class="border-l-4 border-gray-900 pl-6 py-2 my-8 italic text-xl text-gray-700 bg-gray-50 rounded-r-xl">
                "Саудаде — это прекрасная и справедливая цена, которую мы платим судьбе за пережитые моменты истинного, абсолютного счастья."
            </blockquote>
            <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Целительное принятие чувств</h2>
            <p>Западная поп-психология слишком часто жестко учит нас "отпускать прошлое", "не оглядываться назад" и "быстро двигаться дальше". Философия саудаде предлагает совершенно иной, более мягкий путь: позволить себе грустить с легкой улыбкой на губах. Признать огромную ценность того, что было, и превратить боль потери в бережное, согревающее сердце воспоминание.</p>
        `
    }
];

let currentArticleIndex = 0;

// === 2. ГЕНЕРАЦИЯ КОНТЕНТА ===
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
                <span class="text-gray-900 font-bold">Войти в чат &rarr;</span>
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
        <div class="text-card tilt-element fade-in-up cursor-pointer p-0 flex flex-col sm:flex-row border-gray-200 hover:border-gray-900 transition-colors" onclick="window.location.href='register.html'">
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

// === 3. ЧТЕНИЕ СТАТЕЙ (КАСКАДНАЯ АНИМАЦИЯ) ===
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
                setTimeout(() => {
                    el.classList.add('show');
                }, i * 100); 
            });
        });
        
    }, 300); 
}

function loadNextArticle() {
    const nextIndex = (currentArticleIndex + 1) % articlePages.length;
    window.location.hash = nextIndex; 
    loadArticle(nextIndex);
}

// === 4. ЛОГИКА ЧАТА ===
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
                
                // Запоминаем текущую комнату
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

    // === ЛОГИКА ОТПРАВКИ СООБЩЕНИЙ ===
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');

    function sendMessage() {
        if (!currentRoomId || !chatInput.value.trim()) return;

        const text = chatInput.value.trim();
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

        allChatRooms[currentRoomId].messages.push({
            type: 'sent',
            name: 'Вы',
            time: timeStr,
            content: text
        });

        chatInput.value = '';
        loadChatRoom(currentRoomId);
    }

    if (chatSendBtn && chatInput) {
        chatSendBtn.onclick = sendMessage;
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
}

// Заменяем функцию загрузки чата для поддержки своих/чужих сообщений
function loadChatRoom(roomId) {
    const room = allChatRooms[roomId];
    if(!room) return;
    document.getElementById('chat-header-title').textContent = room.title;
    document.getElementById('chat-header-desc').textContent = room.desc;

    const container = document.getElementById('chat-messages-container');
    container.innerHTML = room.messages.map(msg => {
        const isSent = msg.type === 'sent';
        return `
        <div class="flex flex-col mb-4 ${isSent ? 'items-end' : 'items-start'}">
            <div class="text-xs text-gray-500 mb-1">${msg.name}, ${msg.time}</div>
            <div class="${isSent ? 'bg-primary text-white rounded-tr-sm' : 'bg-white text-gray-900 border border-gray-200 rounded-tl-sm'} rounded-2xl px-5 py-3 max-w-[85%] text-sm shadow-sm">
                ${msg.content}
            </div>
        </div>
        `;
    }).join('');
    
    container.scrollTop = container.scrollHeight;
}

// === 5. ЛОГИКА QUIZ И СТРИМА ===
let quizScore = 0;
let currentQuizQ = 0;

const quizQuestions = [
    { q: 'Какое японское понятие означает "предназначение" или "смысл жизни"?', options: ['Кайзен', 'Икигай', 'Сатори', 'Цундоку'], correct: 1 },
    { q: 'В какой стране зародилась традиция долгих разговоров после ужина (Sobremesa)?', options: ['Италия', 'Франция', 'Мексика', 'Испания'], correct: 3 },
    { q: 'Что означает португальское слово "Saudade"?', options: ['Бурная радость', 'Страх будущего', 'Светлая грусть и ностальгия', 'Жажда приключений'], correct: 2 },
    { q: 'Как называется китайская концепция негласных личных связей и взаимных обязательств?', options: ['Гуаньси', 'Фэншуй', 'Дао', 'Увэй'], correct: 0 },
    { q: 'Какое итальянское выражение переводится как "сладкое ничегонеделание"?', options: ['La Dolce Vita', 'Dolce Far Niente', 'Bella Figura', 'Al Dente'], correct: 1 },
    { q: 'Какой шведский термин означает "не слишком много, не слишком мало, в самый раз"?', options: ['Хюгге', 'Фика', 'Лагом', 'Кос'], correct: 2 },
    { q: 'Африканская философия "Ubuntu" лучше всего переводится как:', options: ['Я есть, потому что мы есть', 'Время — деньги', 'Каждый сам за себя', 'Жизнь — это борьба'], correct: 0 },
    { q: 'Что означает датское слово "Hygge" (Хюгге)?', options: ['Чувство уюта и комфортного общения', 'Суровая зима', 'Традиционный танец', 'Национальное блюдо'], correct: 0 },
    { q: 'Финское понятие "Sisu" (Сису) описывает:', options: ['Любовь к сауне', 'Внутреннюю силу, стоицизм и выдержку', 'Праздник летнего солнцестояния', 'Красоту северного сияния'], correct: 1 },
    { q: 'Японское искусство искреннего, глубокого гостеприимства называется:', options: ['Оригами', 'Омотенаши', 'Бусидо', 'Судоку'], correct: 1 }
];

function initQuiz() {
    const qContainer = document.getElementById('quiz-container');
    if(!qContainer) return;
    
    function renderQ() {
        if(currentQuizQ >= quizQuestions.length) {
            qContainer.innerHTML = `
                <div class="text-center py-10 fade-in-up show">
                    <div class="text-5xl mb-4 text-gray-900">🏆</div>
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
        
        if(selected === correct) {
            btn.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
            btn.innerHTML = 'Верно! Отличная работа.';
            quizScore++;
        } else {
            btn.classList.add('bg-gray-100', 'text-gray-400', 'border-gray-200', 'line-through');
            btn.innerHTML = 'Неверно';
            buttons[correct].classList.add('bg-gray-900', 'text-white', 'border-gray-900');
            buttons[correct].innerHTML = 'Правильный ответ!';
        }
        
        setTimeout(() => {
            currentQuizQ++;
            renderQ();
        }, 1500);
    };
}

let streamScore = 0;
window.handleStreamPoll = (btn, isCorrect) => {
    const container = document.getElementById('poll-container');
    const buttons = container.querySelectorAll('button');
    const scoreBadge = document.getElementById('stream-score-display');
    
    buttons.forEach(b => {
        b.disabled = true;
        b.classList.remove('hover:border-gray-900', 'hover:-translate-y-1', 'hover:shadow-sm');
    });
    
    if(isCorrect) {
        btn.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
        btn.innerHTML = 'Верно! +10 баллов';
        streamScore += 10;
        if(scoreBadge) scoreBadge.innerHTML = `Баллы: ${streamScore}`;
    } else {
        btn.classList.add('bg-gray-100', 'text-gray-400', 'border-gray-200', 'line-through');
        btn.innerHTML = 'Неверно';
        buttons[1].classList.add('bg-gray-900', 'text-white', 'border-gray-900');
        buttons[1].innerHTML = 'Вот правильный ответ!';
    }
};

// === 6. ИНТЕРАКТИВ ===
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

// ФУНКЦИЯ ДЛЯ ПРОВЕРКИ СКРОЛЛА (Удаляет дерганье шапки)
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

// === ЗАПУСК ===
document.addEventListener('DOMContentLoaded', () => {
    updateNavState(); // Мгновенный вызов при загрузке
    generateContent(); 
    initChat(); 
    
    if (typeof quizQuestions !== 'undefined') {
        initQuiz();
    }
    
    if(document.getElementById('article-content')) {
        const hash = window.location.hash.replace('#', '');
        loadArticle(hash ? parseInt(hash) : 0);
    }
    
    setTimeout(() => {
        initScrollAnimations();
        initTiltEffect();
    }, 100);
});