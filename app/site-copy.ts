export type Locale = "en" | "uk" | "pl" | "ru";

export const locales: { id: Locale; label: string; lang: string }[] = [
  { id: "uk", label: "UA", lang: "uk" },
  { id: "pl", label: "PL", lang: "pl" },
  { id: "en", label: "EN", lang: "en" },
  { id: "ru", label: "RU", lang: "ru" },
];

export const copy = {
  en: {
    nav: ["Why", "How it works", "FAQ", "Download"],
    hero: ["Personal car assistant", "Know what your car needs next.", "Eliyo keeps track of maintenance, mileage, documents and your car’s history — and tells you what needs attention.", "Coming soon", "See how it works", "For iPhone & Android"],
    cards: ["Oil service", "~798 km remaining", "Insurance", "Renews in 24 days", "Nothing urgent", "Your Citroën is doing fine."],
    why: {
      kicker: "Why Eliyo",
      title: "Your car has a lot to remember. You shouldn’t have to.",
      items: [
        ["Maintenance", "Know what’s coming.", "Oil, filters, fluids, inspections and everything else — Eliyo keeps track of what’s next."],
        ["History", "Everything that happened, in one place.", "Services, mileage, expenses and documents stay connected to your car."],
        ["Reminders", "Don’t remember. Get reminded.", "Eliyo lets you know before something needs attention."],
      ],
      labels: ["NEXT", "TIMELINE", "REMINDER", "Oil change", "Service completed", "Mileage updated", "Insurance renewal", "Today", "24 days"],
    },
    how: {
      kicker: "How it works",
      title: "Add your car. Eliyo takes it from there.",
      intro: "Three simple steps. No setup marathon, no spreadsheet, no magical promises.",
      steps: [
        ["Add your car", "Use the VIN or add it manually. Start with what you already know."],
        ["Eliyo builds the picture", "Add mileage, service history, documents and the things you want to track."],
        ["Know what’s next", "Open Eliyo and see what’s fine, what’s approaching and what needs attention."],
      ],
      phone: ["Add your car", "Start with a VIN, or enter the details yourself.", "Scan VIN", "Add manually", "Evening, Artem.", "Nothing urgent with your C3.", "Coming up", "Engine oil", "Based on your latest mileage", "Due in ~798 km", "Updated today"],
    },
    faq: {
      kicker: "Good to know", title: "Questions, answered.",
      items: [
        ["Does Eliyo work with any car?", "Yes. You can add a vehicle by VIN or manually. Some automatic integrations depend on the vehicle and region."],
        ["Does Eliyo read mileage automatically?", "For supported vehicles, automatic syncing can be available. Otherwise Eliyo works from your latest mileage and updates its estimates when you enter a new reading."],
        ["Do I need to upload my documents?", "No. Documents are optional. Eliyo works without them."],
        ["Can I add more than one car?", "Yes. You can keep multiple vehicles in one garage."],
        ["Is Eliyo available on iPhone and Android?", "Yes. Eliyo is being prepared for both iOS and Android."],
        ["Which languages are supported?", "English, Ukrainian, Polish and Russian."],
      ],
    },
    download: ["Eliyo is almost ready", "Stop carrying your car in your head.", "Your car. Its history. What comes next. One place.", "Email address", "Get notified at launch", "Joining…", "You’re in", "One useful email when Eliyo launches. No noise.", "You’re in. We’ll let you know when Eliyo is ready.", "You’re already on the list — we’ll keep you posted.", "Enter a valid email address.", "Early access is temporarily unavailable. Please try again."],
    footer: ["Built for people who’d rather drive than remember maintenance dates.", "Support", "Privacy", "Terms", "Delete account"],
  },
  uk: {
    nav: ["Навіщо", "Як це працює", "FAQ", "Завантажити"],
    hero: ["Персональний асистент для авто", "Знайте, що потрібно вашому авто далі.", "Eliyo стежить за обслуговуванням, пробігом, документами та історією авто — і підказує, що потребує уваги.", "Скоро", "Як це працює", "Для iPhone та Android"],
    cards: ["Заміна мастила", "залишилось ~798 км", "Страхування", "Подовжити через 24 дні", "Нічого термінового", "З вашим Citroën усе добре."],
    why: {
      kicker: "Навіщо Eliyo", title: "У вашого авто багато всього, що треба памʼятати. Вам — не обовʼязково.",
      items: [
        ["Обслуговування", "Знайте, що наближається.", "Мастило, фільтри, рідини, огляди та інше — Eliyo памʼятає, що буде далі."],
        ["Історія", "Усе, що відбувалося, в одному місці.", "Сервіси, пробіг, витрати й документи залишаються повʼязаними з вашим авто."],
        ["Нагадування", "Не запамʼятовуйте. Отримуйте нагадування.", "Eliyo повідомить до того, як щось потребуватиме уваги."],
      ],
      labels: ["ДАЛІ", "ІСТОРІЯ", "НАГАДУВАННЯ", "Заміна мастила", "Сервіс завершено", "Пробіг оновлено", "Подовження страховки", "Сьогодні", "24 дні"],
    },
    how: {
      kicker: "Як це працює", title: "Додайте авто. Далі Eliyo допоможе.", intro: "Три прості кроки. Без довгого налаштування, таблиць і магічних обіцянок.",
      steps: [["Додайте авто", "Скористайтеся VIN або додайте вручну. Почніть із того, що вже знаєте."], ["Eliyo збирає картину", "Додайте пробіг, історію сервісу, документи й те, за чим хочете стежити."], ["Знайте, що далі", "Відкрийте Eliyo й побачте, що в нормі, що наближається і що потребує уваги."]],
      phone: ["Додайте авто", "Почніть із VIN або введіть дані самостійно.", "Сканувати VIN", "Додати вручну", "Добрий вечір, Артеме.", "З вашим C3 нічого термінового.", "Наближається", "Моторна олива", "На основі останнього пробігу", "Через ~798 км", "Оновлено сьогодні"],
    },
    faq: {
      kicker: "Варто знати", title: "Відповіді на запитання.",
      items: [["Eliyo працює з будь-яким авто?", "Так. Ви можете додати авто за VIN або вручну. Деякі автоматичні інтеграції залежать від моделі та регіону."], ["Eliyo автоматично зчитує пробіг?", "Для підтримуваних авто може бути доступна автоматична синхронізація. В інших випадках Eliyo використовує останній введений пробіг і оновлює оцінки після нового показника."], ["Чи потрібно завантажувати документи?", "Ні. Документи необовʼязкові. Eliyo працює і без них."], ["Можна додати більше одного авто?", "Так. Ви можете зберігати кілька автомобілів в одному гаражі."], ["Eliyo буде на iPhone та Android?", "Так. Eliyo готується до випуску на iOS та Android."], ["Які мови підтримуються?", "Англійська, українська, польська та російська."]],
    },
    download: ["Eliyo майже готовий", "Не тримайте всю машину в голові.", "Ваше авто. Його історія. Що буде далі. В одному місці.", "Email", "Дізнатися про запуск", "Додаємо…", "Готово", "Один корисний лист на старті Eliyo. Без шуму.", "Готово. Ми повідомимо, коли Eliyo буде доступний.", "Ви вже у списку — триматимемо вас у курсі.", "Введіть коректну email-адресу.", "Зараз не вдалося приєднатися. Спробуйте ще раз."],
    footer: ["Для людей, які воліють кермувати, а не памʼятати дати обслуговування.", "Підтримка", "Конфіденційність", "Умови", "Видалити акаунт"],
  },
  pl: {
    nav: ["Dlaczego", "Jak to działa", "FAQ", "Pobierz"],
    hero: ["Osobisty asystent auta", "Wiedz, czego Twoje auto potrzebuje dalej.", "Eliyo śledzi serwis, przebieg, dokumenty i historię auta — i podpowiada, co wymaga uwagi.", "Już wkrótce", "Zobacz, jak to działa", "Na iPhone’a i Androida"],
    cards: ["Wymiana oleju", "pozostało ok. 798 km", "Ubezpieczenie", "Odnowienie za 24 dni", "Nic pilnego", "Z Twoim Citroënem wszystko w porządku."],
    why: {
      kicker: "Dlaczego Eliyo", title: "Twoje auto ma wiele rzeczy, o których trzeba pamiętać. Ty nie musisz.",
      items: [["Serwis", "Wiedz, co nadchodzi.", "Olej, filtry, płyny, przeglądy i cała reszta — Eliyo pilnuje tego, co dalej."], ["Historia", "Wszystko, co się wydarzyło, w jednym miejscu.", "Serwisy, przebieg, wydatki i dokumenty pozostają połączone z Twoim autem."], ["Przypomnienia", "Nie pamiętaj. Daj sobie przypomnieć.", "Eliyo da Ci znać, zanim coś będzie wymagało uwagi."]],
      labels: ["NASTĘPNE", "HISTORIA", "PRZYPOMNIENIE", "Wymiana oleju", "Serwis wykonany", "Przebieg zaktualizowany", "Odnowienie ubezpieczenia", "Dzisiaj", "24 dni"],
    },
    how: {
      kicker: "Jak to działa", title: "Dodaj auto. Resztą zajmie się Eliyo.", intro: "Trzy proste kroki. Bez długiej konfiguracji, arkusza i magicznych obietnic.",
      steps: [["Dodaj swoje auto", "Użyj VIN-u albo dodaj je ręcznie. Zacznij od tego, co już wiesz."], ["Eliyo układa całość", "Dodaj przebieg, historię serwisu, dokumenty i rzeczy, które chcesz śledzić."], ["Wiedz, co dalej", "Otwórz Eliyo i sprawdź, co jest w porządku, co się zbliża i co wymaga uwagi."]],
      phone: ["Dodaj swoje auto", "Zacznij od VIN-u albo wpisz dane samodzielnie.", "Zeskanuj VIN", "Dodaj ręcznie", "Dobry wieczór, Artem.", "Z Twoim C3 nic pilnego.", "Nadchodzi", "Olej silnikowy", "Na podstawie ostatniego przebiegu", "Za ok. 798 km", "Zaktualizowano dziś"],
    },
    faq: {
      kicker: "Warto wiedzieć", title: "Pytania i odpowiedzi.",
      items: [["Czy Eliyo działa z każdym autem?", "Tak. Możesz dodać auto po VIN-ie lub ręcznie. Niektóre automatyczne integracje zależą od pojazdu i regionu."], ["Czy Eliyo automatycznie odczytuje przebieg?", "Dla obsługiwanych pojazdów może być dostępna automatyczna synchronizacja. W pozostałych przypadkach Eliyo korzysta z ostatniego przebiegu i aktualizuje szacunki po wpisaniu nowego odczytu."], ["Czy muszę przesyłać dokumenty?", "Nie. Dokumenty są opcjonalne. Eliyo działa bez nich."], ["Czy mogę dodać więcej niż jedno auto?", "Tak. Możesz trzymać wiele pojazdów w jednym garażu."], ["Czy Eliyo będzie na iPhone’a i Androida?", "Tak. Eliyo jest przygotowywane na iOS i Androida."], ["Jakie języki są obsługiwane?", "Angielski, ukraiński, polski i rosyjski."]],
    },
    download: ["Eliyo jest prawie gotowe", "Nie trzymaj całego auta w głowie.", "Twoje auto. Jego historia. To, co dalej. W jednym miejscu.", "Adres e-mail", "Powiadom mnie o starcie", "Zapisujemy…", "Gotowe", "Jedna przydatna wiadomość przy starcie Eliyo. Bez spamu.", "Gotowe. Damy Ci znać, gdy Eliyo będzie dostępne.", "Jesteś już na liście — będziemy Cię informować.", "Wpisz poprawny adres e-mail.", "Lista oczekujących jest chwilowo niedostępna. Spróbuj ponownie."],
    footer: ["Dla osób, które wolą jeździć niż pamiętać terminy serwisów.", "Wsparcie", "Prywatność", "Warunki", "Usuń konto"],
  },
  ru: {
    nav: ["Зачем", "Как работает", "FAQ", "Скачать"],
    hero: ["Персональный ассистент для авто", "Знайте, что понадобится вашей машине дальше.", "Eliyo следит за обслуживанием, пробегом, документами и историей автомобиля — и подсказывает, что требует внимания.", "Скоро", "Как это работает", "Для iPhone и Android"],
    cards: ["Замена масла", "осталось ~798 км", "Страховка", "Продлить через 24 дня", "Ничего срочного", "С вашим Citroën всё хорошо."],
    why: {
      kicker: "Зачем Eliyo", title: "У машины много всего, что нужно помнить. Вам — не обязательно.",
      items: [["Обслуживание", "Знайте, что приближается.", "Масло, фильтры, жидкости, техосмотры и остальное — Eliyo помнит, что будет дальше."], ["История", "Всё, что происходило, в одном месте.", "Сервисы, пробег, расходы и документы остаются связанными с вашим авто."], ["Напоминания", "Не запоминайте. Получайте напоминания.", "Eliyo сообщит до того, как что-то потребует внимания."]],
      labels: ["ДАЛЬШЕ", "ИСТОРИЯ", "НАПОМИНАНИЕ", "Замена масла", "Сервис завершён", "Пробег обновлён", "Продление страховки", "Сегодня", "24 дня"],
    },
    how: {
      kicker: "Как это работает", title: "Добавьте машину. Дальше поможет Eliyo.", intro: "Три простых шага. Без долгой настройки, таблиц и магических обещаний.",
      steps: [["Добавьте машину", "Используйте VIN или добавьте вручную. Начните с того, что уже знаете."], ["Eliyo собирает картину", "Добавьте пробег, историю сервиса, документы и то, за чем хотите следить."], ["Знайте, что дальше", "Откройте Eliyo и увидьте, что в норме, что приближается и что требует внимания."]],
      phone: ["Добавьте машину", "Начните с VIN или введите данные самостоятельно.", "Сканировать VIN", "Добавить вручную", "Добрый вечер, Артём.", "С вашим C3 ничего срочного.", "Приближается", "Моторное масло", "На основе последнего пробега", "Через ~798 км", "Обновлено сегодня"],
    },
    faq: {
      kicker: "Полезно знать", title: "Ответы на вопросы.",
      items: [["Eliyo работает с любой машиной?", "Да. Вы можете добавить автомобиль по VIN или вручную. Некоторые автоматические интеграции зависят от автомобиля и региона."], ["Eliyo автоматически считывает пробег?", "Для поддерживаемых автомобилей может быть доступна автоматическая синхронизация. В остальных случаях Eliyo использует последний введённый пробег и обновляет оценки после нового показания."], ["Нужно загружать документы?", "Нет. Документы необязательны. Eliyo работает без них."], ["Можно добавить больше одной машины?", "Да. В одном гараже можно хранить несколько автомобилей."], ["Eliyo будет на iPhone и Android?", "Да. Eliyo готовится к выпуску на iOS и Android."], ["Какие языки поддерживаются?", "Английский, украинский, польский и русский."]],
    },
    download: ["Eliyo почти готов", "Не держите всю машину в голове.", "Ваша машина. Её история. Что дальше. В одном месте.", "Email", "Узнать о запуске", "Добавляем…", "Готово", "Одно полезное письмо на старте Eliyo. Без шума.", "Готово. Мы сообщим, когда Eliyo будет доступен.", "Вы уже в списке — будем держать вас в курсе.", "Введите корректный email.", "Список ожидания временно недоступен. Попробуйте снова."],
    footer: ["Для тех, кто предпочитает ездить, а не помнить даты обслуживания.", "Поддержка", "Конфиденциальность", "Условия", "Удалить аккаунт"],
  },
} as const;
