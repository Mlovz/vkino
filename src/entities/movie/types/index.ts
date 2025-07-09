export type Movie = {
  id: string | number;
  name: string | null;
  // alternativeName: string | null;
  // type:
  //   | 'movie'
  //   | 'tv-series'
  //   | 'cartoon'
  //   | 'anime'
  //   | 'animated-series'
  //   | 'tv-show'
  //   | string;
  year: number;
  description: string | null;
  // shortDescription: string | null;
  // status: 'completed' | 'ongoing' | 'announced' | string;
  rating: {
    kp: number;
    imdb: number;
  };
  poster: {
    url: string;
    previewUrl: string;
  };
  genres: {
    name: string;
  }[];
  countries: {
    name: string;
  }[];
  // releaseYears: {
  //   start: number;
  //   end: number;
  // }[];
};

export type Movies = {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};

export const mockMovies: Movie[] = [
  {
    id: 1,
    name: 'Побег из Шоушенка',
    year: 1994,
    rating: { kp: 9.1, imdb: 9.3 },
    poster: {
      url: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Побег+из+Шоушенка',
      previewUrl:
        'https://via.placeholder.com/200x300/1a1a1a/ffffff?text=Побег+из+Шоушенка',
    },
    genres: [{ name: 'драма' }, { name: 'криминал' }],
    description:
      'Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме под названием Шоушенк, он сталкивается с жестокостью и беззаконием, царящими по обе стороны решётки.',
    countries: [{ name: 'США' }],
  },
  {
    id: 2,
    name: 'Крестный отец',
    year: 1972,
    rating: { kp: 8.9, imdb: 9.2 },
    poster: {
      url: 'https://via.placeholder.com/300x450/2a2a2a/ffffff?text=Крестный+отец',
      previewUrl:
        'https://via.placeholder.com/200x300/2a2a2a/ffffff?text=Крестный+отец',
    },
    genres: [{ name: 'драма' }, { name: 'криминал' }],
    description:
      'Фильм повествует о могущественной семье сицилийской мафии Корлеоне. Дон Вито Корлеоне выдаёт замуж свою дочь, в то время как его любимый сын Майкл вернулся с войны и намерен держаться подальше от семейного бизнеса.',
    countries: [{ name: 'США' }],
  },
  {
    id: 3,
    name: 'Интерстеллар',
    year: 2014,
    rating: { kp: 8.6, imdb: 8.6 },
    poster: {
      url: 'https://via.placeholder.com/300x450/3a3a3a/ffffff?text=Интерстеллар',
      previewUrl:
        'https://via.placeholder.com/200x300/3a3a3a/ffffff?text=Интерстеллар',
    },
    genres: [
      { name: 'фантастика' },
      { name: 'драма' },
      { name: 'приключения' },
    ],
    description:
      'Когда засуха приводит человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека.',
    countries: [{ name: 'США' }, { name: 'Великобритания' }],
  },
  {
    id: 4,
    name: 'Начало',
    year: 2010,
    rating: { kp: 8.7, imdb: 8.8 },
    poster: {
      url: 'https://via.placeholder.com/300x450/4a4a4a/ffffff?text=Начало',
      previewUrl:
        'https://via.placeholder.com/200x300/4a4a4a/ffffff?text=Начало',
    },
    genres: [{ name: 'фантастика' }, { name: 'боевик' }, { name: 'триллер' }],
    description:
      'Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадёт ценные секреты из глубин подсознания во время сна, когда человеческий разум наиболее уязвим.',
    countries: [{ name: 'США' }, { name: 'Великобритания' }],
  },
  {
    id: 5,
    name: 'Матрица',
    year: 1999,
    rating: { kp: 8.5, imdb: 8.7 },
    poster: {
      url: 'https://via.placeholder.com/300x450/5a5a5a/ffffff?text=Матрица',
      previewUrl:
        'https://via.placeholder.com/200x300/5a5a5a/ffffff?text=Матрица',
    },
    genres: [{ name: 'фантастика' }, { name: 'боевик' }],
    description:
      'Жизнь Томаса Андерсона разделена на две части: днём он — самый обычный офисный работник, получающий нагоняи от начальства, а ночью превращается в хакера по имени Нео.',
    countries: [{ name: 'США' }],
  },
  {
    id: 6,
    name: 'Форрест Гамп',
    year: 1994,
    rating: { kp: 8.8, imdb: 8.8 },
    poster: {
      url: 'https://via.placeholder.com/300x450/6a6a6a/ffffff?text=Форрест+Гамп',
      previewUrl:
        'https://via.placeholder.com/200x300/6a6a6a/ffffff?text=Форрест+Гамп',
    },
    genres: [{ name: 'драма' }, { name: 'комедия' }],
    description:
      'Форрест Гамп — не очень умный, но добрый и открытый парень. Он становится невольным свидетелем и участником важнейших событий американской истории второй половины XX века.',
    countries: [{ name: 'США' }],
  },
];
