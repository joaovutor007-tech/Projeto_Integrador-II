# Documento de Arquitetura e Modelagem — CTBJ Conforto

**Projeto:** Agenda CTBJ

**Versão:** 1.2

**Fase:** Etapa II

**Aluno:** João Victor Marques Arnaldo

---

# Fluxograma Inicial — Agenda CTBJ

Diagrama de fluxo referente ao projeto acadêmico **Agenda CTBJ — Organização Digital da Rotina Escolar**, representando as funcionalidades de consulta, cadastro e atualização de informações escolares (provas, trabalhos, atividades e eventos), conforme os requisitos funcionais (RF01–RF08) e regras de negócio (RN01–RN05) definidos no projeto.

```mermaid
flowchart TD
    A([Início]) --> B[Acesso à Agenda CTBJ]
    B --> C{Consultar ou Cadastrar/Atualizar informações?}

    %% Fluxo de consulta
    C -->|Consultar| D[Consulta das informações escolares]
    D --> E[Separação das informações em: Atividades, Provas, Trabalhos e Eventos]
    E --> F[Organização das informações por data]
    F --> G[Exibição das informações organizadas]
    G --> Z([Fim])

    %% Fluxo de cadastro/atualização
    C -->|Cadastrar/Atualizar| H{Usuário autorizado?}
    H -->|Não| I[Acesso negado ao cadastro/atualização]
    I --> Z

    H -->|Sim| J[Selecionar tipo de informação: Atividade, Prova, Trabalho ou Evento]
    J --> K["Preenchimento dos dados:
    - Atividade: data
    - Prova: disciplina e data
    - Trabalho: data de entrega
    - Evento: informações necessárias"]
    K --> L{Dados obrigatórios preenchidos?}
    L -->|Não| K
    L -->|Sim| M[Cadastro ou atualização da informação]
    M --> F
```

## Legenda

| Elemento | Representação |
|---|---|
| Início / Fim | Círculo (terminal) |
| Ação / Processo | Retângulo |
| Decisão | Losango |
| Fluxo | Seta |

## Referência aos requisitos

- **RF01–RF04**: cadastro de atividades, provas, trabalhos e eventos (nó *Selecionar tipo de informação*).
- **RF05, RF08**: consulta de provas, trabalhos, atividades e eventos (nó *Consulta das informações escolares*).
- **RF06**: organização das informações por data (nó *Organização das informações por data*).
- **RF07**: atualização de informações cadastradas (nó *Cadastro ou atualização da informação*).
- **RN01–RN03**: campos obrigatórios por tipo de cadastro (nó *Preenchimento dos dados*).
- **RN04**: verificação de usuário autorizado (decisão *Usuário autorizado?*).
- **RN05**: organização das atividades por data (nó *Organização das informações por data*).
