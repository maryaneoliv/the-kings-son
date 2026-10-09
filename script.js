// ==========================================
// 1. AUTENTICAÇÃO E MODAL DE LOGIN / CADASTRO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.getElementById('modal-auth');
    const btnAbrirModal = document.getElementById('botao-login-modal');
    const btnFecharModal = document.getElementById('fechar-modal');

    const abaLogin = document.getElementById('aba-login');
    const abaCadastro = document.getElementById('aba-cadastro');

    const formLogin = document.getElementById('form-login');
    const formCadastro = document.getElementById('form-cadastro');

    // Verificação de Sessão do Utilizador
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo && btnAbrirModal) {
        btnAbrirModal.textContent = `Olá, ${usuarioSalvo} (Sair)`;
        btnAbrirModal.addEventListener('click', (e) => {
            e.preventDefault();
            fazerLogout();
        });
    } else if (btnAbrirModal) {
        btnAbrirModal.addEventListener('click', abrirModal);
    }

    // Funções de Suporte do Modal
    function abrirModal() {
        if (modalContainer) modalContainer.classList.add('ativo', 'ativa');
    }
    window.abrirModalLogin = abrirModal;

    function fecharModal() {
        if (modalContainer) modalContainer.classList.remove('ativo', 'ativa');
    }

    function fazerLogout() {
        if (confirm('Deseja realmente sair da sua conta?')) {
            localStorage.removeItem('usuarioLogado');
            location.reload();
        }
    }

    // Eventos do Modal
    if (modalContainer) {
        if (btnFecharModal) {
            btnFecharModal.addEventListener('click', (e) => {
                e.stopPropagation();
                fecharModal();
            });
        }

        modalContainer.addEventListener('click', (event) => {
            if (event.target === modalContainer) fecharModal();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && (modalContainer.classList.contains('ativo') || modalContainer.classList.contains('ativa'))) {
                fecharModal();
            }
        });

        if (abaLogin && abaCadastro && formLogin && formCadastro) {
            abaLogin.addEventListener('click', () => {
                abaLogin.classList.add('ativa');
                abaCadastro.classList.remove('ativa');
                formLogin.classList.add('ativa');
                formCadastro.classList.remove('ativa');
            });

            abaCadastro.addEventListener('click', () => {
                abaCadastro.classList.add('ativa');
                abaLogin.classList.remove('ativa');
                formCadastro.classList.add('ativa');
                formLogin.classList.remove('ativa');
            });
        }

        if (formLogin) {
            formLogin.addEventListener('submit', (event) => {
                event.preventDefault();
                const email = document.getElementById('login-email').value;
                const nomeUsuario = email.split('@')[0];

                localStorage.setItem('usuarioLogado', nomeUsuario);
                alert(`Bem-vindo de volta, ${nomeUsuario}!`);
                fecharModal();
                location.reload();
            });
        }

        if (formCadastro) {
            formCadastro.addEventListener('submit', (event) => {
                event.preventDefault();
                const nome = document.getElementById('cad-nome').value;

                localStorage.setItem('usuarioLogado', nome);
                alert(`Conta criada com sucesso! Seja bem-vindo, ${nome}.`);
                fecharModal();
                location.reload();
            });
        }
    }
});

// ==========================================
// 2. FORMULÁRIO DE CONTATO
// ==========================================
const formContato = document.getElementById('form-contato');
if (formContato) {
    formContato.addEventListener('submit', (event) => {
        event.preventDefault();
        const nome = document.getElementById('contato-nome').value;
        alert(`Obrigado pelo contato, ${nome}! Sua mensagem foi enviada e responderemos em breve.`);
        formContato.reset();
    });
}

// ==========================================
// 3. PRODUTOS, FILTROS, CARRINHO, CHECKOUT E MEUS PEDIDOS
// ==========================================
function obterCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function obterPedidosDoUsuario() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) return null;
    return JSON.parse(localStorage.getItem(`pedidos_${usuarioLogado}`)) || [];
}

function salvarPedidoUsuario(novoPedido) {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) return;
    const pedidos = obterPedidosDoUsuario() || [];
    pedidos.unshift(novoPedido);
    localStorage.setItem(`pedidos_${usuarioLogado}`, JSON.stringify(pedidos));
}

document.addEventListener('DOMContentLoaded', () => {
    const produtos = [
        { id: 1, nome: "Camiseta Walk by Faith", tipo: "camiseta", preco: 79.90, cor: "preto", tamanhos: ["P", "M", "G", "GG"], imagemFrente: "./imagens/produto1frente.png", imagemVerso: "./imagens/produto1verso.jpeg" },
        { id: 2, nome: "Camiseta Cara e Corre", tipo: "camiseta", preco: 69.90, cor: "branco", tamanhos: ["P", "M", "G", "GG"], imagemFrente: "./imagens/produto2frente.jpeg", imagemVerso: "./imagens/produto2verso.jpeg" },
        { id: 3, nome: "Camiseta Sinner", tipo: "camiseta", preco: 89.90, cor: "preto", tamanhos: ["P", "M", "G", "GG"], imagemFrente: "./imagens/produto3frente.jpeg", imagemVerso: "./imagens/produto3verso.jpeg" },
        { id: 4, nome: "Camiseta Natureza & Graça", tipo: "camiseta", preco: 99.90, cor: "branco", tamanhos: ["P", "M", "G", "GG"], imagemFrente: "./imagens/produto4frente.jpeg", imagemVerso: "./imagens/produto4verso.jpeg" },
        { id: 5, nome: "Camiseta Leão de Judá", tipo: "camiseta", preco: 74.90, cor: "preto", tamanhos: ["P", "M", "G", "GG"], imagemFrente: "./imagens/produto5frente.jpeg", imagemVerso: "./imagens/produto5verso.jpeg" },
        { id: 6, nome: "Camiseta Amor de Pai", tipo: "camiseta", preco: 59.90, cor: "preto", tamanhos: ["P", "M", "G", "GG"], imagemFrente: "./imagens/produto6frente.jpeg", imagemVerso: "./imagens/produto6verso.jpeg" },
        { id: 7, nome: "Camiseta Guardião", tipo: "camiseta", preco: 110.00, cor: "branco", tamanhos: ["P", "M", "G", "GG"], imagemFrente: "./imagens/produto7frente.jpeg", imagemVerso: "./imagens/produto7verso.jpeg" },
        { id: 8, nome: "Camiseta Leão Celestial", tipo: "camiseta", preco: 85.00, cor: "branco", tamanhos: ["P", "M", "G", "GG"], imagemFrente: "./imagens/produto8frente.jpeg", imagemVerso: "./imagens/produto8verso.jpeg" },
        { id: 9, nome: "Camiseta Sal & Luz", tipo: "camiseta", preco: 65.00, cor: "preto", tamanhos: ["P", "M", "G", "GG"], imagemFrente: "./imagens/produto9frente.jpeg", imagemVerso: "./imagens/produto9verso.jpeg" },
        { id: 10, nome: "Camiseta Trindade", tipo: "camiseta", preco: 75.00, cor: "branco", tamanhos: ["P", "M", "G", "GG"], imagemFrente: "./imagens/produto10frente.jpeg", imagemVerso: "./imagens/produto10verso.jpeg" }
    ];

    let produtosFiltrados = [...produtos];
    let paginaAtual = 1;
    const itensPorPagina = 4;
    let exibirAvisoMoleton = false;

    // Elementos DOM
    const listaProdutosEl = document.getElementById('lista-produtos') || document.getElementById('produtos');
    const paginacaoEl = document.getElementById('paginacao');
    const filtroPrecoEl = document.getElementById('filtro-preco');
    const valorPrecoEl = document.getElementById('valor-preco');
    const checkboxesTamanho = document.querySelectorAll('input[name="tamanho"]');
    const checkboxesCor = document.querySelectorAll('input[name="cor"]');
    const checkboxesTipo = document.querySelectorAll('input[name="tipo_produto"]');
    const btnLimparFiltros = document.getElementById('limpar-filtros');

    // Elementos do Carrinho
    const btnCarrinho = document.getElementById('botao-carrinho');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const btnFecharCarrinho = document.getElementById('fechar-carrinho');
    const itensCarrinhoEl = document.getElementById('itens-carrinho');
    const totalCarrinhoEl = document.getElementById('total-carrinho');

    const abrirCarrinho = () => carrinhoModal && carrinhoModal.classList.add('ativo');
    const fecharCarrinho = () => carrinhoModal && carrinhoModal.classList.remove('ativo');

    if (btnCarrinho && carrinhoModal && btnFecharCarrinho) {
        btnCarrinho.addEventListener('click', (e) => {
            e.stopPropagation();
            abrirCarrinho();
        });

        btnFecharCarrinho.addEventListener('click', (e) => {
            e.stopPropagation();
            fecharCarrinho();
        });

        carrinhoModal.addEventListener('click', (e) => e.stopPropagation());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Esc') fecharCarrinho();
        });
    }

    // Métodos Globais do Carrinho
    window.adicionarAoCarrinho = function(itemOuId) {
        let carrinho = obterCarrinho();
        let produto;
        let tamanhoSelecionado;

        if (typeof itemOuId === 'object' && itemOuId !== null) {
            produto = itemOuId;
            tamanhoSelecionado = produto.tamanhoSelecionado || (produto.tamanhos ? produto.tamanhos[0] : 'P');
        } else {
            produto = produtos.find(p => p.id === itemOuId);
            const selectTamanho = document.getElementById(`select-tamanho-${itemOuId}`);
            tamanhoSelecionado = selectTamanho ? selectTamanho.value : (produto && produto.tamanhos ? produto.tamanhos[0] : 'P');
        }

        if (!produto) return;

        const itemExistente = carrinho.find(i => i.id === produto.id && i.tamanhoSelecionado === tamanhoSelecionado);
        if (itemExistente) {
            itemExistente.quantidade = (itemExistente.quantidade || 1) + 1;
        } else {
            carrinho.push({ ...produto, tamanhoSelecionado: tamanhoSelecionado, quantidade: 1 });
        }

        salvarCarrinho(carrinho);
        atualizarCarrinho();
        atualizarContadorHeader();
        if (carrinhoModal) abrirCarrinho();
    };

    function atualizarCarrinho() {
        const carrinho = obterCarrinho();
        if (itensCarrinhoEl) {
            itensCarrinhoEl.innerHTML = '';
            let total = 0;

            if (carrinho.length === 0) {
                itensCarrinhoEl.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
            } else {
                carrinho.forEach(item => {
                    const qtd = item.quantidade || 1;
                    total += item.preco * qtd;

                    const itemEl = document.createElement('div');
                    itemEl.className = 'item-carrinho';
                    itemEl.innerHTML = `
                        <img src="${item.imagemFrente || item.imagem}" alt="${item.nome}">
                        <div class="detalhes-item">
                            <h4>${item.nome}</h4>
                            <p>Tamanho: <strong>${item.tamanhoSelecionado || 'Único'}</strong></p>
                            <p>R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                            <div class="controles-qtd">
                                <button type="button" onclick="alterarQuantidade(event, ${item.id}, '${item.tamanhoSelecionado}', -1)">-</button>
                                <span>${qtd}</span>
                                <button type="button" onclick="alterarQuantidade(event, ${item.id}, '${item.tamanhoSelecionado}', 1)">+</button>
                            </div>
                        </div>
                        <button type="button" class="remover-item" onclick="removerDoCarrinho(event, ${item.id}, '${item.tamanhoSelecionado}')">&times;</button>
                    `;
                    itensCarrinhoEl.appendChild(itemEl);
                });
            }

            if (totalCarrinhoEl) {
                totalCarrinhoEl.textContent = total.toFixed(2).replace('.', ',');
            }
        }
        atualizarContadorHeader();
    }

    function atualizarContadorHeader() {
        const contadorCarrinho = document.getElementById('contador-carrinho');
        if (contadorCarrinho) {
            const carrinho = obterCarrinho();
            const totalItens = carrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);
            contadorCarrinho.textContent = totalItens;
        }
    }

    window.alterarQuantidade = function(e, id, tamanho, mudanca) {
        if (e) e.stopPropagation();
        let carrinho = obterCarrinho();
        const item = carrinho.find(i => i.id === id && i.tamanhoSelecionado === tamanho);
        if (item) {
            item.quantidade = (item.quantidade || 1) + mudanca;
            if (item.quantidade <= 0) {
                carrinho = carrinho.filter(i => !(i.id === id && i.tamanhoSelecionado === tamanho));
            }
            salvarCarrinho(carrinho);
            atualizarCarrinho();
            if (typeof renderizarResumoCheckout === 'function') {
                renderizarResumoCheckout();
            }
        }
    };

    window.removerDoCarrinho = function(e, id, tamanho) {
        if (e) e.stopPropagation();
        let carrinho = obterCarrinho();
        carrinho = carrinho.filter(item => !(item.id === id && item.tamanhoSelecionado === tamanho));
        salvarCarrinho(carrinho);
        atualizarCarrinho();
        if (typeof renderizarResumoCheckout === 'function') {
            renderizarResumoCheckout();
        }
    };

    // Renderização dos Produtos na Grelha
    function renderizarProdutos() {
        if (!listaProdutosEl) return;
        listaProdutosEl.innerHTML = '';

        if (exibirAvisoMoleton) {
            listaProdutosEl.innerHTML = `
                <div class="aviso-em-breve" style="width: 100%; grid-column: 1 / -1; text-align: center; padding: 40px 20px; background-color: #f9f9f9; border: 2px dashed #ccc; border-radius: 8px; margin: 20px 0;">
                    <h3 style="font-size: 1.5rem; color: #333; margin-bottom: 10px;">🔥 Lançamento em Breve!</h3>
                    <p style="font-size: 1.1rem; color: #666;">Os moletons da nossa nova coleção estarão disponíveis muito em breve. Fique atento às novidades!</p>
                </div>
            `;
            if (paginacaoEl) paginacaoEl.innerHTML = '';
            return;
        }

        if (produtosFiltrados.length === 0) {
            listaProdutosEl.innerHTML = '<p class="sem-produtos">Nenhum produto encontrado com os filtros selecionados.</p>';
            if (paginacaoEl) paginacaoEl.innerHTML = '';
            return;
        }

        const inicio = (paginaAtual - 1) * itensPorPagina;
        const fim = inicio + itensPorPagina;
        const produtosPagina = produtosFiltrados.slice(inicio, fim);

        produtosPagina.forEach(prod => {
            const card = document.createElement('article');
            card.className = 'card-produto produto';

            const opcoesTamanhoHTML = prod.tamanhos
                .map(tam => `<option value="${tam}">${tam}</option>`)
                .join('');

            card.innerHTML = `
                <div class="produto-imagem" id="imagem-container-${prod.id}">
                    <img src="${prod.imagemFrente}" alt="${prod.nome} Frente" class="imagem-produto img-frente">
                    <img src="${prod.imagemVerso}" alt="${prod.nome} Verso" class="imagem-produto img-verso">
                    
                    <button type="button" class="btn-trocar-foto" onclick="alternarFotoProduto(event, ${prod.id})" aria-label="Virar foto do produto">
                        &#10095;
                    </button>
                </div>
                <h3>${prod.nome}</h3>
                
                <div class="seletor-tamanho-container" style="margin: 8px 0;">
                    <label for="select-tamanho-${prod.id}" style="font-size: 0.9rem; margin-right: 5px;">Tamanho:</label>
                    <select id="select-tamanho-${prod.id}" class="select-tamanho" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc;">
                        ${opcoesTamanhoHTML}
                    </select>
                </div>

                <strong>R$ ${prod.preco.toFixed(2).replace('.', ',')}</strong>
                <button type="button" class="botao-comprar" onclick="adicionarAoCarrinho(${prod.id})">Adicionar ao carrinho</button>
            `;
            listaProdutosEl.appendChild(card);
        });

        renderizarPaginacao();
    }

    function renderizarPaginacao() {
        if (!paginacaoEl) return;
        paginacaoEl.innerHTML = '';
        const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);
        if (totalPaginas <= 1) return;

        const btnAnterior = document.createElement('button');
        btnAnterior.className = 'btn-pagina btn-nav';
        btnAnterior.textContent = '« Anterior';
        btnAnterior.disabled = paginaAtual === 1;
        btnAnterior.addEventListener('click', () => {
            if (paginaAtual > 1) {
                paginaAtual--;
                renderizarProdutos();
            }
        });
        paginacaoEl.appendChild(btnAnterior);

        for (let i = 1; i <= totalPaginas; i++) {
            const btnPagina = document.createElement('button');
            btnPagina.className = `btn-pagina ${i === paginaAtual ? 'ativa' : ''}`;
            btnPagina.textContent = i;
            btnPagina.addEventListener('click', () => {
                paginaAtual = i;
                renderizarProdutos();
            });
            paginacaoEl.appendChild(btnPagina);
        }

        const btnProximo = document.createElement('button');
        btnProximo.className = 'btn-pagina btn-nav';
        btnProximo.textContent = 'Próximo »';
        btnProximo.disabled = paginaAtual === totalPaginas;
        btnProximo.addEventListener('click', () => {
            if (paginaAtual < totalPaginas) {
                paginaAtual++;
                renderizarProdutos();
            }
        });
        paginacaoEl.appendChild(btnProximo);
    }

    window.alternarFotoProduto = function(e, id) {
        if (e) e.stopPropagation();
        const container = document.getElementById(`imagem-container-${id}`);
        if (container) {
            container.classList.toggle('mostrar-verso');
        }
    };

    // Filtros
    function aplicarFiltros() {
        const precoMaximo = filtroPrecoEl ? parseFloat(filtroPrecoEl.value) : 200;
        const tamanhosSelecionados = Array.from(checkboxesTamanho)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const coresSelecionadas = Array.from(checkboxesCor)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const tiposSelecionados = Array.from(checkboxesTipo)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        if (tiposSelecionados.length === 1 && tiposSelecionados[0] === 'moleton') {
            exibirAvisoMoleton = true;
        } else {
            exibirAvisoMoleton = false;
        }

        produtosFiltrados = produtos.filter(prod => {
            const atendePreco = prod.preco <= precoMaximo;
            const atendeCor = coresSelecionadas.length === 0 || coresSelecionadas.includes(prod.cor);
            const atendeTamanho = tamanhosSelecionados.length === 0 || 
                prod.tamanhos.some(tam => tamanhosSelecionados.includes(tam));
            const atendeTipo = tiposSelecionados.length === 0 || tiposSelecionados.includes(prod.tipo);

            return atendePreco && atendeCor && atendeTamanho && atendeTipo;
        });

        paginaAtual = 1;
        renderizarProdutos();
    }

    if (filtroPrecoEl) {
        filtroPrecoEl.addEventListener('input', (e) => {
            if (valorPrecoEl) valorPrecoEl.textContent = e.target.value;
            aplicarFiltros();
        });
    }

    checkboxesTamanho.forEach(cb => cb.addEventListener('change', aplicarFiltros));
    checkboxesCor.forEach(cb => cb.addEventListener('change', aplicarFiltros));
    checkboxesTipo.forEach(cb => cb.addEventListener('change', aplicarFiltros));

    if (btnLimparFiltros) {
        btnLimparFiltros.addEventListener('click', () => {
            checkboxesTamanho.forEach(cb => cb.checked = false);
            checkboxesCor.forEach(cb => cb.checked = false);
            checkboxesTipo.forEach(cb => cb.checked = false);
            if (filtroPrecoEl) filtroPrecoEl.value = 200;
            if (valorPrecoEl) valorPrecoEl.textContent = '200';
            exibirAvisoMoleton = false;
            aplicarFiltros();
        });
    }

    // Finalização de Pedido e Meus Pedidos
    function renderizarResumoCheckout() {
        const resumoContainer = document.getElementById('resumo-itens-container');
        const totalCheckout = document.getElementById('total-checkout');
        if (!resumoContainer || !totalCheckout) return;

        const carrinho = obterCarrinho();
        if (carrinho.length === 0) {
            resumoContainer.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
            totalCheckout.textContent = '0,00';
            return;
        }

        resumoContainer.innerHTML = '';
        let valorTotal = 0;

        carrinho.forEach(item => {
            const qtd = item.quantidade || 1;
            const subtotal = item.preco * qtd;
            valorTotal += subtotal;

            const div = document.createElement('div');
            div.className = 'resumo-item';
            div.innerHTML = `
                <span>${item.nome} (${item.tamanhoSelecionado || 'Único'}) (x${qtd})</span>
                <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
            `;
            resumoContainer.appendChild(div);
        });

        totalCheckout.textContent = valorTotal.toFixed(2).replace('.', ',');
    }

    function renderizarMeusPedidos() {
        const containerMeusPedidos = document.getElementById('conteudo-meus-pedidos');
        if (!containerMeusPedidos) return;

        const pedidos = obterPedidosDoUsuario();

        if (pedidos === null) {
            containerMeusPedidos.innerHTML = `
                <div class="mensagem-login-necessario">
                    <p>Por favor, efetue o login para visualizar seus pedidos em andamento.</p>
                    <button type="button" class="botao-comprar" onclick="abrirModalLogin()">Fazer Login</button>
                </div>
            `;
            return;
        }

        if (pedidos.length === 0) {
            containerMeusPedidos.innerHTML = `<p class="carrinho-vazio">Você ainda não realizou nenhum pedido.</p>`;
            return;
        }

        containerMeusPedidos.innerHTML = '';
        pedidos.forEach(pedido => {
            const cardPedido = document.createElement('div');
            cardPedido.className = 'card-pedido';

            let listaItensHTML = '';
            pedido.itens.forEach(item => {
                const qtd = item.quantidade || 1;
                listaItensHTML += `
                    <div class="item-pedido-linha">
                        <span>${item.nome} (${item.tamanhoSelecionado || 'Único'}) (x${qtd})</span>
                        <span>R$ ${(item.preco * qtd).toFixed(2).replace('.', ',')}</span>
                    </div>
                `;
            });

            cardPedido.innerHTML = `
                <div class="header-pedido">
                    <div>
                        <strong>Pedido #${pedido.idPedido}</strong>
                        <span class="data-pedido">${pedido.data}</span>
                    </div>
                    <span class="status-pedido">${pedido.status}</span>
                </div>
                <div class="corpo-pedido">
                    ${listaItensHTML}
                </div>
                <div class="footer-pedido">
                    <strong>Total: R$ ${pedido.total.toFixed(2).replace('.', ',')}</strong>
                </div>
            `;
            containerMeusPedidos.appendChild(cardPedido);
        });
    }

    const formCheckout = document.getElementById('form-checkout');
    if (formCheckout) {
        formCheckout.addEventListener('submit', (e) => {
            e.preventDefault();

            const usuarioLogado = localStorage.getItem('usuarioLogado');
            if (!usuarioLogado) {
                alert('Para finalizar o pedido, por favor faça o login na sua conta.');
                if (window.abrirModalLogin) window.abrirModalLogin();
                return;
            }

            const carrinhoAtual = obterCarrinho();
            if (carrinhoAtual.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }

            const valorTotal = carrinhoAtual.reduce((sum, i) => sum + i.preco * (i.quantidade || 1), 0);
            const novoPedido = {
                idPedido: Math.floor(100000 + Math.random() * 900000),
                data: new Date().toLocaleDateString('pt-BR', { 
                    day: '2-digit', month: '2-digit', year: 'numeric', 
                    hour: '2-digit', minute: '2-digit' 
                }),
                itens: carrinhoAtual,
                total: valorTotal,
                status: "Em processamento"
            };

            salvarPedidoUsuario(novoPedido);
            
            // Pop-up de confirmação
            alert("Compra realizada com sucesso! Obrigado por comprar na The King's Son. Seu pedido chegará até você de 3 à 5 dias úteis!");

            // Limpa o carrinho e atualiza as telas
            localStorage.removeItem('carrinho');
            atualizarCarrinho();
            renderizarMeusPedidos();

            // Redireciona e rola a tela até a seção #meus-pedidos
            const secaoMeusPedidos = document.getElementById('meus-pedidos');
            if (secaoMeusPedidos) {
                secaoMeusPedidos.scrollIntoView({ behavior: 'smooth' });
            }
            window.location.href = './meuspedidos.html';
        });
    }

    // Inicialização da interface
    renderizarProdutos();
    atualizarCarrinho();
    renderizarResumoCheckout();
    renderizarMeusPedidos();
});

// ==========================================
// 4. LÓGICA DE PAGAMENTO (PIX / CARTÃO)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const selectPagamento = document.getElementById("pagamento-checkout");
    const boxCartao = document.getElementById("box-pagamento-cartao");
    const boxPix = document.getElementById("box-pagamento-pix");
    const inputCodigoPix = document.getElementById("codigo-pix");
    const btnCopiarPix = document.getElementById("btn-copiar-pix");
    const mensagemCopiado = document.getElementById("mensagem-copiado");

    const camposCartaoObrigatorios = [
        document.getElementById("cartao-nome"),
        document.getElementById("cartao-bandeira"),
        document.getElementById("cartao-numero"),
        document.getElementById("cartao-cpf"),
        document.getElementById("cartao-validade"),
        document.getElementById("cartao-cvv")
    ];

    function gerarChavePixFicticia() {
        const hex = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return `0814br.thekingsson.rockyodemocão.vaicorinthians.bcb.pix.0136${hex()}${hex()}-${hex()}-4000-8000-${hex()}${hex()}520400005303986540500.005802BR5915THE KINGS SON6009SAO PAULO62070503***6304${hex().toUpperCase()}`;
    }

    if (selectPagamento) {
        selectPagamento.addEventListener("change", function () {
            const opcao = this.value;

            if (boxCartao) boxCartao.classList.add("escondido");
            if (boxPix) boxPix.classList.add("escondido");

            camposCartaoObrigatorios.forEach(campo => {
                if (campo) campo.removeAttribute("required");
            });

            if (opcao === "cartao-credito" || opcao === "cartao-debito") {
                if (boxCartao) boxCartao.classList.remove("escondido");
                camposCartaoObrigatorios.forEach(campo => {
                    if (campo) campo.setAttribute("required", "required");
                });
            } else if (opcao === "pix") {
                if (boxPix) boxPix.classList.remove("escondido");
                if (inputCodigoPix) inputCodigoPix.value = gerarChavePixFicticia();
                if (mensagemCopiado) mensagemCopiado.classList.add("escondido");
            }
        });
    }

    if (btnCopiarPix) {
        btnCopiarPix.addEventListener("click", function () {
            if (inputCodigoPix && inputCodigoPix.value) {
                navigator.clipboard.writeText(inputCodigoPix.value).then(() => {
                    if (mensagemCopiado) {
                        mensagemCopiado.classList.remove("escondido");
                        setTimeout(() => {
                            mensagemCopiado.classList.add("escondido");
                        }, 4000);
                    }
                });
            }
        });
    }
});
