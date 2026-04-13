// ╔══════════════════════════════════════════════╗
// ║  PEGA TUS CREDENCIALES DE SUPABASE AQUÍ      ║
// ╚══════════════════════════════════════════════╝
const SUPABASE_URL      = 'https://qlrdebzfxpurhzggaqzi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFscmRlYnpmeHB1cmh6Z2dhcXppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTc4NjEsImV4cCI6MjA5MTA5Mzg2MX0.ieVrQLa2lJlLSk-jjEh0OOnVsva-tzvSgZ2yesy8IEU';
// ════════════════════════════════════════════════

const { createClient } = supabase;
const sbClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let cart = [];

const formatPrice = (price) => new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0
}).format(price);

function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) { existing.quantity += 1; }
    else { cart.push({ name, price, quantity: 1 }); }
    updateCartUI();
    showToast(`Agregaste: ${name}`);
}

function changeQuantity(name, change) {
    const idx = cart.findIndex(i => i.name === name);
    if (idx > -1) {
        cart[idx].quantity += change;
        if (cart[idx].quantity <= 0) cart.splice(idx, 1);
    }
    updateCartUI();
}

function updateCartUI() {
    const total = cart.reduce((s, i) => s + i.quantity, 0);
    document.getElementById('cart-count').innerText = total;

    const container = document.getElementById('cart-items');
    if (!cart.length) {
        container.innerHTML = '<p class="empty-msg">Tu carrito está vacío.</p>';
        document.getElementById('cart-total').innerText = '$0';
        return;
    }

    let html = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        html += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <div class="controls">
                        <button class="btn-qty" onclick="changeQuantity('${item.name}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn-qty" onclick="changeQuantity('${item.name}', 1)">+</button>
                    </div>
                </div>
                <div class="item-price">${formatPrice(itemTotal)}</div>
            </div>`;
    });
    container.innerHTML = html;
    document.getElementById('cart-total').innerText = formatPrice(totalPrice);
}

function openModal()  { document.getElementById('checkout-modal').classList.add('active'); }
function closeModal() { document.getElementById('checkout-modal').classList.remove('active'); }

async function sendOrder() {
    if (!cart.length) { alert('¡Tu carrito está vacío!'); return; }

    const cfg = JSON.parse(localStorage.getItem('rb_config') || '{}');
    const phone = cfg.whatsapp || '573244652909';

    let itemsText  = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const t = item.price * item.quantity;
        totalPrice += t;
        itemsText += `  - ${item.quantity}x ${item.name} (${formatPrice(t)})\n`;
    });

    const mensaje = `🍔 *MI PEDIDO:*\n${itemsText}\n*Total: ${formatPrice(totalPrice)}*\n\nPor favor indícame:\n• Tu nombre completo:\n• Celular:\n• Dirección (o "paso a recoger"):\n• ¿Bolsita de tártara y piña? (Sí/No):\n\n⚠️ _Una vez asignado el turno no se pueden hacer cambios al pedido._`;

    // Guardar pedido en Supabase silenciosamente
    try {
        await sbClient.from('pedidos').insert({
            items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
            total: totalPrice
        });
    } catch(e) {
        console.warn('No se pudo guardar el pedido:', e.message);
    }

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`, '_blank');
}

function showToast(msg) {
    let old = document.querySelector('.toast');
    if (old) old.remove();
    const t = document.createElement('div');
    t.className = 'toast';
    t.style.cssText = `position:fixed; top:20px; right:20px; background-color:var(--primary); color:white;
        padding:15px 25px; border-radius:8px; z-index:9999; font-family:var(--font-heading);
        font-size:1.1rem; box-shadow:0 4px 15px rgba(0,0,0,0.4); transition:opacity 0.5s ease;`;
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity='0'; setTimeout(()=>t.remove(), 500); }, 2000);
}