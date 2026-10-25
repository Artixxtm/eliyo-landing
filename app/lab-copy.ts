import type { LabLocale, LabStatus } from "@/lib/eliyo-lab-types";

type LabCopy = {
  title: string;
  inviteTitle: string;
  inviteText: string;
  explore: string;
  suggestLead: string;
  suggestSupport: string;
  suggest: string;
  vote: string;
  voted: string;
  community: string;
  by: string;
  statuses: Record<LabStatus, string>;
  loading: string;
  unavailable: string;
  voteError: string;
  form: {
    title: string;
    intro: string;
    ideaLabel: string;
    ideaPlaceholder: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    attributionToggle: string;
    nameLabel: string;
    namePlaceholder: string;
    urlLabel: string;
    urlPlaceholder: string;
    privacy: string;
    submit: string;
    sending: string;
    cancel: string;
    success: string;
    error: string;
    rateLimited: string;
  };
};

export const labCopy: Record<LabLocale, LabCopy> = {
  en: {
    title: "Eliyo Lab",
    inviteTitle: "Help build what's next.",
    inviteText: "Vote on upcoming features and share your ideas in Eliyo Lab.",
    explore: "Explore Eliyo Lab",
    suggestLead: "What's missing from Eliyo?",
    suggestSupport: "Help shape what we build next.",
    suggest: "Suggest an idea",
    vote: "Vote",
    voted: "Voted",
    community: "Suggested by the community",
    by: "by",
    statuses: { considering: "Considering", planned: "Planned", building: "In progress", shipped: "Shipped" },
    loading: "Loading ideas",
    unavailable: "The Lab is taking a short break. Try again soon.",
    voteError: "Your vote was not saved. Try again.",
    form: {
      title: "Share an idea",
      intro: "Every submission is reviewed before it appears here.",
      ideaLabel: "Your idea",
      ideaPlaceholder: "What should Eliyo do next?",
      detailsLabel: "A little more context",
      detailsPlaceholder: "Optional",
      attributionToggle: "Credit me if this idea is published",
      nameLabel: "Name",
      namePlaceholder: "How should we credit you?",
      urlLabel: "Profile link",
      urlPlaceholder: "https://",
      privacy: "Without this choice, your idea stays anonymous.",
      submit: "Send idea",
      sending: "Sending",
      cancel: "Cancel",
      success: "Thanks. Your idea is in review.",
      error: "Could not send your idea. Try again.",
      rateLimited: "You have sent enough ideas for today. Try again tomorrow.",
    },
  },
  uk: {
    title: "Eliyo Lab",
    inviteTitle: "Допоможіть створити те, що далі.",
    inviteText: "Голосуйте за майбутні функції та діліться ідеями в Eliyo Lab.",
    explore: "Відкрити Eliyo Lab",
    suggestLead: "Чого не вистачає Eliyo?",
    suggestSupport: "Допоможіть визначити, що ми створимо далі.",
    suggest: "Запропонувати ідею",
    vote: "Голосувати",
    voted: "Ваш голос",
    community: "Запропоновано спільнотою",
    by: "від",
    statuses: { considering: "Розглядаємо", planned: "Заплановано", building: "У роботі", shipped: "Готово" },
    loading: "Завантажуємо ідеї",
    unavailable: "Lab тимчасово недоступний. Спробуйте трохи пізніше.",
    voteError: "Не вдалося зберегти голос. Спробуйте ще раз.",
    form: {
      title: "Поділіться ідеєю",
      intro: "Кожна пропозиція проходить модерацію перед публікацією.",
      ideaLabel: "Ваша ідея",
      ideaPlaceholder: "Що Eliyo має зробити далі?",
      detailsLabel: "Трохи більше контексту",
      detailsPlaceholder: "Необов’язково",
      attributionToggle: "Вказати мене автором після публікації",
      nameLabel: "Ім’я",
      namePlaceholder: "Як вас підписати?",
      urlLabel: "Посилання на профіль",
      urlPlaceholder: "https://",
      privacy: "Без цієї згоди ідея залишиться анонімною.",
      submit: "Надіслати",
      sending: "Надсилаємо",
      cancel: "Скасувати",
      success: "Дякуємо. Ідея очікує на модерацію.",
      error: "Не вдалося надіслати ідею. Спробуйте ще раз.",
      rateLimited: "На сьогодні ідей достатньо. Спробуйте завтра.",
    },
  },
  pl: {
    title: "Eliyo Lab",
    inviteTitle: "Pomóż tworzyć to, co dalej.",
    inviteText: "Głosuj na przyszłe funkcje i dziel się pomysłami w Eliyo Lab.",
    explore: "Otwórz Eliyo Lab",
    suggestLead: "Czego brakuje w Eliyo?",
    suggestSupport: "Pomóż nam wybrać, co stworzymy dalej.",
    suggest: "Zaproponuj pomysł",
    vote: "Głosuj",
    voted: "Twój głos",
    community: "Propozycja społeczności",
    by: "od",
    statuses: { considering: "Rozważamy", planned: "Planowane", building: "W trakcie", shipped: "Gotowe" },
    loading: "Ładujemy pomysły",
    unavailable: "Lab jest chwilowo niedostępny. Spróbuj ponownie później.",
    voteError: "Nie udało się zapisać głosu. Spróbuj ponownie.",
    form: {
      title: "Podziel się pomysłem",
      intro: "Każde zgłoszenie sprawdzamy przed publikacją.",
      ideaLabel: "Twój pomysł",
      ideaPlaceholder: "Co Eliyo powinno zrobić dalej?",
      detailsLabel: "Trochę więcej kontekstu",
      detailsPlaceholder: "Opcjonalnie",
      attributionToggle: "Podpisz mnie, jeśli pomysł zostanie opublikowany",
      nameLabel: "Imię",
      namePlaceholder: "Jak mamy Cię podpisać?",
      urlLabel: "Link do profilu",
      urlPlaceholder: "https://",
      privacy: "Bez tej zgody pomysł pozostanie anonimowy.",
      submit: "Wyślij pomysł",
      sending: "Wysyłamy",
      cancel: "Anuluj",
      success: "Dzięki. Twój pomysł czeka na moderację.",
      error: "Nie udało się wysłać pomysłu. Spróbuj ponownie.",
      rateLimited: "Na dziś wystarczy zgłoszeń. Spróbuj ponownie jutro.",
    },
  },
  ru: {
    title: "Eliyo Lab",
    inviteTitle: "Помогите создать то, что будет дальше.",
    inviteText: "Голосуйте за будущие функции и делитесь идеями в Eliyo Lab.",
    explore: "Открыть Eliyo Lab",
    suggestLead: "Чего не хватает Eliyo?",
    suggestSupport: "Помогите выбрать, что мы создадим дальше.",
    suggest: "Предложить идею",
    vote: "Голосовать",
    voted: "Ваш голос",
    community: "Предложено сообществом",
    by: "от",
    statuses: { considering: "Рассматриваем", planned: "Запланировано", building: "В работе", shipped: "Готово" },
    loading: "Загружаем идеи",
    unavailable: "Lab временно недоступен. Попробуйте немного позже.",
    voteError: "Не удалось сохранить голос. Попробуйте ещё раз.",
    form: {
      title: "Поделитесь идеей",
      intro: "Каждое предложение проходит модерацию перед публикацией.",
      ideaLabel: "Ваша идея",
      ideaPlaceholder: "Что Eliyo стоит сделать дальше?",
      detailsLabel: "Немного больше контекста",
      detailsPlaceholder: "Необязательно",
      attributionToggle: "Указать меня автором после публикации",
      nameLabel: "Имя",
      namePlaceholder: "Как вас подписать?",
      urlLabel: "Ссылка на профиль",
      urlPlaceholder: "https://",
      privacy: "Без этого согласия идея останется анонимной.",
      submit: "Отправить",
      sending: "Отправляем",
      cancel: "Отмена",
      success: "Спасибо. Идея ожидает модерации.",
      error: "Не удалось отправить идею. Попробуйте ещё раз.",
      rateLimited: "На сегодня идей достаточно. Попробуйте завтра.",
    },
  },
};

