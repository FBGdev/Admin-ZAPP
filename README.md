# 🚀 ZAPP Admin Hosting

<div align="center">

![ZAPP Admin](https://img.shields.io/badge/ZAPP-Admin%20Hosting-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0NSIgZmlsbD0iIzYzNjVmMSIvPjx0ZXh0IHg9IjUwIiB5PSI2NSIgZm9udC1zaXplPSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+WiE8L3RleHQ+PC9zdmc+)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-7952b3?style=for-the-badge&logo=bootstrap)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38bdf8?style=for-the-badge&logo=tailwindcss)
![jQuery](https://img.shields.io/badge/jQuery-3.7.1-0769ad?style=for-the-badge&logo=jquery)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-ffca28?style=for-the-badge&logo=firebase)
![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

Um painel de administração moderno e responsivo construído com as melhores tecnologias web.

[Demo](https://admin-zapp.web.app) • [Documentação](src/docs/documentation.html) • [Reportar Bug](https://github.com/fabianogoncalves/zapp-admin/issues)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [✨ Features](#-features)
- [🛠️ Stack Tecnológica](#️-stack-tecnológica)
- [📦 Instalação](#-instalação)
- [🚀 Scripts Disponíveis](#-scripts-disponíveis)
- [🔥 Deploy com Firebase](#-deploy-com-firebase)
- [📁 Estrutura de Pastas](#-estrutura-de-pastas)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)
- [📬 Contato](#-contato)

---

## 📖 Sobre o Projeto

O **ZAPP Admin Hosting** é um template de dashboard administrativo de alto desempenho, desenvolvido com as tecnologias mais modernas do mercado. Ele oferece uma interface limpa, intuitiva e totalmente responsiva, perfeita para construção de painéis de administração para qualquer tipo de aplicação web.

Este projeto foi inicialmente baseado no Star Admin e personalizado para atender às necessidades específicas do ecossistema ZAPP.

### 🎯 Objetivos

- ✨ Interface moderna e profissional
- 📱 Totalmente responsivo (mobile-first)
- ⚡ Alto desempenho e otimizado
- 🔧 Facilidade de personalização
- 📊 Gráficos e visualizações de dados
- 🔐 Sistema de autenticação pronto

---

## ✨ Features

### 🎨 Interface & Design
- **Design Limpo** - Layout minimalista e profissional
- **Dark Mode** - Suporte a tema escuro
- **Responsivo** - Funciona em todas as telas
- **Ícones** - Múltiplas bibliotecas de ícones (MDI, Font Awesome, Feather, Typicons)
- **Fontes** - Manrope, Nunito e Roboto

### 📊 Componentes
- **Dashboard** - Visão geral com estatísticas e gráficos
- **Tabelas** - DataTables com paginação e ordenação
- **Formulários** - Elementos de formulários validados
- **Gráficos** - Chart.js, Chartist, Morris.js, C3, D3, Rickshaw
- **UI Elements** - Botões, dropdowns, tipografia e mais
- **Ícones** - Bibliotecas completas de ícones

### ⚙️ Funcionalidades
- **Autenticação** - Login, Registro, Páginas de erro
- **Notificações** - Toast notifications e alertas
- **Upload de Arquivos** - Drag & drop, múltiplos formatos
- **Editor de Código** - CodeMirror e Ace Editor
- **Calendário** - FullCalendar integrado
- **Galeria** - LightGallery para imagens

---

## 🛠️ Stack Tecnológica

### Frontend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **HTML5** | - | Linguagem de marcação |
| **CSS3** | - | Estilização e layout |
| **JavaScript** | ES6+ | Programação client-side |
| **Bootstrap** | 5.3.2 | Framework CSS |
| **Tailwind CSS** | 4.1.13 | Framework CSS utilitário |
| **Sass/Scss** | 1.69.5 | Pré-processador CSS |

### Bibliotecas JavaScript
| Biblioteca | Versão | Descrição |
|------------|--------|-----------|
| **jQuery** | 3.7.1 | Biblioteca JavaScript |
| **Chart.js** | 4.4.1 | Gráficos |
| **DataTables** | 1.13.7 | Tabelas interativas |
| **Quill** | 1.3.7 | Editor de texto |
| **TinyMCE** | 6.7.2 | Editor WYSIWYG |
| **FullCalendar** | 3.10.0 | Calendário |
| **SweetAlert2** | 2.1.2 | Alertas modais |
| **Dropzone** | 5.9.3 | Upload de arquivos |

### Build Tools
| Ferramenta | Versão | Descrição |
|------------|--------|-----------|
| **Gulp** | 4.0.2 | Automação de tarefas |
| **npm** | - | Gerenciador de pacotes |
| **BrowserSync** | 2.29.3 | Servidor de desenvolvimento |

### Deploy
| Serviço | Descrição |
|---------|-----------|
| **Firebase Hosting** | Hospedagem web |

---

## 📦 Instalação

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Git

### Clone o Repositório

```bash
git clone https://github.com/fabianogoncalves/zapp-admin.git
cd zapp-admin
```

### Instale as Dependências

```bash
# Instalar dependências do projeto
npm install

# Instalar dependências de desenvolvimento
npm install --save-dev
```

---

## 🚀 Scripts Disponíveis

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento com live reload
npm run dev
# ou diretamente com gulp
gulp serve
```

### Build de Produção

```bash
# Compilar e minificar arquivos para produção
npm run build
# ou
gulp build
```

### Limpeza

```bash
# Limpar pasta dist e cache
npm run clean
```

---

## 🔥 Deploy com Firebase

### 1. Instale o Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Faça Login no Firebase

```bash
firebase login
```

### 3. Inicialize o Firebase (se necessário)

```bash
firebase init
# Selecione "Hosting" e configure conforme necessário
```

### 4. Deploy

```bash
# Build do projeto primeiro
npm run build

# Deploy para Firebase Hosting
firebase deploy
```

### Configuração do Firebase

O projeto já está configurado com o arquivo `.firebaserc`:

```json
{
  "projects": {
    "default": "admin-zapp"
  }
}
```

E `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

### 🔗 Links do Deploy

- **URL de Produção**: [https://admin-zapp.web.app](https://admin-zapp.web.app)
- **URL de Backup**: [https://admin-zapp.firebaseapp.com](https://admin-zapp.firebaseapp.com)

---

## 📁 Estrutura de Pastas

```
zapp-admin/
├── .firebaserc              # Configuração do Firebase CLI
├── firebase.json            # Configuração do Firebase Hosting
├── .gitignore               # Arquivos ignorados pelo Git
├── LICENSE.md               # Licença MIT
├── package.json             # Dependências e scripts npm
├── gulpfile.js              # Configuração do Gulp
│
├── dist/                    # Arquivos compilados (produção)
│   ├── index.html
│   ├── login.html
│   ├── app.js
│   ├── 404.html
│   └── assets/              # Arquivos otimizados
│
└── src/                     # Código fonte
    ├── index.html           # Página principal
    ├── gulpfile.js          # Configuração do Gulp
    │
    ├── assets/              # Assets do projeto
    │   ├── css/             # Arquivos CSS compilados
    │   ├── fonts/           # Fontes (Manrope, Nunito, Roboto)
    │   ├── images/          # Imagens e ícones
    │   ├── js/              # Scripts JavaScript
    │   ├── scss/            # Arquivos SCSS
    │   └── vendors/         # Bibliotecas de terceiros
    │
    ├── pages/               # Páginas do sistema
    │   ├── charts/          # Páginas de gráficos
    │   ├── forms/           # Páginas de formulários
    │   ├── icons/           # Páginas de ícones
    │   ├── samples/         - Páginas de exemplo (login, registro, erros)
    │   ├── tables/          # Páginas de tabelas
    │   └── ui-features/     # Componentes UI
    │
    ├── partials/            # Partials HTML
    │   ├── _footer.html
    │   ├── _navbar.html
    │   └── _sidebar.html
    │
    ├── docs/                # Documentação
    │   ├── documentation.html
    │   ├── script.js
    │   └── style.css
    │
    ├── gulp-tasks/          # Tarefas Gulp
    │   ├── build.js
    │   ├── inject.js
    │   ├── serve.js
    │   └── vendors.js
    │
    └── Tailwind/            # Arquivos Tailwind CSS
        ├── input.css
        └── output.css
```

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork este repositório
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add some amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- ✅ Siga os padrões de código existentes
- ✅ Escreva testes para novas funcionalidades
- ✅ Mantenha a documentação atualizada
- ✅ Use mensagens de commit claras

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

```
MIT License

Copyright (c) 2025 Fabiano Gonçalves

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📬 Contato

**Fabiano Gonçalves**

- 📧 Email: [fabiano@zapp.com.br](mailto:fabiano@zapp.com.br)
- � GitHub: [@fabianogoncalves](https://github.com/fabianogoncalves)
- 💼 LinkedIn: [Fabiano Gonçalves](https://linkedin.com/in/fabianogoncalves)

---

<div align="center">

⭐️ **Obrigado por visitar este projeto!** ⭐️

Feito com 💜 por [Fabiano Gonçalves](https://github.com/fabianogoncalves)

</div>

