# 🚀 Deploy no GitHub Pages - Guia Completo

## 📋 Pré-requisitos

- ✅ Repositório no GitHub (já tem)
- ✅ Projeto React funcional (já tem)
- ✅ Node.js e npm instalados

## 🛠️ Método 1: GitHub Actions (Recomendado)

### Passo 1: Instalar gh-pages

```bash
cd frontend
npm install --save-dev gh-pages
```

### Passo 2: Adicionar scripts no package.json

```json
{
  "homepage": "https://Dslpss.github.io/Jobs",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Passo 3: Configurar GitHub Actions

Criar arquivo `.github/workflows/deploy.yml` na raiz do projeto:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        run: |
          cd frontend
          npm install

      - name: Build
        run: |
          cd frontend
          npm run build
        env:
          CI: false
          GENERATE_SOURCEMAP: false

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/build
          cname: your-custom-domain.com # Opcional: se tiver domínio customizado
```

### Passo 4: Configurar GitHub Pages no repositório

1. Vá para: `Settings` > `Pages`
2. Source: `Deploy from a branch`
3. Branch: `gh-pages` / `/ (root)`
4. Save

## 🛠️ Método 2: Manual com gh-pages

### Passo 1: Instalar gh-pages

```bash
cd frontend
npm install --save-dev gh-pages
```

### Passo 2: Atualizar package.json

```json
{
  "homepage": "https://Dslpss.github.io/Jobs",
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Passo 3: Deploy manual

```bash
cd frontend
npm run deploy
```

## ⚙️ Configurações Importantes

### 1. Configurar Routing para SPA

Criar arquivo `public/404.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Jobs Portal</title>
    <script type="text/javascript">
      // Redirect to index.html with the path as a query parameter
      var pathSegmentsToKeep = 1; // Ajustar conforme necessário
      var l = window.location;
      l.replace(
        l.protocol +
          "//" +
          l.hostname +
          (l.port ? ":" + l.port : "") +
          l.pathname
            .split("/")
            .slice(0, 1 + pathSegmentsToKeep)
            .join("/") +
          "/?/" +
          l.pathname
            .slice(1)
            .split("/")
            .slice(pathSegmentsToKeep)
            .join("/")
            .replace(/&/g, "~and~") +
          (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
          l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

### 2. Atualizar index.html

Adicionar no `public/index.html` no `<head>`:

```html
<script type="text/javascript">
  // Check if we were redirected from 404.html
  (function (l) {
    if (l.search[1] === "/") {
      var decoded = l.search
        .slice(1)
        .split("&")
        .map(function (s) {
          return s.replace(/~and~/g, "&");
        })
        .join("?");
      window.history.replaceState(
        null,
        null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  })(window.location);
</script>
```

### 3. Configurar React Router

Atualizar `App.js` para usar `basename`:

```jsx
<BrowserRouter basename="/Jobs">{/* resto do código */}</BrowserRouter>
```

### 4. Configurar variáveis de ambiente para produção

Atualizar `.env`:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyCVWXvX8-086Euxodslkc-orXqMJvDHYI8
REACT_APP_FIREBASE_AUTH_DOMAIN=bebidas-46308.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://bebidas-46308-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=bebidas-46308
REACT_APP_FIREBASE_STORAGE_BUCKET=bebidas-46308.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=184130556083
REACT_APP_FIREBASE_APP_ID=1:184130556083:web:ffc08b44abf874f297a0c6
REACT_APP_FIREBASE_MEASUREMENT_ID=G-6EPGLXBWXW

# Deploy Configuration
GENERATE_SOURCEMAP=false
PUBLIC_URL=https://Dslpss.github.io/Jobs
```

## 🔥 Configuração Avançada com Actions

### Deploy Automático Completo

Criar `.github/workflows/deploy.yml`:

```yaml
name: Deploy React App to GitHub Pages

on:
  push:
    branches: [main]
    paths: ["frontend/**"]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js 18
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"
          cache-dependency-path: frontend/package-lock.json

      - name: Install Dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Build Application
        working-directory: ./frontend
        run: npm run build
        env:
          CI: false
          GENERATE_SOURCEMAP: false
          PUBLIC_URL: https://Dslpss.github.io/Jobs
          REACT_APP_FIREBASE_API_KEY: ${{ secrets.REACT_APP_FIREBASE_API_KEY }}
          REACT_APP_FIREBASE_AUTH_DOMAIN: ${{ secrets.REACT_APP_FIREBASE_AUTH_DOMAIN }}
          REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.REACT_APP_FIREBASE_PROJECT_ID }}

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload Build Artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./frontend/build

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 🎯 Passos Práticos para Seu Projeto

### 1. Executar comandos

```bash
# No diretório frontend
npm install --save-dev gh-pages
```

### 2. Atualizar package.json

Adicionar as linhas:

```json
"homepage": "https://Dslpss.github.io/Jobs",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

### 3. Atualizar App.js

```jsx
<BrowserRouter basename="/Jobs">
```

### 4. Configurar GitHub

- Settings > Pages
- Source: GitHub Actions (recomendado)

### 5. Deploy

```bash
npm run deploy
```

## 🚨 Problemas Comuns e Soluções

### 1. **Página em branco**

- Verificar `homepage` no package.json
- Verificar `basename` no BrowserRouter
- Verificar `PUBLIC_URL` nas variáveis de ambiente

### 2. **404 em rotas**

- Adicionar arquivo `404.html`
- Configurar script de redirecionamento

### 3. **Assets não carregam**

- Verificar `PUBLIC_URL`
- Usar caminhos relativos

### 4. **Firebase não conecta**

- Adicionar variáveis de ambiente no GitHub Secrets
- Verificar configuração de domínio no Firebase

## 📱 Domínio Customizado (Opcional)

1. Comprar domínio
2. Adicionar arquivo `CNAME` no `public/`:

```
seudominio.com
```

3. Configurar DNS:

```
CNAME www Dslpss.github.io
A @ 185.199.108.153
A @ 185.199.109.153
A @ 185.199.110.153
A @ 185.199.111.153
```

## ✅ Checklist Final

- [ ] gh-pages instalado
- [ ] homepage configurado no package.json
- [ ] basename configurado no BrowserRouter
- [ ] GitHub Pages habilitado no repositório
- [ ] Variáveis de ambiente configuradas
- [ ] Build funciona localmente
- [ ] Deploy executado

---

**Quer que eu implemente alguma dessas configurações agora?** 🚀
