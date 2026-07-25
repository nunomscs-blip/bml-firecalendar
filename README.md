# BML FireCalendar

Aplicação Web desenvolvida em JavaScript puro para gestão pessoal de serviços de bombeiros.

O objetivo é disponibilizar um calendário simples, rápido e intuitivo onde cada utilizador possa registar os seus serviços e receber alertas.

---

# Objetivo

Desenvolver uma aplicação leve e de fácil utilização que permita:

- Marcar serviços no calendário;
- Editar e eliminar serviços;
- Identificar visualmente os diferentes tipos de serviço;
- Receber alertas antes dos serviços;
- Guardar todos os dados localmente no navegador (Local Storage).

Cada utilizador possui a sua própria informação, não existindo contas nem sincronização entre dispositivos.

---

# Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- Local Storage
- Git
- GitHub
- GitHub Pages

---

# Estrutura do Projeto

```
BML FireCalendar/
│
├── index.html
├── style.css
├── README.md
│
├── js/
│   ├── app.js
│   ├── calendario.js
│   ├── config.js
│   ├── database.js
│   └── datas.js
│
└── assets/
```

---

# Organização do Código

| Ficheiro | Responsabilidade |
|----------|------------------|
| config.js | Configurações globais da aplicação |
| datas.js | Funções relacionadas com datas |
| calendario.js | Construção e gestão do calendário |
| database.js | Persistência dos dados em Local Storage |
| app.js | Inicialização da aplicação e gestão da interface |

---

# Funcionalidades

## Implementadas

- ✔ Calendário mensal
- ✔ Navegação entre meses
- ✔ Semana iniciada à segunda-feira
- ✔ Cálculo automático dos dias do mês
- ✔ Compatível com anos bissextos
- ✔ Seleção múltipla de dias
- ✔ Criação de serviços
- ✔ Persistência em Local Storage

## Em desenvolvimento

- Edição de serviços
- Eliminação de serviços
- Alertas de serviço
- Melhorias na interface

---

# Filosofia do Projeto

O FireCalendar foi concebido para fazer apenas uma tarefa, mas fazê-la bem.

A aplicação pretende ser:

- Simples;
- Rápida;
- Leve;
- Fácil de utilizar;
- Fácil de manter.

Sempre que possível serão evitadas funcionalidades que aumentem a complexidade sem acrescentar valor ao objetivo principal da aplicação.

---

# Armazenamento

Todos os dados são guardados no navegador através de Local Storage.

Isso permite:

- funcionamento offline;
- utilização sem registo ou autenticação;
- privacidade dos dados;
- independência entre utilizadores.

Cada utilizador gere apenas os seus próprios serviços.

---

# Convenções

## Linguagem

Todo o código, comentários e documentação são escritos em português.

## Organização

Cada ficheiro encontra-se dividido em secções identificadas por comentários.

Exemplo:

```javascript
/* ======================================================
   CALENDÁRIO
====================================================== */
```

---

# Objetivo Final

Disponibilizar uma aplicação simples, estável e intuitiva para gestão pessoal de serviços de bombeiros, permitindo consultar rapidamente os serviços futuros e receber alertas antes de cada serviço.

---

# Licença

Projeto pessoal desenvolvido para aprendizagem e utilização própria.