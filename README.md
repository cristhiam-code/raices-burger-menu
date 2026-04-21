# 🔥 Raíces Burger — Menú Digital

> Menú digital profesional para restaurantes con panel de administración, pedidos por WhatsApp y base de datos en la nube.

**🌐 Demostración en vivo:** [raices-burger.netlify.app](https://raices-burger.netlify.app/)

---

## 📱 Vista previa

| Menú del cliente | Panel Admin |
|---|---|
| Slider automático con fotos | Dashboard de ventas |
| Categorías navegables | Gestión de productos |
| Carrito de pedidos | Historial de pedidos |
| Modo claro/oscuro | Registro de clientes |

---

## ✨ Características

### Para el cliente
- 🎠 Slider automático con los productos destacados
- 📌 Barra de categorías fija (Hamburguesas, Perros, Salchipapas, Bebidas)
- 🛒 Carrito de pedidos con resumen
- 📱 Envío de pedido por WhatsApp con un clic
- 🌙 Modo claro/oscuro
- 🕐 Estado de horario en tiempo real (abierto/cerrado)
- 📍 Footer con horario, dirección y redes sociales

### Para el administrador
- 🔐 Login seguro con Supabase Auth
- 📊 Dashboard: ventas del día, ticket promedio, gráfica de 7 días, top productos
- 🍔 Gestión completa de productos (crear, editar, eliminar)
- 📷 Subida de fotos directo al servidor (Supabase Storage)
- 🚫 Marcar productos como agotados
- 📋 Historial de pedidos con exportación a CSV
- 👥 Registro de clientes
- ⚙️ Configuración del negocio (colores, logo, WhatsApp, Nequi)

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML + CSS + JavaScript | Frontend (sin frameworks) |
| [Supabase](https://supabase.com) | Base de datos, Auth y Storage |
| [Netlify](https://netlify.com) | Hosting y despliegue |

---

## 🚀 Instalación

### 1. Clona el repositorio
```bash
git clone https://github.com/TU_USUARIO/raices-burger-menu.git
cd raices-burger-menu
```

### 2. Configura Supabase

Crea un proyecto en [supabase.com](https://supabase.com) y ejecuta este SQL:

```sql
-- Tabla de productos
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio INTEGER NOT NULL,
  descripcion TEXT,
  imagen_url TEXT,
  destacado BOOLEAN DEFAULT false,
  agotado BOOLEAN DEFAULT false,
  categoria TEXT DEFAULT 'Hamburguesas',
  orden INTEGER DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de pedidos
CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de clientes
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  celular TEXT NOT NULL,
  direccion TEXT,
  correo TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Políticas de acceso público
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "acceso publico productos" ON productos FOR ALL USING (true);
CREATE POLICY "acceso publico pedidos" ON pedidos FOR ALL USING (true);
CREATE POLICY "acceso publico clientes" ON clientes FOR ALL USING (true);
```

### 3. Configura las credenciales

```bash
cp config.example.js config.js
```

Edita `config.js` con tus credenciales de Supabase.

### 4. Crea el bucket de imágenes

En Supabase → Storage → New bucket → nombre: `imagenes` → Public: ✅

### 5. Crea el usuario admin

En Supabase → Authentication → Users → Add user

### 6. Despliega en Netlify

Comprime la carpeta del proyecto en un ZIP y súbelo a [netlify.com/drop](https://app.netlify.com/drop)

---

## 📁 Estructura del proyecto

```
raices_burger_web/
├── assets/              # Imágenes del restaurante
├── admin.html           # Panel de administración
├── app.js               # Lógica del carrito y pedidos
├── config.example.js    # Plantilla de configuración
├── index.html           # Menú público
├── styles.css           # Estilos globales
└── README.md
```

---

## 💰 ¿Quieres este sistema para tu restaurante?

Este sistema fue desarrollado como producto comercial. Si tienes un restaurante y quieres tu propio menú digital con panel de administración, contáctame:

📱 **WhatsApp:** [3244652909](https://wa.me/573244652909)
📸 **Instagram:** [@raices_burger](https://www.instagram.com/raices_burger)

---

## 📄 Licencia

Este proyecto es de uso comercial. El código fuente se comparte con fines educativos y de portafolio.

---

*Desarrollado con ❤️ en Villa del Rosario, Colombia*