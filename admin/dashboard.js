// Dashboard Admin - Portal de Sistemas
class AdminDashboard {
    constructor() {
        this.sistemas = [];
        this.categorias = [];
        this.currentEditingId = null;
        this.init();
    }

    init() {
        this.checkAuth();
        this.clearOldData(); // Limpar dados antigos
        this.loadData();
        this.setupEventListeners();
        this.updateStats();
    }

    clearOldData() {
        // Limpar dados antigos do localStorage para forçar atualização
        localStorage.removeItem('adminSistemas');
        localStorage.removeItem('adminCategorias');
    }

    checkAuth() {
        const sessionData = JSON.parse(localStorage.getItem('adminSession') || sessionStorage.getItem('adminSession') || '{}');
        
        if (!sessionData.loggedIn || !sessionData.timestamp) {
            window.location.href = 'login.html';
            return;
        }

        // Verificar se a sessão não expirou (24 horas)
        const sessionAge = Date.now() - sessionData.timestamp;
        const maxAge = 24 * 60 * 60 * 1000; // 24 horas
        
        if (sessionAge >= maxAge) {
            localStorage.removeItem('adminSession');
            sessionStorage.removeItem('adminSession');
            window.location.href = 'login.html';
            return;
        }

        // Atualizar usuário atual
        document.getElementById('currentUser').textContent = sessionData.username || 'Admin';
    }

    loadData() {
        // Sempre usar dados padrão atualizados (forçar atualização)
        this.sistemas = this.getDefaultSistemas();
        this.categorias = this.getDefaultCategorias();
        
        // Salvar os dados atualizados
        this.saveData();

        this.renderSistemas();
        this.renderCategorias();
    }

    getDefaultSistemas() {
        return [
            {
                id: 1,
                nome: "Sistema de Avaliação do Funcionário Público",
                categoria: "gestao",
                descricao: "Plataforma para avaliação de desempenho dos servidores municipais.",
                url: "https://rh.pmsgrainterno.site/",
                tipoAcesso: "interno",
                icon: "fas fa-user-tie",
                cor: "#6c5ce7",
                keywords: "avaliação funcionario publico rh recursos humanos",
                status: "ativo"
            },
            {
                id: 2,
                nome: "Sistema de Agendamento de Quadras",
                categoria: "esportes",
                descricao: "Gerenciamento de reservas e agendamentos dos espaços esportivos municipais.",
                url: "https://esportes.pmsgrainterno.site/",
                tipoAcesso: "interno",
                icon: "fas fa-volleyball-ball",
                cor: "#f39c12",
                keywords: "agendamento quadras esportes lazer juventude reserva",
                status: "ativo"
            },
            {
                id: 3,
                nome: "Sistema de Controle de Mudas",
                categoria: "meio-ambiente",
                descricao: "Gerenciamento e distribuição de mudas da Secretaria de Meio Ambiente.",
                url: "https://meioambiente.pmsgrainterno.site/pages/login.php",
                tipoAcesso: "interno",
                icon: "fas fa-seedling",
                cor: "#27ae60",
                keywords: "mudas meio ambiente plantas seedling verde",
                status: "ativo"
            },
            {
                id: 4,
                nome: "Sistema de Controle de Almoxarifado",
                categoria: "educacao",
                descricao: "Gerenciamento de estoque e inventário do almoxarifado da Educação.",
                url: "https://educacao.pmsgrainterno.site/",
                tipoAcesso: "interno",
                icon: "fas fa-boxes",
                cor: "#e67e22",
                keywords: "almoxarifado estoque inventario educacao escolas",
                status: "ativo"
            },
            {
                id: 5,
                nome: "Sistema de Gestão de Contratos",
                categoria: "tecnologia",
                descricao: "Controle e acompanhamento dos contratos municipais de TI.",
                url: "https://contratosti.pmsgrainterno.site/index.php?page=login",
                tipoAcesso: "interno",
                icon: "fas fa-file-contract",
                cor: "#3498db",
                keywords: "contratos gestao ti tecnologia",
                status: "ativo"
            },
            {
                id: 6,
                nome: "Sistema de Gestão de Ponto",
                categoria: "tecnologia",
                descricao: "Controle de frequência, folgas e registro de ponto dos funcionários do setor.",
                url: "",
                tipoAcesso: "local",
                icon: "fas fa-clock",
                cor: "#3498db",
                keywords: "ponto frequencia registro funcionarios",
                status: "ativo"
            },
            {
                id: 7,
                nome: "Sistema de Controle",
                categoria: "tecnologia",
                descricao: "Sistema de gerenciamento e controle de processos internos.",
                url: "",
                tipoAcesso: "local",
                icon: "fas fa-tasks",
                cor: "#3498db",
                keywords: "controle processos internos gerenciamento",
                status: "ativo"
            },
            {
                id: 8,
                nome: "Sistema de Energia",
                categoria: "tecnologia",
                descricao: "Sistema de gestão de contas de energia elétrica municipal.",
                url: "https://energia.pmsgra.net/",
                tipoAcesso: "interno",
                icon: "fas fa-bolt",
                cor: "#3498db",
                keywords: "energia eletrica contas gestao",
                status: "ativo"
            },
            {
                id: 9,
                nome: "Sistema da Habitação",
                categoria: "trabalho",
                descricao: "Sistema de consulta de gerenciamento de habitação.",
                url: "https://gesgra.pmsgrainterno.site/",
                tipoAcesso: "interno",
                icon: "fas fa-house",
                cor: "#ff6b35",
                keywords: "habitacao moradia gestao",
                status: "ativo"
            },
            {
                id: 10,
                nome: "Dashboard do GLPI",
                categoria: "tecnologia",
                descricao: "Sistema de dashboard para exibir dados resumidos do GLPI.",
                url: "https://glpi.pmsgra.net/",
                tipoAcesso: "interno",
                icon: "fas fa-clipboard",
                cor: "#3498db",
                keywords: "glpi dashboard tickets suporte",
                status: "ativo"
            },
            {
                id: 11,
                nome: "Ramais das Secretarias",
                categoria: "tecnologia",
                descricao: "Sistema de consulta de ramais.",
                url: "https://ramais.pmsgra.net/",
                tipoAcesso: "interno",
                icon: "fas fa-phone",
                cor: "#3498db",
                keywords: "ramais telefones contatos secretarias",
                status: "ativo"
            },
            {
                id: 12,
                nome: "Site da Reserva do PETI",
                categoria: "meio-ambiente",
                descricao: "Site com informações sobre a Reserva do PETI.",
                url: "https://peti.pmsgra.net/",
                tipoAcesso: "publico",
                icon: "fas fa-tree",
                cor: "#27ae60",
                keywords: "reserva peti meio ambiente natureza",
                status: "ativo"
            },
            {
                id: 13,
                nome: "Sistema de Benefícios da Educação",
                categoria: "educacao",
                descricao: "Sistema voltado para a gestão dos benefícios da educação.",
                url: "",
                tipoAcesso: "interno",
                icon: "fas fa-money-bill",
                cor: "#e67e22",
                keywords: "beneficios educacao auxilio estudantes",
                status: "desenvolvimento"
            }
        ];
    }

    getDefaultCategorias() {
        return [
            { id: "gestao", nome: "Gestão de Pessoas", descricao: "Sistemas de recursos humanos", cor: "#6c5ce7" },
            { id: "esportes", nome: "Esportes", descricao: "Sistemas esportivos e de lazer", cor: "#f39c12" },
            { id: "meio-ambiente", nome: "Meio Ambiente", descricao: "Sistemas ambientais", cor: "#27ae60" },
            { id: "educacao", nome: "Educação", descricao: "Sistemas educacionais", cor: "#e67e22" },
            { id: "trabalho", nome: "Trabalho e Desenvolvimento Social", descricao: "Sistemas sociais", cor: "#ff6b35" },
            { id: "tecnologia", nome: "Ciência e Tecnologia", descricao: "Sistemas de TI", cor: "#3498db" }
        ];
    }

    setupEventListeners() {
        // Navegação da sidebar
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.showSection(section);
            });
        });

        // Formulário de sistema
        document.getElementById('sistemaForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSistema();
        });

        // Formulário de categoria
        document.getElementById('categoriaForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCategoria();
        });

        // Formulário de configurações do portal
        document.getElementById('portalConfigForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePortalConfig();
        });
    }

    showSection(sectionName) {
        // Atualizar navegação
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Mostrar seção correspondente
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`).classList.add('active');
    }

    renderSistemas() {
        const tbody = document.getElementById('sistemasTableBody');
        tbody.innerHTML = '';

        this.sistemas.forEach(sistema => {
            const categoria = this.categorias.find(cat => cat.id === sistema.categoria);
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>
                    <div class="sistema-info">
                        <div class="sistema-icon-small" style="background-color: ${sistema.cor}">
                            <i class="${sistema.icon}"></i>
                        </div>
                        <span>${sistema.nome}</span>
                    </div>
                </td>
                <td>${categoria ? categoria.nome : 'Sem categoria'}</td>
                <td>
                    <span class="badge ${sistema.tipoAcesso}">${this.getTipoAcessoLabel(sistema.tipoAcesso)}</span>
                </td>
                <td>
                    <span class="status-badge ${sistema.status}">${sistema.status}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="dashboard.editSistema(${sistema.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="dashboard.toggleSistemaStatus(${sistema.id})" title="Ativar/Desativar">
                            <i class="fas fa-power-off"></i>
                        </button>
                        <button class="btn-icon delete" onclick="dashboard.deleteSistema(${sistema.id})" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    renderCategorias() {
        const container = document.querySelector('.categorias-grid');
        container.innerHTML = '';

        this.categorias.forEach(categoria => {
            const card = document.createElement('div');
            card.className = 'categoria-card';
            card.innerHTML = `
                <div class="categoria-header" style="background-color: ${categoria.cor}">
                    <h3>${categoria.nome}</h3>
                    <div class="categoria-actions">
                        <button class="btn-icon" onclick="dashboard.editCategoria(${categoria.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete" onclick="dashboard.deleteCategoria(${categoria.id})" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="categoria-body">
                    <p>${categoria.descricao || 'Sem descrição'}</p>
                    <div class="categoria-stats">
                        <span>Sistemas: ${this.sistemas.filter(s => s.categoria === categoria.id).length}</span>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    updateStats() {
        document.getElementById('totalSistemas').textContent = this.sistemas.length;
        
        // Atualizar estatísticas por categoria
        const categoryStats = {};
        this.sistemas.forEach(sistema => {
            categoryStats[sistema.categoria] = (categoryStats[sistema.categoria] || 0) + 1;
        });

        // Atualizar contadores de acesso
        const publicoCount = this.sistemas.filter(s => s.tipoAcesso === 'publico').length;
        const internoCount = this.sistemas.filter(s => s.tipoAcesso === 'interno').length;
        
        document.querySelector('.stat-card:nth-child(3) h3').textContent = publicoCount;
        document.querySelector('.stat-card:nth-child(4) h3').textContent = internoCount;
    }

    openSistemaModal(sistemaId = null) {
        this.currentEditingId = sistemaId;
        const modal = document.getElementById('sistemaModal');
        const form = document.getElementById('sistemaForm');
        
        if (sistemaId) {
            const sistema = this.sistemas.find(s => s.id === sistemaId);
            document.getElementById('modalTitle').textContent = 'Editar Sistema';
            
            // Preencher formulário
            document.getElementById('sistemaNome').value = sistema.nome;
            document.getElementById('sistemaCategoria').value = sistema.categoria;
            document.getElementById('sistemaDescricao').value = sistema.descricao;
            document.getElementById('sistemaIcon').value = sistema.icon;
            document.getElementById('sistemaCor').value = sistema.cor;
            document.getElementById('sistemaUrl').value = sistema.url || '';
            document.getElementById('sistemaTipoAcesso').value = sistema.tipoAcesso;
            document.getElementById('sistemaKeywords').value = sistema.keywords;
        } else {
            document.getElementById('modalTitle').textContent = 'Adicionar Sistema';
            form.reset();
        }
        
        modal.style.display = 'flex';
    }

    closeSistemaModal() {
        document.getElementById('sistemaModal').style.display = 'none';
        this.currentEditingId = null;
    }

    saveSistema() {
        const formData = {
            nome: document.getElementById('sistemaNome').value,
            categoria: document.getElementById('sistemaCategoria').value,
            descricao: document.getElementById('sistemaDescricao').value,
            icon: document.getElementById('sistemaIcon').value,
            cor: document.getElementById('sistemaCor').value,
            url: document.getElementById('sistemaUrl').value,
            tipoAcesso: document.getElementById('sistemaTipoAcesso').value,
            keywords: document.getElementById('sistemaKeywords').value,
            status: 'ativo'
        };

        if (this.currentEditingId) {
            // Editar sistema existente
            const index = this.sistemas.findIndex(s => s.id === this.currentEditingId);
            this.sistemas[index] = { ...this.sistemas[index], ...formData };
            this.showToast('Sistema atualizado com sucesso!', 'success');
        } else {
            // Adicionar novo sistema
            const newId = Math.max(...this.sistemas.map(s => s.id), 0) + 1;
            this.sistemas.push({ id: newId, ...formData });
            this.showToast('Sistema adicionado com sucesso!', 'success');
        }

        this.saveData();
        this.renderSistemas();
        this.updateStats();
        this.closeSistemaModal();
    }

    editSistema(id) {
        this.openSistemaModal(id);
    }

    deleteSistema(id) {
        if (confirm('Tem certeza que deseja excluir este sistema?')) {
            this.sistemas = this.sistemas.filter(s => s.id !== id);
            this.saveData();
            this.renderSistemas();
            this.updateStats();
            this.showToast('Sistema excluído com sucesso!', 'success');
        }
    }

    toggleSistemaStatus(id) {
        const sistema = this.sistemas.find(s => s.id === id);
        sistema.status = sistema.status === 'ativo' ? 'inativo' : 'ativo';
        this.saveData();
        this.renderSistemas();
        this.showToast(`Sistema ${sistema.status}!`, 'info');
    }

    openCategoriaModal(categoriaId = null) {
        this.currentEditingId = categoriaId;
        const modal = document.getElementById('categoriaModal');
        const form = document.getElementById('categoriaForm');
        
        if (categoriaId) {
            const categoria = this.categorias.find(c => c.id === categoriaId);
            document.getElementById('categoriaModalTitle').textContent = 'Editar Categoria';
            
            document.getElementById('categoriaNome').value = categoria.nome;
            document.getElementById('categoriaDescricao').value = categoria.descricao || '';
            document.getElementById('categoriaCor').value = categoria.cor;
        } else {
            document.getElementById('categoriaModalTitle').textContent = 'Adicionar Categoria';
            form.reset();
        }
        
        modal.style.display = 'flex';
    }

    closeCategoriaModal() {
        document.getElementById('categoriaModal').style.display = 'none';
        this.currentEditingId = null;
    }

    saveCategoria() {
        const formData = {
            nome: document.getElementById('categoriaNome').value,
            descricao: document.getElementById('categoriaDescricao').value,
            cor: document.getElementById('categoriaCor').value
        };

        if (this.currentEditingId) {
            const index = this.categorias.findIndex(c => c.id === this.currentEditingId);
            this.categorias[index] = { ...this.categorias[index], ...formData };
            this.showToast('Categoria atualizada com sucesso!', 'success');
        } else {
            const newId = Math.max(...this.categorias.map(c => c.id), 0) + 1;
            this.categorias.push({ id: newId, ...formData });
            this.showToast('Categoria adicionada com sucesso!', 'success');
        }

        this.saveData();
        this.renderCategorias();
        this.closeCategoriaModal();
    }

    editCategoria(id) {
        this.openCategoriaModal(id);
    }

    deleteCategoria(id) {
        const sistemasUsandoCategoria = this.sistemas.filter(s => s.categoria === id);
        
        if (sistemasUsandoCategoria.length > 0) {
            this.showToast('Não é possível excluir categoria que possui sistemas vinculados!', 'error');
            return;
        }

        if (confirm('Tem certeza que deseja excluir esta categoria?')) {
            this.categorias = this.categorias.filter(c => c.id !== id);
            this.saveData();
            this.renderCategorias();
            this.showToast('Categoria excluída com sucesso!', 'success');
        }
    }

    saveData() {
        localStorage.setItem('adminSistemas', JSON.stringify(this.sistemas));
        localStorage.setItem('adminCategorias', JSON.stringify(this.categorias));
    }

    savePortalConfig() {
        const config = {
            title: document.getElementById('portalTitle').value,
            description: document.getElementById('portalDescription').value
        };
        
        localStorage.setItem('portalConfig', JSON.stringify(config));
        this.showToast('Configurações salvas com sucesso!', 'success');
    }

    getTipoAcessoLabel(tipo) {
        const labels = {
            'interno': 'Acesso Interno',
            'publico': 'Acesso Público',
            'local': 'Acesso Local'
        };
        return labels[tipo] || tipo;
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${this.getToastIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 3000);
    }

    getToastIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    refreshData() {
        this.clearOldData();
        this.loadData();
        this.updateStats();
        this.showToast('Dados atualizados com sucesso!', 'success');
    }

    changePassword() {
        const newPassword = prompt('Digite a nova senha:');
        if (newPassword && newPassword.length >= 6) {
            // Em produção, isso seria enviado para o servidor
            localStorage.setItem('adminPassword', newPassword);
            this.showToast('Senha alterada com sucesso!', 'success');
        } else if (newPassword) {
            this.showToast('Senha deve ter pelo menos 6 caracteres!', 'error');
        }
    }
}

// Funções globais para compatibilidade com HTML
function logout() {
    localStorage.removeItem('adminSession');
    sessionStorage.removeItem('adminSession');
    window.location.href = 'login.html';
}

function showSection(sectionName) {
    dashboard.showSection(sectionName);
}

function openSistemaModal(sistemaId = null) {
    dashboard.openSistemaModal(sistemaId);
}

function closeSistemaModal() {
    dashboard.closeSistemaModal();
}

function openCategoriaModal(categoriaId = null) {
    dashboard.openCategoriaModal(categoriaId);
}

function closeCategoriaModal() {
    dashboard.closeCategoriaModal();
}

function exportData() {
    dashboard.exportData();
}

function refreshData() {
    dashboard.refreshData();
}

// Inicializar dashboard quando a página carregar
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new AdminDashboard();
});
