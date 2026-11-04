# MOP redesign

## Lokální spuštění

```bash
npm ci
npm run dev
```

## GitHub Pages

1. Spusťte `npm run build:pages`. Příkaz vytvoří hotový web ve složce `docs`.
2. Složku `docs` i ostatní změny commitněte a pushněte do zvolené větve, například `main`.
3. Na GitHubu otevřete repozitář a přejděte na **Settings → Pages**.
4. V části **Build and deployment → Source** vyberte **Deploy from a branch**.
5. Pod **Branch** vyberte větev, do které jste změny nahráli, a složku **/docs**. Klikněte na **Save**.
6. Po zveřejnění najdete adresu webu v **Settings → Pages**.

Při každé další změně aplikace znovu spusťte `npm run build:pages` a aktualizovanou složku `docs` commitněte a pushněte do stejné větve. GitHub Pages pak zobrazí nový obsah.

Bez vlastní domény bude adresa obvykle `https://UZIVATEL.github.io/NAZEV-REPOZITARE/`.

GitHub Pages je veřejně přístupný web. Dostupnost Pages pro soukromé repozitáře závisí na tarifu GitHubu nebo nastavení organizace.
