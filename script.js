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

    // Verificação de Sessão do Usuário
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
// 3. PRODUTOS, FILTROS, CARRINHO E CHECKOUT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const produtos = [
        { id: 1, nome: "Camiseta Leão de Judá", preco: 79.90, cor: "preto", tamanhos: ["P", "M", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 2, nome: "Camiseta Grace & Peace", preco: 69.90, cor: "branco", tamanhos: ["M", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 3, nome: "Camiseta Faith Minimalist", preco: 89.90, cor: "cinza", tamanhos: ["P", "M", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 4, nome: "Camiseta King of Kings", preco: 99.90, cor: "bege", tamanhos: ["M", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 5, nome: "Camiseta Cruz & Coroa", preco: 74.90, cor: "preto", tamanhos: ["P", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 6, nome: "Camiseta Blessed", preco: 59.90, cor: "branco", tamanhos: ["P", "M", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 7, nome: "Camiseta Chosen Generation", preco: 110.00, cor: "cinza", tamanhos: ["M", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 8, nome: "Camiseta Redeemed", preco: 85.00, cor: "bege", tamanhos: ["P", "M", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 9, nome: "Camiseta Luz do Mundo", preco: 65.00, cor: "preto", tamanhos: ["P", "M", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 10, nome: "Camiseta Sal da Terra", preco: 75.00, cor: "branco", tamanhos: ["M", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 11, nome: "Camiseta Amor Incondicional", preco: 95.00, cor: "cinza", tamanhos: ["P", "M", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 12, nome: "Camiseta Princípio & Fim", preco: 105.00, cor: "bege", tamanhos: ["M", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 13, nome: "Camiseta Cordeiro e Leão", preco: 89.90, cor: "preto", tamanhos: ["P", "M", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 14, nome: "Camiseta Graça Suficiente", preco: 69.90, cor: "branco", tamanhos: ["P", "M"], imagem: "./imagens/produto1.jpg" },
        { id: 15, nome: "Camiseta Monte Sião", preco: 79.90, cor: "cinza", tamanhos: ["G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 16, nome: "Camiseta Filho do Rei", preco: 115.00, cor: "bege", tamanhos: ["P", "M", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 17, nome: "Camiseta Avivamento", preco: 82.00, cor: "preto", tamanhos: ["M", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 18, nome: "Camiseta Nova Criatura", preco: 62.00, cor: "branco", tamanhos: ["P", "M", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 19, nome: "Camiseta Rocha Eterna", preco: 88.00, cor: "cinza", tamanhos: ["P", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 20, nome: "Camiseta Caminho, Verdade & Vida", preco: 98.00, cor: "bege", tamanhos: ["M", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 21, nome: "Camiseta Messias Oversized", preco: 120.00, cor: "preto", tamanhos: ["M", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 22, nome: "Camiseta Emanuel", preco: 72.00, cor: "branco", tamanhos: ["P", "M", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 23, nome: "Camiseta Santidade ao Senhor", preco: 84.90, cor: "cinza", tamanhos: ["P", "M", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 24, nome: "Camiseta Promessa", preco: 92.00, cor: "bege", tamanhos: ["M", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 25, nome: "Camiseta Alpha & Omega", preco: 78.00, cor: "preto", tamanhos: ["P", "M", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 26, nome: "Camiseta Ressurreição", preco: 68.00, cor: "branco", tamanhos: ["M", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 27, nome: "Camiseta Soldado da Cruz", preco: 86.00, cor: "cinza", tamanhos: ["P", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 28, nome: "Camiseta Reconciliação", preco: 94.00, cor: "bege", tamanhos: ["P", "M", "G"], imagem: "./imagens/produto1.jpg" },
        { id: 29, nome: "Camiseta Yahweh", preco: 108.00, cor: "preto", tamanhos: ["M", "G", "GG"], imagem: "./imagens/produto1.jpg" },
        { id: 30, nome: "Camiseta Grace & Peace", preco: 69.90, cor: "branco", tamanhos: ["M", "G"], imagem: "./imagens/produto1.jpg" }
    ];

    // Estados da Aplicação
    let produtosFiltrados = [...produtos];
    let paginaAtual = 1;
    const itensPorPagina = 4;

    // --- GERENCIAMENTO DE STORAGE DO CARRINHO ---
    function obterCarrinho() {
        return JSON.parse(localStorage.getItem('carrinho')) || [];
    }

    function salvarCarrinho(carrinho) {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    // Elementos do DOM - Catálogo e Filtros
    const listaProdutosEl = document.getElementById('lista-produtos');
    const paginacaoEl = document.getElementById('paginacao');
    const filtroPrecoEl = document.getElementById('filtro-preco');
    const valorPrecoEl = document.getElementById('valor-preco');
    const checkboxesTamanho = document.querySelectorAll('input[name="tamanho"]');
    const checkboxesCor = document.querySelectorAll('input[name="cor"]');
    const btnLimparFiltros = document.getElementById('limpar-filtros');

    // Elementos do DOM - Carrinho Modal
    const btnCarrinho = document.getElementById('botao-carrinho');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const btnFecharCarrinho = document.getElementById('fechar-carrinho');
    const itensCarrinhoEl = document.getElementById('itens-carrinho');
    const contadorCarrinhoEl = document.getElementById('contador-carrinho');
    const totalCarrinhoEl = document.getElementById('total-carrinho');

    // Abrir e fechar carrinho lateral
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

        carrinhoModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Esc') {
                fecharCarrinho();
            }
        });
    }

    // --- MÉTODOS DO CARRINHO ---
    window.adicionarAoCarrinho = function(itemOuId) {
        let carrinho = obterCarrinho();
        let produto;

        if (typeof itemOuId === 'object' && itemOuId !== null) {
            produto = itemOuId;
        } else {
            produto = produtos.find(p => p.id === itemOuId);
        }

        if (!produto) return;

        const itemExistente = carrinho.find(i => i.id === produto.id);
        if (itemExistente) {
            itemExistente.quantidade = (itemExistente.quantidade || 1) + 1;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
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
                        <img src="${item.imagem}" alt="${item.nome}">
                        <div class="detalhes-item">
                            <h4>${item.nome}</h4>
                            <p>R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                            <div class="controles-qtd">
                                <button type="button" onclick="alterarQuantidade(event, ${item.id}, -1)">-</button>
                                <span>${qtd}</span>
                                <button type="button" onclick="alterarQuantidade(event, ${item.id}, 1)">+</button>
                            </div>
                        </div>
                        <button type="button" class="remover-item" onclick="removerDoCarrinho(event, ${item.id})">&times;</button>
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

    window.alterarQuantidade = function(e, id, mudanca) {
        if (e) e.stopPropagation();
        let carrinho = obterCarrinho();
        const item = carrinho.find(i => i.id === id);
        if (item) {
            item.quantidade = (item.quantidade || 1) + mudanca;
            if (item.quantidade <= 0) {
                carrinho = carrinho.filter(i => i.id !== id);
            }
            salvarCarrinho(carrinho);
            atualizarCarrinho();
            renderizarResumoCheckout();
        }
    };

    window.removerDoCarrinho = function(e, id) {
        if (e) e.stopPropagation();
        let carrinho = obterCarrinho();
        carrinho = carrinho.filter(item => item.id !== id);
        salvarCarrinho(carrinho);
        atualizarCarrinho();
        renderizarResumoCheckout();
    };

    // Redirecionamento do Botão de Finalizar Compra no Modal
    const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');
    if (btnFinalizarCompra) {
        btnFinalizarCompra.addEventListener('click', (e) => {
            const carrinho = obterCarrinho();
            if (!carrinho || carrinho.length === 0) {
                e.preventDefault();
                alert('Seu carrinho está vazio! Adicione produtos antes de finalizar.');
            }
        });
    }

    // --- TELA DE CHECKOUT ---
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
                <span>${item.nome} (x${qtd})</span>
                <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
            `;
            resumoContainer.appendChild(div);
        });

        totalCheckout.textContent = valorTotal.toFixed(2).replace('.', ',');
    }

    const formCheckout = document.getElementById('form-checkout');
    if (formCheckout) {
        formCheckout.addEventListener('submit', (e) => {
            e.preventDefault();

            const carrinhoAtual = obterCarrinho();
            if (carrinhoAtual.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }

            alert("Compra realizada com sucesso! Obrigado por comprar na The King's Son. Seu pedido chegará no endereço informado de 3 a 5 dias úteis!!");
            localStorage.removeItem('carrinho');
            window.location.href = 'index.html';
        });
    }

    // --- RENDERIZAÇÃO E PAGINAÇÃO DO CATÁLOGO ---
    function renderizarProdutos() {
        if (!listaProdutosEl) return;
        listaProdutosEl.innerHTML = '';
        if (produtosFiltrados.length === 0) {
            listaProdutosEl.innerHTML = '<p class="sem-produtos">Nenhuma camiseta encontrada com os filtros selecionados.</p>';
            if (paginacaoEl) paginacaoEl.innerHTML = '';
            return;
        }
        const inicio = (paginaAtual - 1) * itensPorPagina;
        const fim = inicio + itensPorPagina;
        const produtosPagina = produtosFiltrados.slice(inicio, fim);
        produtosPagina.forEach(prod => {
            const card = document.createElement('article');
            card.className = 'card-produto';
            card.innerHTML = `
                <img src="${prod.imagem}" alt="${prod.nome}" class="imagem-produto">
                <div class="info-produto">
                    <h3 class="nome-produto">${prod.nome}</h3>
                    <p class="detalhes-produto">Tamanhos: ${prod.tamanhos.join(', ')}</p>
                    <p class="preco-produto">R$ ${prod.preco.toFixed(2).replace('.', ',')}</p>
                    <button type="button" class="botao-comprar" onclick="adicionarAoCarrinho(${prod.id})">Adicionar ao Carrinho</button>
                </div>
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
                document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
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
                document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
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
                document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
            }
        });
        paginacaoEl.appendChild(btnProximo);
    }

    // --- FILTRAGEM DE PRODUTOS ---
    function aplicarFiltros() {
        const precoMaximo = parseFloat(filtroPrecoEl.value);
        const tamanhosSelecionados = Array.from(checkboxesTamanho)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const coresSelecionadas = Array.from(checkboxesCor)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        produtosFiltrados = produtos.filter(prod => {
            const atendePreco = prod.preco <= precoMaximo;
            const atendeCor = coresSelecionadas.length === 0 || coresSelecionadas.includes(prod.cor);
            const atendeTamanho = tamanhosSelecionados.length === 0 || 
                prod.tamanhos.some(tam => tamanhosSelecionados.includes(tam));
            return atendePreco && atendeCor && atendeTamanho;
        });
        paginaAtual = 1;
        renderizarProdutos();
    }

    if (filtroPrecoEl) {
        filtroPrecoEl.addEventListener('input', (e) => {
            valorPrecoEl.textContent = e.target.value;
            aplicarFiltros();
        });
    }
    checkboxesTamanho.forEach(cb => cb.addEventListener('change', aplicarFiltros));
    checkboxesCor.forEach(cb => cb.addEventListener('change', aplicarFiltros));
    if (btnLimparFiltros) {
        btnLimparFiltros.addEventListener('click', () => {
            checkboxesTamanho.forEach(cb => cb.checked = false);
            checkboxesCor.forEach(cb => cb.checked = false);
            filtroPrecoEl.value = 200;
            valorPrecoEl.textContent = '200';
            aplicarFiltros();
        });
    }

    // --- INICIALIZAÇÃO DA PÁGINA ---
    renderizarProdutos();
    atualizarCarrinho();
    renderizarResumoCheckout();
});



document.addEventListener("DOMContentLoaded", function () {
    const selectPagamento = document.getElementById("pagamento-checkout");
    const boxCartao = document.getElementById("box-pagamento-cartao");
    const boxPix = document.getElementById("box-pagamento-pix");
    const inputCodigoPix = document.getElementById("codigo-pix");
    const btnCopiarPix = document.getElementById("btn-copiar-pix");
    const mensagemCopiado = document.getElementById("mensagem-copiado");

    // Seleção de campos do cartão para alternar obrigatoriedade
    const camposCartaoObrigatorios = [
        document.getElementById("cartao-nome"),
        document.getElementById("cartao-bandeira"),
        document.getElementById("cartao-numero"),
        document.getElementById("cartao-cpf"),
        document.getElementById("cartao-validade"),
        document.getElementById("cartao-cvv")
    ];

    // Gerador de Payload Pix Estático Fictício (Padrão EMV Co / BR Code)
    function gerarChavePixFicticia() {
        const hex = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return `00020126580014br.thekingsson.bcb.rocky.vaicorithians.pix.0136${hex()}${hex()}-${hex()}-4000-8000-${hex()}${hex()}520400005303986540500.005802BR5915THE KINGS SON6009SAO PAULO62070503***6304${hex().toUpperCase()}`;
    }

    if (selectPagamento) {
        selectPagamento.addEventListener("change", function () {
            const opcao = this.value;

            // Oculta ambas as boxes inicialmente
            boxCartao.classList.add("escondido");
            boxPix.classList.add("escondido");

            // Remove a obrigatoriedade dos campos de cartão
            camposCartaoObrigatorios.forEach(campo => {
                if (campo) campo.removeAttribute("required");
            });

            if (opcao === "cartao-credito" || opcao === "cartao-debito") {
                boxCartao.classList.remove("escondido");
                // Adiciona obrigatoriedade apenas quando a box estiver visível
                camposCartaoObrigatorios.forEach(campo => {
                    if (campo) campo.setAttribute("required", "required");
                });
            } else if (opcao === "pix") {
                boxPix.classList.remove("escondido");
                // Gera o código fictício Pix Copia e Cola
                inputCodigoPix.value = gerarChavePixFicticia();
                mensagemCopiado.classList.add("escondido");
            }
        });
    }

    // Funcionalidade do botão Copiar Pix
    if (btnCopiarPix) {
        btnCopiarPix.addEventListener("click", function () {
            if (inputCodigoPix && inputCodigoPix.value) {
                navigator.clipboard.writeText(inputCodigoPix.value).then(() => {
                    mensagemCopiado.classList.remove("escondido");
                    setTimeout(() => {
                        mensagemCopiado.classList.add("escondido");
                    }, 4000);
                });
            }
        });
    }
});