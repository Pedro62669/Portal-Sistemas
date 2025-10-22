# Portal de Sistemas - Área Administrativa

## 📋 Visão Geral

Sistema administrativo completo para gerenciar o Portal de Sistemas da Prefeitura Municipal de São Gonçalo do Rio Abaixo. Permite adicionar, editar, remover e organizar os sistemas disponíveis no portal.

## 🚀 Funcionalidades

### 🔐 Autenticação
- **Login seguro** com credenciais administrativas
- **Sessão persistente** com opção "Lembrar-me"
- **Expiração automática** de sessão (24 horas)
- **Logout seguro** com limpeza de dados

### 📊 Dashboard
- **Estatísticas em tempo real** dos sistemas
- **Visão geral** por categorias
- **Ações rápidas** para gerenciamento
- **Gráficos** de distribuição de sistemas

### ⚙️ Gerenciamento de Sistemas
- **CRUD completo** (Criar, Ler, Atualizar, Deletar)
- **Categorização** por secretarias
- **Tipos de acesso** (Interno, Público, Local)
- **Ícones personalizáveis** com cores
- **URLs de acesso** configuráveis
- **Palavras-chave** para busca
- **Status** (Ativo/Inativo)

### 🏷️ Gerenciamento de Categorias
- **Criar novas categorias**
- **Editar categorias existentes**
- **Excluir categorias** (com validação)
- **Cores personalizáveis**
- **Contadores** de sistemas por categoria

### ⚙️ Configurações
- **Informações do portal** editáveis
- **Configurações de segurança**
- **Alteração de senha**
- **Backup automático**
- **Logs de acesso**

## 🔑 Credenciais Padrão

```
Usuário: admin
Senha: DK0104
```

⚠️ **IMPORTANTE**: Altere essas credenciais em produção!

## 📁 Estrutura de Arquivos

```
admin/
├── login.html          # Página de login
├── dashboard.html      # Dashboard administrativo
├── dashboard.js        # Lógica JavaScript
└── admin-styles.css    # Estilos CSS
```

## 🛠️ Como Usar

### 1. Acesso
1. Acesse o portal principal
2. Clique em "Área Administrativa" no footer
3. Faça login com as credenciais administrativas

### 2. Gerenciar Sistemas
1. Vá para "Gerenciar Sistemas"
2. Clique em "Adicionar Sistema"
3. Preencha os dados:
   - **Nome**: Nome do sistema
   - **Categoria**: Secretaria responsável
   - **Descrição**: Descrição do sistema
   - **Ícone**: Ícone Font Awesome
   - **Cor**: Cor do sistema
   - **URL**: Link de acesso
   - **Tipo de Acesso**: Interno/Público/Local
   - **Palavras-chave**: Para busca

### 3. Gerenciar Categorias
1. Vá para "Categorias"
2. Clique em "Adicionar Categoria"
3. Configure:
   - **Nome**: Nome da categoria
   - **Descrição**: Descrição da categoria
   - **Cor**: Cor da categoria

### 4. Configurações
1. Vá para "Configurações"
2. Edite as informações do portal
3. Configure opções de segurança
4. Altere a senha administrativa

## 💾 Armazenamento de Dados

Os dados são armazenados no **localStorage** do navegador:
- `adminSession`: Dados da sessão
- `adminSistemas`: Lista de sistemas
- `adminCategorias`: Lista de categorias
- `portalConfig`: Configurações do portal

## 🔒 Segurança

### Implementado
- ✅ Validação de sessão
- ✅ Expiração automática
- ✅ Logout seguro
- ✅ Validação de formulários
- ✅ Sanitização de dados

### Recomendações para Produção
- 🔐 Implementar autenticação no servidor
- 🔐 Usar HTTPS obrigatório
- 🔐 Implementar rate limiting
- 🔐 Logs de auditoria
- 🔐 Backup automático
- 🔐 Criptografia de dados sensíveis

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 🎨 Personalização

### Cores
As cores podem ser personalizadas através das variáveis CSS:
```css
:root {
    --primary-color: #2e7d32;
    --secondary-color: #1b5e20;
    --accent-color: #ff9800;
    --error-color: #e74c3c;
    --success-color: #27ae60;
}
```

### Ícones
Sistema utiliza Font Awesome 6.0.0 com ícones disponíveis:
- `fas fa-cog` - Configurações
- `fas fa-user-tie` - Usuário
- `fas fa-volleyball-ball` - Esportes
- `fas fa-seedling` - Meio Ambiente
- E muitos outros...

## 🚀 Funcionalidades Avançadas

### Exportação de Dados
- Backup completo em JSON
- Inclui sistemas, categorias e configurações
- Timestamp de exportação

### Notificações Toast
- Feedback visual para ações
- Tipos: Sucesso, Erro, Aviso, Info
- Auto-dismiss após 3 segundos

### Validações
- Campos obrigatórios
- URLs válidas
- Prevenção de exclusão de categorias com sistemas

## 🔧 Manutenção

### Limpeza de Dados
Para limpar todos os dados administrativos:
```javascript
localStorage.removeItem('adminSession');
localStorage.removeItem('adminSistemas');
localStorage.removeItem('adminCategorias');
localStorage.removeItem('portalConfig');
```

### Backup Manual
Os dados são automaticamente salvos no localStorage, mas recomenda-se:
1. Exportar dados regularmente
2. Fazer backup do arquivo JSON
3. Manter cópias de segurança

## 📞 Suporte

Para dúvidas ou problemas:
- **Desenvolvido por**: Secretaria Municipal de Ciência e Tecnologia
- **Prefeitura**: São Gonçalo do Rio Abaixo
- **Ano**: 2025

---

## 🎯 Próximas Melhorias

- [ ] Integração com banco de dados
- [ ] Sistema de usuários múltiplos
- [ ] Logs de auditoria detalhados
- [ ] API REST para integração
- [ ] Sistema de notificações
- [ ] Dashboard com gráficos avançados
- [ ] Importação de dados em massa
- [ ] Sistema de templates
- [ ] Backup automático na nuvem
- [ ] Integração com sistemas externos
