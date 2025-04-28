# ShoppingListApp

## BE

Backend projektu se nachází ve složce Backend. Pro spuštění je potřeba mít nainstalované NODE v20, npm 10 a Docker Desktop.
### Pro spuštění na localu

Musíte být ve složce BE:
```bash
  cd backend
```

Nainstalování závislostí projektu:
```bash
  npm install
```

Vytvořte si .**env** soubor, bez toho to souboru, nelze spusit backend projektu

```bash
  cp .env-sample .env
```

Vyplňte env proměné v .env souboru

Spusťte DB kontejner:

```bash
  docker compose up db
```

Spustě server

```bash
  npm run start
```

