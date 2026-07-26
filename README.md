# BML FireCalendar

Aplicação Web desenvolvida em JavaScript puro para gestão pessoal de serviços de bombeiros.

O objetivo é disponibilizar um calendário simples, rápido e intuitivo onde cada utilizador possa registar os seus serviços e receber alertas automáticos antes de cada serviço.

---

# Objetivo

Desenvolver uma aplicação leve, intuitiva e de fácil utilização que permita:

- Registar serviços no calendário;
- Editar e eliminar serviços;
- Identificar visualmente os diferentes tipos de serviço;
- Receber alertas automáticos antes dos serviços;
- Guardar todos os dados localmente no navegador;
- Funcionar totalmente offline.

Cada utilizador possui apenas a sua própria informação, não existindo contas, sincronização entre dispositivos ou armazenamento em servidores.

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

# Arquitetura Funcional

O FireCalendar foi concebido com uma arquitetura simples, modular e orientada para regras.

Cada componente possui uma única responsabilidade, reduzindo a complexidade da aplicação e facilitando a sua manutenção.

---

## Eventos

O evento é a unidade principal da aplicação.

Cada evento representa um serviço previamente agendado.

Cada evento contém apenas:

- Tipo de Evento;
- Data;
- Turno;
- Observações.

O evento não guarda:

- Alarmes;
- Notificações;
- Horários calculados.

Toda a informação derivada é obtida automaticamente através das configurações da aplicação.

---

## Tipos de Evento

Os Tipos de Evento caracterizam o serviço registado.

A versão inicial inclui:

- 🚑 Saúde
- 🚒 ECIN
- 🚑 SBA
- 🎓 Formação
- 📚 Instrução
- 🏢 Serviço

Cada tipo poderá definir:

- Nome;
- Ícone;
- Cor;
- Utilização de turnos.

---

## Turnos

Os turnos são configuráveis.

Cada turno define:

- Nome;
- Hora de início;
- Hora de fim.

Os eventos apenas referenciam o turno utilizado.

Sempre que um turno é alterado, todos os eventos associados passam automaticamente a utilizar a nova configuração.

---

## Sistema de Alarmes

O sistema de alarmes é global e baseado exclusivamente em regras.

Os alarmes não pertencem aos eventos.

Cada evento criado gera automaticamente os alertas definidos na configuração da aplicação.

As regras poderão definir uma ou várias antecedências relativamente ao início do evento.

Exemplos:

- 48 horas antes;
- 24 horas antes;
- 12 horas antes;
- 2 horas antes.

Sempre que um evento é criado, editado ou eliminado, os alertas são recalculados automaticamente.

Sempre que a configuração dos alarmes é alterada, todos os eventos passam imediatamente a utilizar as novas regras.

O utilizador nunca necessita de configurar alarmes individualmente para cada evento.

---

## Configuração

A área de Configuração será composta apenas por três módulos:

- 📁 Tipos de Evento
- 🕒 Turnos
- 🔔 Alarmes

Cada módulo possui uma responsabilidade específica:

### Tipos de Evento

Caracterizam cada serviço.

### Turnos

Definem os horários dos serviços.

### Alarmes

Definem quando deverão ser emitidas as notificações.

---

# Funcionalidades

## Implementadas

- Calendário mensal
- Navegação entre meses
- Semana iniciada à segunda-feira
- Seleção múltipla de dias
- Criação de eventos
- Edição de eventos
- Eliminação de eventos
- Persistência em Local Storage

## Planeadas

- Configuração dos Tipos de Evento
- Configuração dos Turnos
- Configuração dos Alarmes
- Sistema automático de notificações
- Melhorias na interface
- Otimização para dispositivos móveis
- Progressive Web App (PWA)

---

# Armazenamento

Todos os dados são guardados localmente através de Local Storage.

Isto permite:

- Funcionamento offline;
- Privacidade dos dados;
- Utilização sem registo;
- Independência entre utilizadores.

---

# Filosofia do Projeto

O FireCalendar pretende fazer apenas uma tarefa, mas fazê-la bem.

Os princípios de desenvolvimento são:

- Simplicidade;
- Rapidez;
- Estabilidade;
- Modularidade;
- Automatização;
- Facilidade de manutenção.

Sempre que possível:

- Os dados são armazenados apenas uma vez;
- A informação derivada é calculada automaticamente;
- As regras ficam centralizadas na Configuração;
- Os eventos permanecem simples;
- O utilizador não necessita de repetir configurações.

---

# Objetivo Final

Disponibilizar uma aplicação simples, estável e intuitiva que permita gerir serviços de bombeiros e garantir que nenhum serviço seja esquecido através de um sistema automático de alertas configuráveis.

---

# Licença

Projeto pessoal desenvolvido para aprendizagem, utilização própria e evolução contínua.

