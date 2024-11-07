## Como Contribuir

### 1. Faça um Fork do Repositório

Primeiro, faça um fork do repositório original. Isso criará uma cópia do repositório no seu GitHub.

1. Vá para a [página do repositório](https://github.com/Arthu-RL/SimuladorInvestimentoWeb).
2. Clique no botão **Fork** no canto superior direito.

### 2. Clone o Repositório Forkado

Clone o repositório forkado para o seu ambiente local:

```bash
git clone https://github.com/SEU_USUARIO/SimuladorInvestimentoWeb.git
```

### 3. Crie uma Branch

Crie uma nova branch para trabalhar nas suas alterações:

```bash
git checkout -b nome-da-sua-branch
```

Use um nome de branch descritivo, como `feature/nova-funcionalidade` ou `fix/ajuste-bug`.

### 4. Faça Suas Alterações

Realize as alterações necessárias no código ou documentação.

### 5. Adicione e Comite Suas Alterações

Após fazer suas alterações, adicione e comite:

```bash
git add .
git commit -m "Descrição clara e concisa das alterações"
```

#### Convenção de Commits 

| Tipo de Commit |                             Descrição                                | Exemplo
| ---------------|----------------------------------------------------------------------|-----------
| `feat`         | Adiciona uma nova funcionalidade ao projeto.                         | `feat: add achievements modal`
| `fix`          | Corrige um bug ou problema no projeto.                               | `fix: disable simulator at home page`
| `docs`         | Altera a documentação do projeto.                                    | `docs: update README.md`
| `style`        | Realiza mudanças na aparência, sem alterar a funcionalidade.         | `style: reduce achievement toast size`
| `refactor`     | Realiza mudanças no código que não alteram a funcionalidade.         | `refactor: improve some namings in 'useAssetColumns'`
| `test`         | Adiciona ou modifica testes no projeto.                              | `test: add unit test for UserService`
| `chore`        | Atualização de tarefas que não ocasionam alteração no código de produção, mas mudanças de ferramentas, mudanças de configuração e bibliotecas que realmente não entram em produção                                        | `chore: increase favicon size`

### 6. Envie Suas Alterações

Envie as alterações para o seu repositório forkado:

```bash
git push origin nome-da-sua-branch
```

### 7. Crie um Pull Request

1. **Vá até o repositório original** (https://github.com/Arthu-RL/SimuladorInvestimentoWeb) no GitHub.
2. Clique no botão **New Pull Request**.
3. Na página de pull request, selecione a sua branch do repositório forkado como a branch de origem.
4. Verifique se a branch de destino é a branch correta no repositório original.
5. Preencha o título e a descrição do pull request explicando o que foi alterado ou adicionado.

### 8. Revisão e Feedback

Seu pull request será revisado. Fique atento(a) para eventuais comentários e sugestões de melhoria.

## Diretrizes de Contribuição

- **Código limpo:** Mantenha o código claro e fácil de entender.
- **Commits descritivos:** Use mensagens de commit descritivas para facilitar o entendimento do histórico do projeto.
- **Padrões de código:** Siga os padrões de codificação e estilo adotados pelo projeto.
- **Documentação:** Mantenha a documentação atualizada com suas alterações.

## Relatar Problemas

Se encontrar algum problema, por favor, abra uma **Issue** descrevendo o problema de forma detalhada.
