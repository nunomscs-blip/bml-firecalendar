# BML FireCalendar

Calendário desenvolvido em JavaScript puro para gestão de escalas, eventos e equipas de emergência.

---

# Objetivo

Criar uma aplicação leve, rápida, intuitiva e totalmente configurável para gestão de:

- Escalas
- Equipas ECIN
- Equipas de Saúde
- Formação
- Férias
- Manutenções
- Outros eventos

O projeto está a ser desenvolvido sem frameworks, privilegiando a aprendizagem, a organização do código e o controlo total sobre toda a aplicação.

---

# Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
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
| app.js | Inicialização da aplicação e gestão da interface |

---

# Arquitetura da Aplicação

A aplicação divide-se em dois módulos independentes.

## Calendário

Responsável apenas por:

- Mostrar o calendário
- Navegar entre meses
- Mostrar eventos
- Criar, editar e remover eventos

O calendário **não conhece os tipos de evento**.

---

## Configuração

Responsável pela gestão da aplicação.

Inicialmente incluirá:

- Tipos de Evento
- Turnos

Posteriormente poderá incluir:

- Equipas
- Pessoas
- Locais
- Viaturas
- Categorias
- Outras configurações

---

# Filosofia do Projeto

A aplicação será totalmente configurável.

Nenhum tipo de evento será fixo no código.

Exemplo:

Hoje:

- ECIN
- Saúde
- Formação

Amanhã poderá existir:

- Busca Aquática
- Prevenção
- Cerimónia
- Patrulha

Sem necessidade de alterar o código da aplicação.

---

# Estado do Projeto

## Implementado

- ✔ Estrutura base
- ✔ Calendário mensal
- ✔ Navegação entre meses
- ✔ Nome do mês
- ✔ Cálculo automático dos dias do mês
- ✔ Compatível com anos bissextos
- ✔ Semana iniciada à segunda-feira
- ✔ Seleção múltipla de dias
- ✔ Modal de eventos
- ✔ Estrutura para Configuração

## Em desenvolvimento

- Biblioteca de Tipos de Evento
- Gestão de Eventos
- Persistência de dados
- Filtros
- Estatísticas

---

# Convenções

## Linguagem

Todo o código, comentários e documentação serão escritos em português.

---

## Organização

Cada ficheiro deverá possuir secções identificadas por comentários.

Exemplo:

```javascript
/* ======================================================
   CALENDÁRIO
====================================================== */
```

---

## Objetivo Final

Desenvolver uma aplicação simples, modular, escalável e de fácil manutenção, permitindo acrescentar novas funcionalidades sem necessidade de reestruturar o projeto.

---

# Licença

Projeto pessoal para fins de aprendizagem e desenvolvimento.