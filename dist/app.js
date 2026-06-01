
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';


const SUPABASE_URL = 'https://snrjxpvmhtnbqrtnbxah.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucmp4cHZtaHRuYnFydG5ieGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwOTY2MDgsImV4cCI6MjA5NTY3MjYwOH0.NQXzenXDHgNjJ-K06qc2goDF9LX5bzp0UQcIPLY_KWU';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


let pedidosChart = null;
let vendasRelChart = null;
let faturamentoMensalChart = null;


// -------- Authentication --------
function carregarUsuarioLogado() {
  const authArea = document.getElementById('auth-area');
  const stored = localStorage.getItem('usuarioAdmin');
  if (!stored) {

    authArea.innerHTML = `<a id="btn-login" href="login.html" class="px-3 py-1 border rounded">Entrar</a>`;
    return;
  }
  const usuario = JSON.parse(stored);
  const nome = usuario.nome || usuario.email || 'Admin';
  authArea.innerHTML = `
        <div class="text-gray-700">👋 <strong>${nome}</strong></div>
        <button id="btnLogout" class="ml-3 px-3 py-1 border rounded">Sair</button>
      `;
  document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem('usuarioAdmin');
    window.location.href = 'login.html';
  });
}

// Dashboard
async function carregarDashboard() {
  try {
    const hoje = new Date();
    const seteDias = new Date();
    seteDias.setDate(hoje.getDate() - 6);

    const { data: pedidos, error } = await supabase
      .from('pedidos')
      .select('id,total,criado_em')
      .gte('criado_em', seteDias.toISOString());

    if (error) { console.error('Erro dashboard', error); return; }

    const hojeStr = new Date().toLocaleDateString();
    const pedidosHoje = pedidos.filter(p => new Date(p.criado_em).toLocaleDateString() === hojeStr);
    const totalHoje = pedidosHoje.length;
    const faturamentoHoje = pedidosHoje.reduce((s, p) => s + Number(p.total), 0);

    document.getElementById('totalPedidosHoje').innerText = totalHoje;
    document.getElementById('faturamentoHoje').innerText = 'R$ ' + faturamentoHoje.toFixed(2);

    // montar dados por dia
    const mapa = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(hoje.getDate() - i);
      mapa[new Date(d).toLocaleDateString()] = 0;
    }
    pedidos.forEach(p => {
      const k = new Date(p.criado_em).toLocaleDateString();
      if (k in mapa) mapa[k] += Number(p.total);
    });

    const labels = Object.keys(mapa);
    const values = Object.values(mapa);

    const ctx = document.getElementById('graficoVendas').getContext('2d');
    if (pedidosChart) pedidosChart.destroy();
    pedidosChart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: [{ label: 'Vendas', data: values, borderColor: '#ef4444', tension: 0.3, fill: false }] },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });

  } catch (err) {
    console.error(err);
  }
}

//  PEDIDOS
async function carregarPedidos() {
  const { data: pedidos, error } = await supabase
    .from('pedidos')
    .select('id,nome,celular,total,status,criado_em')
    .order('criado_em', { ascending: false });

  if (error) { console.error('Erro ao carregar pedidos', error); return; }

  const tbody = document.getElementById('tabelaPedidos');
  tbody.innerHTML = '';
  pedidos.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
          <td class="p-2 text-sm">${p.id}</td>
          <td class="p-2 text-sm">${p.nome}<br/><small class="text-gray-500">${p.celular}</small></td>
          <td class="p-2 text-sm">R$ ${Number(p.total).toFixed(2)}</td>
          <td class="p-2 text-sm">
            <select data-id="${p.id}" class="border rounded px-2 py-1 status-select">
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
              <option value="entregando">Entregando</option>
              <option value="concluido">Concluído</option>
            </select>
          </td>
          <td class="p-2 text-sm">
            <button class="px-3 py-1 bg-red-600 text-white rounded" onclick="verPedido(${p.id})">Detalhes</button>
          </td>
        `;
    tbody.appendChild(tr);

    // define o status selecionado
    const sel = tr.querySelector('.status-select');
    sel.value = p.status || 'pendente';
    sel.addEventListener('change', async (e) => {
      const novo = e.target.value;
      try {
        await supabase.from('pedidos').update({ status: novo }).eq('id', p.id);

      } catch (err) {
        console.error('Erro atualizando status', err);
        alert('Erro ao atualizar status');
      }
    });
  });
}

// abrir modal simples de detalhes 
window.verPedido = async function (id) {
  const { data: pedido, error } = await supabase.from('pedidos').select('*').eq('id', id).maybeSingle();
  if (error || !pedido) { alert('Pedido não encontrado'); return; }
  const { data: itens } = await supabase.from('pedido_itens').select('*').eq('pedido_id', id);

  let html = `<div class="mb-3"><strong>Cliente:</strong> ${pedido.nome} (${pedido.celular})</div>`;
  html += `<div class="mb-3"><strong>Endereço:</strong> ${pedido.endereco}</div>`;
  html += `<div class="mb-3"><strong>Pagamento:</strong> ${pedido.pagamento} - Troco: ${pedido.troco}</div>`;
  html += `<div class="mb-3"><strong>Total:</strong> R$ ${Number(pedido.total).toFixed(2)}</div>`;
  html += '<div class="mb-2"><strong>Itens:</strong><ul class="pl-4">';
  itens.forEach(i => html += `<li>${i.quantidade} x ${i.nome_item} - R$ ${Number(i.preco).toFixed(2)} ${i.observacao ? '- (' + i.observacao + ')' : ''}</li>`);
  html += '</ul></div>';

  showModalHtml(html);
};


function showModalHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = `<div class="fixed inset-0 z-60 flex items-center justify-center modal-backdrop">
        <div class="bg-white rounded-xl shadow-lg w-full max-w-xl p-6">
          <div class="mb-4">${html}</div>
          <div class="text-right"><button class="px-4 py-2 border rounded" onclick="document.body.removeChild(this.closest('.modal-backdrop'))">Fechar</button></div>
        </div>
      </div>`;
  document.body.appendChild(tmp.firstChild);
}

//  PRODUTOS (CRUD modal) 
function abrirModalProduto() {
  document.getElementById('produtoId').value = '';
  document.getElementById('modalProdutoTitle').innerText = 'Novo Produto';
  document.getElementById('produtoNome').value = '';
  document.getElementById('produtoPreco').value = '';
  document.getElementById('produtoEstoque').value = '';
  document.getElementById('produtoImg').value = '';
  document.getElementById('produtoDescricao').value = '';
  document.getElementById('modalProdutoBackdrop').classList.remove('hidden');
}
function fecharModalProduto() { document.getElementById('modalProdutoBackdrop').classList.add('hidden'); }

async function carregarProdutos() {
  const { data: produtos, error } = await supabase.from('produtos').select('id,nome,preco,estoque,img').order('nome');
  if (error) { console.error('Erro produtos', error); return; }
  const tbody = document.getElementById('tabelaProdutos');
  tbody.innerHTML = '';
  produtos.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
          <td class="p-2"><img src="${p.img || 'https://via.placeholder.com/80'}" class="w-16 h-16 object-cover rounded"></td>
          <td class="p-2">${p.nome}</td>
          <td class="p-2">R$ ${Number(p.preco).toFixed(2)}</td>
          <td class="p-2">${p.estoque ?? 0}</td>
          <td class="p-2">
            <button class="px-3 py-1 bg-yellow-500 text-white rounded mr-2" onclick="editarProdutoModal(${p.id})">Editar</button>
            <button class="px-3 py-1 bg-red-600 text-white rounded" onclick="deletarProduto(${p.id})">Excluir</button>
          </td>
        `;
    tbody.appendChild(tr);
  });
}

async function editarProdutoModal(id) {
  const { data: p, error } = await supabase.from('produtos').select('*').eq('id', id).maybeSingle();
  if (error || !p) { alert('Produto não encontrado'); return; }
  document.getElementById('produtoId').value = p.id;
  document.getElementById('modalProdutoTitle').innerText = 'Editar Produto';
  document.getElementById('produtoNome').value = p.nome;
  document.getElementById('produtoPreco').value = p.preco;
  document.getElementById('produtoEstoque').value = p.estoque;
  document.getElementById('produtoImg').value = p.img || '';
  document.getElementById('modalProdutoBackdrop').classList.remove('hidden');
}

async function salvarProduto() {
  const id = document.getElementById('produtoId').value;
  const nome = document.getElementById('produtoNome').value.trim();
  const preco = parseFloat(document.getElementById('produtoPreco').value) || 0;
  const estoque = parseInt(document.getElementById('produtoEstoque').value) || 0;
  const img = document.getElementById('produtoImg').value.trim();
  const descricao = document.getElementById('produtoDescricao').value.trim();

  if (!nome) { alert('Informe o nome'); return; }

  if (id) {
    const { error } = await supabase.from('produtos').update({ nome, preco, estoque, img, descricao }).eq('id', id);
    if (error) { console.error(error); alert('Erro ao atualizar'); return; }
  } else {
    const { error } = await supabase.from('produtos').insert([{ nome, preco, estoque, img, descricao }]);
    if (error) { console.error(error); alert('Erro ao criar'); return; }
  }

  fecharModalProduto();
  carregarProdutos();
}

window.deletarProduto = async function (id) {
  if (!confirm('Excluir este produto?')) return;
  const { error } = await supabase.from('produtos').delete().eq('id', id);
  if (error) { console.error(error); alert('Erro ao excluir'); return; }
  carregarProdutos();
};

// USUÁRIOS 
function abrirModalUsuario() { document.getElementById('modalUsuarioBackdrop').classList.remove('hidden'); }
function fecharModalUsuario() { document.getElementById('modalUsuarioBackdrop').classList.add('hidden'); }

async function carregarUsuarios() {
  const { data: usuarios, error } = await supabase.from('usuarios').select('id,nome,email,telefone,isAdmin,created_at').order('created_at', { ascending: false });
  if (error) { console.error('Erro usuarios', error); return; }
  const tbody = document.getElementById('tabelaUsuarios'); tbody.innerHTML = '';
  usuarios.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
          <td class="p-2">${u.nome}</td>
          <td class="p-2">${u.email}</td>
          <td class="p-2">${u.telefone || '-'}</td>
          <td class="p-2">${u.isAdmin ? '✅' : '❌'}</td>
          <td class="p-2">${new Date(u.created_at).toLocaleDateString()}</td>
          <td class="p-2">
            <button class="px-3 py-1 bg-yellow-500 text-white rounded mr-2" onclick="editarUsuario('${u.id}')">Editar</button>
            <button class="px-3 py-1 bg-red-600 text-white rounded" onclick="deletarUsuario('${u.id}')">Excluir</button>
          </td>
        `;
    tbody.appendChild(tr);
  });
}

window.editarUsuario = async function (id) {
  const { data: u, error } = await supabase.from('usuarios').select('*').eq('id', id).maybeSingle();
  if (error || !u) { alert('Usuário não encontrado'); return; }
  document.getElementById('usuarioId').value = u.id;
  document.getElementById('usuarioNome').value = u.nome;
  document.getElementById('usuarioEmail').value = u.email;
  document.getElementById('usuarioTelefone').value = u.telefone || '';
  document.getElementById('usuarioIsAdmin').checked = !!u.isAdmin;
  abrirModalUsuario();
}

window.salvarUsuario = async function () {
  const id = document.getElementById('usuarioId').value;
  const nome = document.getElementById('usuarioNome').value.trim();
  const email = document.getElementById('usuarioEmail').value.trim();
  const telefone = document.getElementById('usuarioTelefone').value.trim();
  const isAdmin = document.getElementById('usuarioIsAdmin').checked;

  if (!nome || !email) { alert('Preencha nome e email'); return; }
  const { error } = await supabase.from('usuarios').update({ nome, email, telefone, isAdmin }).eq('id', id);
  if (error) { console.error(error); alert('Erro ao salvar usuário'); return; }
  fecharModalUsuario();
  carregarUsuarios();
}

window.deletarUsuario = async function (id) {
  if (!confirm('Excluir este usuário?')) return;
  const { error } = await supabase.from('usuarios').delete().eq('id', id);
  if (error) { console.error(error); alert('Erro ao excluir usuário'); return; }
  carregarUsuarios();
}

//  CUPONS (CRUD)
function abrirModalCupom() {
  document.getElementById('cupomId').value = '';
  document.getElementById('modalCupomTitle').innerText = 'Novo Cupom';
  document.getElementById('cupomCodigo').value = '';
  document.getElementById('cupomDesconto').value = '';
  document.getElementById('cupomTipo').value = 'valor';
  document.getElementById('cupomAtivo').checked = true;
  document.getElementById('modalCupomBackdrop').classList.remove('hidden');
}
function fecharModalCupom() { document.getElementById('modalCupomBackdrop').classList.add('hidden'); }

async function carregarCupons() {
  const { data, error } = await supabase.from('cupons').select('*').order('id', { ascending: false });
  if (error) { console.error('Erro cupons', error); return; }
  const tbody = document.getElementById('tabelaCupons'); tbody.innerHTML = '';
  data.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
          <td class="p-2">${c.codigo}</td>
          <td class="p-2">${c.tipo}</td>
          <td class="p-2">${c.tipo === 'percentual' ? c.desconto + '%' : 'R$ ' + c.desconto}</td>
          <td class="p-2">${c.ativo ? '✅' : '❌'}</td>
          <td class="p-2">
            <button class="px-3 py-1 bg-yellow-500 text-white rounded mr-2" onclick="editarCupom(${c.id})">Editar</button>
            <button class="px-3 py-1 bg-red-600 text-white rounded" onclick="deletarCupom(${c.id})">Excluir</button>
          </td>
        `;
    tbody.appendChild(tr);
  });
}

window.editarCupom = async function (id) {
  const { data, error } = await supabase.from('cupons').select('*').eq('id', id).maybeSingle();
  if (error || !data) { alert('Cupom não encontrado'); return; }
  document.getElementById('cupomId').value = data.id;
  document.getElementById('modalCupomTitle').innerText = 'Editar Cupom';
  document.getElementById('cupomCodigo').value = data.codigo;
  document.getElementById('cupomDesconto').value = data.desconto;
  document.getElementById('cupomTipo').value = data.tipo;
  document.getElementById('cupomAtivo').checked = data.ativo;
  document.getElementById('modalCupomBackdrop').classList.remove('hidden');
}

async function salvarCupom() {
  const id = document.getElementById('cupomId').value;
  const codigo = document.getElementById('cupomCodigo').value.trim();
  const desconto = parseFloat(document.getElementById('cupomDesconto').value) || 0;
  const tipo = document.getElementById('cupomTipo').value;
  const ativo = document.getElementById('cupomAtivo').checked;

  if (!codigo || !desconto) { alert('Preencha os campos'); return; }

  if (id) {
    const { error } = await supabase.from('cupons').update({ codigo, desconto, tipo, ativo }).eq('id', id);
    if (error) { console.error(error); alert('Erro ao atualizar cupom: ' + error.message); return; }
  } else {
    const { error } = await supabase.from('cupons').insert([{ codigo, desconto, tipo, ativo }]);
    if (error) { console.error(error); alert('Erro ao criar cupom: ' + error.message); return; }
  }
  fecharModalCupom();
  carregarCupons();
}

window.deletarCupom = async function (id) {
  if (!confirm('Excluir este cupom?')) return;
  const { error } = await supabase.from('cupons').delete().eq('id', id);
  if (error) { console.error(error); alert('Erro ao excluir cupom'); return; }
  carregarCupons();
}

//  RELATÓRIOS 
async function carregarRelatorios() {
  // vendas últimos 7 dias (por dia)
  const hoje = new Date();
  const seteDias = new Date();
  seteDias.setDate(hoje.getDate() - 6);

  const [{ data: pedidos }, pedidosErr] = await Promise.all([
    supabase.from('pedidos').select('id,total,criado_em').gte('criado_em', seteDias.toISOString()),
  ]).then(res => res).catch(e => { console.error(e); return []; });

  // montar mapa 7 dias
  const mapa = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(hoje.getDate() - i);
    mapa[new Date(d).toLocaleDateString()] = 0;
  }
  if (pedidos) pedidos.forEach(p => {
    const k = new Date(p.criado_em).toLocaleDateString();
    if (k in mapa) mapa[k] += Number(p.total);
  });

  // grafico vendas diarios
  const labels = Object.keys(mapa);
  const values = Object.values(mapa);
  const ctxV = document.getElementById('graficoVendasRel').getContext('2d');
  if (vendasRelChart) vendasRelChart.destroy();
  vendasRelChart = new Chart(ctxV, { type: 'line', data: { labels, datasets: [{ label: 'Vendas', data: values, borderColor: '#ef4444', fill: false }] }, options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } } });

  // faturamento mensal (ultimos 6 meses)
  const meses = [];
  const valoresMes = [];
  for (let m = 5; m >= 0; m--) {
    const d = new Date();
    d.setMonth(hoje.getMonth() - m);
    const key = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}`;
    meses.push(key);
    valoresMes.push(0);
  }
  // pegar pedidos ultimos 6 meses
  const seisMeses = new Date();
  seisMeses.setMonth(hoje.getMonth() - 5);
  const { data: pedidos6, error: err6 } = await supabase.from('pedidos').select('id,total,criado_em').gte('criado_em', seisMeses.toISOString());
  if (err6) { console.error(err6); }
  if (pedidos6) pedidos6.forEach(p => {
    const d = new Date(p.criado_em);
    const key = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}`;
    const idx = meses.indexOf(key);
    if (idx >= 0) valoresMes[idx] += Number(p.total);
  });

  const ctxF = document.getElementById('graficoFaturamentoMensal').getContext('2d');
  if (faturamentoMensalChart) faturamentoMensalChart.destroy();
  faturamentoMensalChart = new Chart(ctxF, { type: 'bar', data: { labels: meses, datasets: [{ label: 'Faturamento (R$)', data: valoresMes, backgroundColor: '#ef4444' }] }, options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } } });

  // produtos mais/menos vendidos (agrupar por pedido_itens)
  const { data: itens, error: itensErr } = await supabase.from('pedido_itens').select('nome_item,quantidade');
  if (itensErr) { console.error(itensErr); return; }
  const ranking = {};
  itens.forEach(i => ranking[i.nome_item] = (ranking[i.nome_item] || 0) + Number(i.quantidade));
  const sorted = Object.entries(ranking).sort((a, b) => b[1] - a[1]);
  const mais = sorted.slice(0, 10);
  const menos = sorted.slice().reverse().slice(0, 10);

  // render listas
  const elMais = document.getElementById('maisVendidos');
  const elMenos = document.getElementById('menosVendidos');
  elMais.innerHTML = '';
  elMenos.innerHTML = '';
  mais.forEach(([nome, qtd]) => { const li = document.createElement('li'); li.textContent = `${nome} — ${qtd}`; elMais.appendChild(li); });
  menos.forEach(([nome, qtd]) => { const li = document.createElement('li'); li.textContent = `${nome} — ${qtd}`; elMenos.appendChild(li); });
}

// mostrar/ocultar abas 
function setupNavigation() {
  const anchors = document.querySelectorAll('#sidebar a.nav-link');
  anchors.forEach(a => {
    a.addEventListener('click', (e) => {
      // evita o comportamento
      e.preventDefault();
      const href = a.getAttribute('href') || '#dashboard';
      const id = href.replace('#', '');
      showSection(id);
      // atualiza o hash da url
      history.replaceState(null, '', '#' + id);
    });
  });

  // ao carregar, mostrar seção com base no hash
  const initial = location.hash ? location.hash.replace('#', '') : 'dashboard';
  showSection(initial);
}

function showSection(sectionId) {
  const sections = ['dashboard', 'pedidos', 'produtos', 'usuarios', 'cupons', 'relatorios'];
  sections.forEach(s => {
    const el = document.getElementById(s);
    if (!el) return;
    if (s === sectionId) el.classList.remove('hidden'); else el.classList.add('hidden');
  });

  // se alternar para relatórios, atualize os dados
  if (sectionId === 'relatorios') carregarRelatorios();
  if (sectionId === 'cupons') carregarCupons();
  if (sectionId === 'dashboard') carregarDashboard();
  if (sectionId === 'pedidos') carregarPedidos();
  if (sectionId === 'produtos') carregarProdutos();
  if (sectionId === 'usuarios') carregarUsuarios();
}





// proteção para nao logados
const usuarioAdmin = localStorage.getItem("usuarioAdmin")
if (!usuarioAdmin) {
  window.location.href = "login.html"
}

// INIT 

window.abrirModalProduto = abrirModalProduto;
window.fecharModalProduto = fecharModalProduto;
window.salvarProduto = salvarProduto;
window.editarProdutoModal = editarProdutoModal;
window.deletarProduto = window.deletarProduto;

window.abrirModalUsuario = abrirModalUsuario;
window.fecharModalUsuario = fecharModalUsuario;
window.salvarUsuario = salvarUsuario;
window.editarUsuario = window.editarUsuario;
window.deletarUsuario = window.deletarUsuario;

window.abrirModalCupom = abrirModalCupom;
window.fecharModalCupom = fecharModalCupom;
window.salvarCupom = salvarCupom;
window.editarCupom = window.editarCupom;
window.deletarCupom = window.deletarCupom;

window.verPedido = window.verPedido;

window.carregarPedidos = carregarPedidos;





// start
(async function init() {
  carregarUsuarioLogado();
  await carregarDashboard();
  await carregarPedidos();
  await carregarProdutos();
  await carregarUsuarios();
  await carregarCupons();
  setupNavigation();

})();

