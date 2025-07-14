# React приложения для поиска фильмом

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/Mlovz/vkino
cd vkino
```

### 2. Установите зависимости

```bash
yarn
```

### 3. Создайте `.env` файл

Создайте файл `.env`, если его нет, на основе шаблона `.env.default`:

```bash
cp .env.default .env
```

### 4. Запустите приложение

```bash
yarn dev
```

Приложение будет доступно по адресу:
[http://localhost:3000](http://localhost:3000)

---

## ⚙️ Переменные окружения

Приложение использует переменные окружения. Пример содержимого файла
`.env.default`:

```env
# .env.default

VITE_API_URL=http://localhost:8080
VITE_API_KEY=BSPSCAE0-0734M1A7-MKFTSFSYD-B3879NJASD!@#
VITE_PORT=3000
```

---

## Сборка

```bash
yarn build
```

Собранные файлы будут находиться в папке `dist`.
