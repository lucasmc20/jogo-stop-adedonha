# 🎮 Jogo STOP!

Uma releitura digital do clássico jogo de categorias, criada em **React** para proporcionar diversão e, ao mesmo tempo, exercitar raciocínio rápido e vocabulário. Clique em **“Sortear Letra”** para começar, preencha cada categoria com palavras que iniciem com a letra sorteada e corra contra o cronômetro de **60 s**. Cada resposta correta vale 10 pontos – tente bater o seu recorde!

---

## 📑 Sumário
1. [Recursos Principais](#-recursos-principais)
2. [Tecnologias & Dependências](#-tecnologias--dependências)
3. [Instalação](#-instalação)
4. [Scripts Disponíveis](#-scripts-disponíveis)
5. [Como Contribuir](#-como-contribuir)
6. [Licença](#-licença)


---

## ✨ Recursos Principais
- **Sorteio Aleatório de Letras** utilizando *hooks* e estado global.
- **Cronômetro de 60 s** sincronizado com o ciclo de vida do componente.
- **Pontuação Automática** (10 pts por resposta correta).
- **Botão “Reiniciar”** que limpa todo o estado sem recarregar a página.
- **Layout Responsivo** com **Tailwind CSS** e componentes reutilizáveis.
- **Testes unitários** via *Testing Library* para garantir a estabilidade da lógica.

---

## 🛠️ Tecnologias & Dependências
| Categoria | Pacotes / Ferramentas |
|-----------|-----------------------|
| **Frontend** | `react@18.2`, `react-dom@18.2`, `react-scripts@5.0.1` |
| **UI & Ícones** | `tailwindcss@^3.3.0`, `lucide-react@^0.263.1` |
| **Testes** | `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jest` |
| **Performance** | `web-vitals@^2.1.4` |
| **Build & Pós-processamento** | `autoprefixer`, `postcss` |

---

## 📦 Instalação
```bash
# 1. Clone o repositório
git clone https://github.com/<seu-usuario>/jogo-stop.git
cd jogo-stop

# 2. Instale as dependências
npm install   # ou yarn

# 3. Inicie o servidor de desenvolvimento
npm start     # ou yarn start
```

---
## 🏗️ Scripts Disponíveis
Comandos:
- npm start	Inicia a aplicação em modo desenvolvimento
- npm run build	Gera a versão otimizada para produção em /build
- npm test	Executa a suíte de testes unitários
- npm run eject	Irreversível! Expõe as configurações internas do Create React App

---
## 📝 Licença
- Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

