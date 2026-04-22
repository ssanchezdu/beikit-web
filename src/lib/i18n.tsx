import { createContext, useContext, useState } from 'react'

export type Lang = 'es' | 'ca'

const translations = {
  es: {
    nav: { pideYa: 'PIDE YA', catering: 'CATERING', tagLeft: 'AMERICAN BAKERY', tagRight: 'HEARTMADE EVERYDAY' },
    hero: {
      headline: 'Date un capricho con Beikit',
      headlineLines: { line1: 'Date un', line2: 'capricho', line3: 'con' },
      sub: 'Cookies, cheesecakes, milkshakes y lattes artesanales, hechos con cariño cada día en Granollers.',
      proof: '+500 pedidos',
      proofLocation: 'Granollers',
      cta: 'PIDE AHORA',
      ctaSecondary: 'VER CARTA',
    },
    menu: {
      cookies:     { title: 'Cookies',     tagline: 'Crujientes por fuera, perfectas por dentro.', description: 'Cookies americanas hechas a mano, con un exterior ligeramente crujiente y un interior tierno que se derriten en cada bocado.' },
      cheesecakes: { title: 'Cheesecakes', tagline: 'Cremosas, irresistibles, nuestras.', description: 'Base crujiente, relleno aterciopelado. Un trozo y entiendes por qué la receta es nuestro secreto mejor guardado.' },
      milkshakes:  { title: 'Milkshakes',  tagline: 'El batido que lo cambia todo.', description: 'Helado artesano, leche fría y mucho mimo en cada vaso. Espeso, intenso, americano de verdad.' },
      otros:       { title: 'Lattes',      tagline: 'El café como a ti te gusta.', description: 'Nuestra selección de cafés de especialidad, matcha y chai: recetas cremosas, aromáticas y hechas con mimo.' },
      pideYa: 'PIDE YA',
      items: {
        cookies: [
          { name: 'NY Classic', price: '5,00\u00A0€', desc: 'Un clásico que nunca falla, perfecto para los amantes de lo simple pero infalible. Con chips de chocolate con leche.' },
          { name: 'Oreo', price: '5,00\u00A0€', desc: 'Rellena con una espectacular crema de Cookies & Cream, chips de choco blanco y trocitos de Oreo. ¡Nuestra favorita!' },
          { name: 'Lotus', price: '5,00\u00A0€', desc: 'Rellena con la famosa crema de speculoos y chips de chocolate con leche. Dulce, intensa y absolutamente irresistible.' },
          { name: 'Pistacchio', price: '5,00\u00A0€', desc: 'Rellena de adictiva crema de pistacho, un toque salado, pistachos y chips de chocolate blanco. Poco más que añadir…' },
          { name: 'Kinder', price: '5,00\u00A0€', desc: 'Rellena de crema de Kinder con chips de chocolate con leche y coronada con un mini Kinder Bueno.' },
          { name: 'Red Velvet', price: '5,00\u00A0€', desc: 'Elaborada con cacao, un toque rojo avainillado, rellena de frosting de queso crema y chips choco dúo.' },
          { name: 'Dinosaurus', price: '5,00\u00A0€', desc: 'Rellena de crema de la famosa galleta, chips de choco blanco y un toque de sal. ¡Tus bocados serán más grandes que los de un T-Rex!' },
          { name: 'Triple Choc', price: '5,00\u00A0€', desc: 'Para los amantes del chocolate. Masa elaborada con cacao puro y chips de choco dúo. Un bocado placentero…' },
        ],
        cheesecakes: [
          {
            title: 'Horno cremosa',
            items: [
              { name: 'Clásica', price: '5,00\u00A0€', desc: 'Receta neoyorquina sobre base de galleta crujiente. La versión que convence a todos, sin trucos.' },
              { name: 'Oreo', price: '5,00\u00A0€', desc: 'Trozos de galleta Oreo dentro de una crema densa y aterciopelada. Cremoso por fuera, golosa por dentro.' },
              { name: 'Pistacchio', price: '5,00\u00A0€', desc: 'Pistacho siciliano fundido en una crema suave. Elegante, intensa, inolvidable.' },
              { name: 'Lotus', price: '5,00\u00A0€', desc: 'Base Biscoff caramelizada y crema de Lotus. El caramelo que todos persiguen.' },
              { name: 'Kinder', price: '5,00\u00A0€', desc: 'Crema sedosa con el sabor Kinder que reconoces al primer bocado. Pura nostalgia.' },
            ],
          },
          {
            title: 'Mousse fría',
            items: [
              { name: 'Clásico de Fresa', price: '5,00\u00A0€', desc: 'Mousse aireada con fresa natural. Fresca, ligera, sin culpa.' },
              { name: 'Oreo', price: '5,00\u00A0€', desc: 'Mousse etérea con Oreo triturada. Cremosa por fuera, crujiente por dentro.' },
              { name: 'Pistacchio', price: '5,00\u00A0€', desc: 'Mousse verde pistacho: sofisticación en textura nube.' },
              { name: 'Lotus', price: '5,00\u00A0€', desc: 'Mousse fría con caramelo Lotus. Sedosa, golosa, adictiva.' },
            ],
          },
        ],
        milkshakes: [
          { name: 'Vainilla', price: '5,00\u00A0€', desc: 'Vainilla bourbon y leche fría. El batido de toda la vida, pero mejorado.' },
          { name: 'Chocolate', price: '5,00\u00A0€', desc: 'Cacao puro y salsa fudge. Denso, oscuro, sin concesiones.' },
          { name: 'Fresa', price: '5,00\u00A0€', desc: 'Fresas frescas batidas con helado y leche entera. Sabor de verano todo el año.' },
          { name: 'Oreo', price: '5,00\u00A0€', desc: 'Galletas Oreo trituradas en un batido cremoso. Crujiente en cada sorbo.' },
          { name: 'Lotus', price: '5,00\u00A0€', desc: 'Galletas Lotus caramelizadas con helado de vainilla. Una locura cremosa.' },
          { name: 'Dinosaurus', price: '5,00\u00A0€', desc: 'La galleta de la infancia batida con helado. Nostalgia en vaso alto.' },
        ],
        otros: [
          { name: 'Café Latte', price: '3,00\u00A0€', desc: 'Espresso doble y leche vaporizada. Equilibrio perfecto entre fuerza y suavidad.' },
          { name: 'Café French Vainilla', price: '3,20\u00A0€', desc: 'Espresso con crema de vainilla francesa. Dulce, aromático y elegante.' },
          { name: 'Café Oreo', price: '3,50\u00A0€', desc: 'Espresso, galleta Oreo triturada y leche vaporizada. Tu latte con un crujido adictivo.' },
          { name: 'Café Lotus', price: '3,50\u00A0€', desc: 'Espresso con caramelo speculoos y leche vaporizada. Tostado, acaramelado, irresistible.' },
          { name: 'Café Mocha', price: '3,50\u00A0€', desc: 'Espresso, chocolate negro y leche vaporizada. Para los que nunca eligen entre café y chocolate.' },
          { name: 'Café Mocha White', price: '3,50\u00A0€', desc: 'Espresso, chocolate blanco y leche vaporizada. Dulce, cremoso y adictivo.' },
          { name: 'Matcha Latte', price: '3,80\u00A0€', desc: 'Matcha ceremonial batido con leche vaporizada. Energía verde, sin espresso.' },
          { name: 'Chai Latte', price: '3,80\u00A0€', desc: 'Mezcla de especias infusionada con leche vaporizada. Cálido, picante y reconfortante.' },
        ],
      },
    },
    claim: {
      text: 'Porque un buen día empieza con algo hecho despacio, a mano y con el mimo que tú te mereces.',
      tagline: 'Heartmade Everyday',
    },
    nosotros: {
      label: 'Nosotros',
      headline: 'Donde cada receta cuenta una historia hecha a mano.',
      body1: 'Lo que empezó como una pasión compartida por la cultura americana, hoy se ha convertido en nuestro proyecto de vida. Un lugar donde damos forma a todo lo que nos inspira, creando recetas que mezclan tradición, creatividad y mucho mimo.',
      body2: 'Cada cookie, cada cheesecake y cada detalle está hecho a mano, con ingredientes seleccionados y el cuidado de quien disfruta cada paso del proceso.',
    },
    rrss: { eyebrow: 'Spoiler:', headline: '\u201CNuestras redes huelen a cookies.\u201D', cta: 'S\u00EDguenos' },
    delivery: {
      eyebrow: 'Tres maneras de pedir',
      title: { line1Pre: 'Tu ', brand: 'Beikit', line1Post: ',', line2: 'como lo quieras' },
      subtitle: 'Pásate por el local, llámanos y recoge, o recíbelo en casa. Tú eliges cómo llevarte un trocito de Beikit.',
      options: [
        {
          icon: 'store',
          label: 'En el local',
          title: 'Pásate a vernos',
          body: 'Entra en nuestra bakery de Granollers, elige al momento lo que más te apetezca y llévatelo recién hecho.',
          ctas: [
            { label: 'Cómo llegar', href: 'https://maps.google.com/?q=Carrer+Princesa+10+08401+Granollers', external: true },
          ],
        },
        {
          icon: 'phone',
          label: 'Take Away',
          title: 'Llama y recoge',
          body: 'Haz tu pedido por teléfono, te avisamos cuando esté listo y pasas a buscarlo sin colas ni esperas.',
          ctas: [
            { label: 'Llamar · 938 42 11 22', href: 'tel:+34938421122', external: false },
          ],
        },
        {
          icon: 'delivery',
          label: 'Delivery',
          title: 'Te lo llevamos a casa',
          body: 'Pide desde Glovo o Uber Eats y recibe tus favoritos sin moverte del sofá.',
          ctas: [
            { label: 'Glovo', href: 'https://glovoapp.com', external: true },
            { label: 'Uber Eats', href: 'https://ubereats.com', external: true },
          ],
        },
      ],
    },
    footer: {
      title: 'Ponte en contacto',
      phonelabel: 'Teléfono',
      phone: '938421122',
      addrlabel: 'Dirección',
      address: 'Carrer Princesa, 10\n08401 Granollers',
      hourslabel: 'Horarios',
      hoursClosed: 'Cerrado',
      hoursDays: [
        { day: 'Lun', slots: ['9:00 – 13:00', '16:30 – 20:00'] },
        { day: 'Mar', slots: [] },
        { day: 'Mié', slots: ['9:00 – 13:00', '16:30 – 20:00'] },
        { day: 'Jue', slots: ['9:00 – 13:00', '16:30 – 20:00'] },
        { day: 'Vie', slots: ['9:00 – 13:00', '16:30 – 20:00'] },
        { day: 'Sáb', slots: ['10:30 – 13:30', '17:30 – 20:00'] },
        { day: 'Dom', slots: ['10:30 – 13:30'] },
      ],
      ordersLabel: 'Pedidos online',
    },
    catering: {
      hero: {
        badge: '★ Servicio de Catering',
        title: 'Endulza tu próximo evento.',
        headlineLines: { line1: 'Endulza', line2: 'tu evento', line3: 'con' },
        subtitle: 'Catering dulce artesano para empresas, bodas y celebraciones. Desde 20 personas, con respuesta en 48h y facturación a empresas.',
        cta: 'Solicitar presupuesto',
        ctaSecondary: 'WhatsApp directo',
        reassurance: 'Presupuesto gratis · Sin compromiso · Respuesta en 48h',
        priceAnchor: 'Desde 8€ / pax',
        audience: 'Empresas · Bodas · Cumpleaños · Lanzamientos',
        seeHow: 'Ver cómo funciona',
      },
      logos: {
        tag: '★ Han confiado en nosotros',
        items: ['Acme Co.', 'Studio Norte', 'Granollers Tech', 'Hotel Vila', 'Casa Martí', 'Atelier 08'],
      },
      valores: {
        tag: 'Quiénes somos',
        title: 'Repostería americana hecha con amor, cada día.',
        body1: 'Somos Juan y Anna, los fundadores de Beikit. Después de años perfeccionando nuestras recetas, abrimos las puertas de nuestra bakery americana en Granollers con un objetivo claro: traer el auténtico sabor americano a tu mesa — y ahora también a tus eventos.',
        body2: 'Cada pedido de catering lo preparamos con la misma dedicación que ponemos en nuestra tienda. Sin atajos, sin congelados. Heartmade Everyday.',
        cards: [
          { emoji: '🚚', title: 'Entrega incluida', desc: 'Granollers + 30 km, sin coste oculto en eventos desde 50 pax' },
          { emoji: '🧾', title: 'Facturación a empresas', desc: 'IVA desglosado y pago a 30 días para clientes corporativos' },
          { emoji: '✨', title: 'Personalizable', desc: 'Adaptamos producto, cantidad y formato a tu evento' },
          { emoji: '⚡', title: 'Respuesta en 48h', desc: 'Confirmamos disponibilidad y presupuesto en menos de dos días' },
        ],
      },
      info: {
        tag: 'Info práctica',
        title: 'Lo esencial, antes de pedir',
        cards: [
          { kpi: '20', unit: 'pax', label: 'Pedido mínimo', desc: 'Para servicios completos. Bandejas sueltas desde 10 pax.' },
          { kpi: '7', unit: 'días', label: 'Antelación recomendada', desc: 'Para eventos grandes pide con 14 días — temporada alta llena rápido.' },
          { kpi: '30', unit: 'km', label: 'Radio de entrega', desc: 'Granollers y alrededores. Más lejos? Pregúntanos.' },
          { kpi: '48', unit: 'h', label: 'Tiempo de respuesta', desc: 'Contestamos toda solicitud en menos de 48 horas hábiles.' },
        ],
      },
      pasos: {
        tag: 'El proceso',
        title: 'Cómo funciona',
        subtitle: 'Un proceso simple y transparente — de tu primer mensaje al último bocado del evento.',
        steps: [
          { time: 'Día 0', title: 'Solicita', desc: 'Rellena el formulario o escríbenos por WhatsApp. Cuéntanos evento, fecha y nº de personas.' },
          { time: '< 48h', title: 'Recibes propuesta', desc: 'Confirmamos disponibilidad y enviamos presupuesto cerrado con opciones y productos sugeridos.' },
          { time: '7 días antes', title: 'Confirmas y pagamos', desc: 'Cerramos el menú final, firmas la propuesta y reservas con el 30%. Factura con IVA para empresas.' },
          { time: 'Día del evento', title: 'Entregamos y disfrutas', desc: 'Llevamos todo montado al lugar del evento en un radio de 30 km. Sin estrés, listo para servir.' },
        ],
      },
      testimonios: {
        tag: 'Lo que dicen',
        title: 'Eventos que ya endulzamos',
        items: [
          { quote: 'El coffee break del lanzamiento fue todo un éxito. Las cookies volaron en quince minutos.', author: 'Marta R.', role: 'Office Manager · Granollers Tech', event: 'Coffee break · 80 pax' },
          { quote: 'Pedimos la mesa dulce para nuestra boda y todos los invitados nos preguntaron por Beikit. Servicio impecable.', author: 'Anna & Pol', role: 'Boda · Mas Bonvilar', event: 'Mesa dulce · 120 pax' },
          { quote: 'Trabajamos con ellos para los desayunos del equipo. Puntualidad, calidad y siempre algo nuevo de temporada.', author: 'Carlos M.', role: 'CFO · Studio Norte', event: 'Desayunos recurrentes' },
        ],
      },
      faq: {
        tag: 'Preguntas frecuentes',
        title: 'Antes de pedir',
        items: [
          { q: '¿Tenéis opciones sin gluten o veganas?', a: 'Sí. Tenemos cookies sin gluten y opciones veganas en cookies, brownies y selección de cheesecakes. Indícanoslo en el formulario y te confirmamos disponibilidad.' },
          { q: '¿Cuál es el pedido mínimo?', a: 'Para servicios completos de catering, 20 personas. Para bandejas sueltas o pedidos puntuales, desde 10 unidades.' },
          { q: '¿Hacéis entrega y montaje?', a: 'Sí, entregamos en un radio de 30 km de Granollers. Para eventos desde 50 pax, la entrega va incluida. El montaje básico (bandejas, soportes) está incluido.' },
          { q: '¿Cómo funciona el pago y la facturación?', a: 'Aceptamos transferencia, tarjeta y Bizum. Para empresas emitimos factura con IVA desglosado y aceptamos pago a 30 días previo acuerdo.' },
          { q: '¿Política de cancelación?', a: 'Cancelaciones con más de 7 días de antelación: sin coste. Entre 7 y 3 días: 50% del pedido. Menos de 72h: 100%. Cambios de fecha sin coste sujetos a disponibilidad.' },
          { q: '¿Cuánto cuesta?', a: 'Depende del producto y volumen. Un coffee break corporativo ronda 8-12 €/persona; una mesa dulce de boda 15-22 €/persona. Te enviamos presupuesto cerrado en 48h.' },
        ],
      },
      midcta: {
        title: '¿Ya sabes lo que necesitas?',
        sub: 'Salta directo al formulario o escríbenos por WhatsApp.',
        primary: 'Solicitar presupuesto',
        whatsapp: 'WhatsApp directo',
      },
      sticky: {
        label: 'Solicitar catering',
      },
      productos: {
        tag: 'Qué ofrecemos',
        title: 'Productos disponibles',
        cards: [
          { badge: 'Bestseller', title: 'Cheesecakes', desc: 'Dos familias: horneadas cremosas y mousse frías. Formato individual o para compartir, ideales para cualquier celebración.', pills: ['Clásica', 'Oreo', 'Pistacchio', 'Lotus', 'Kinder', 'Fresa'] },
          { badge: 'Más pedido', title: 'Cookies', desc: 'Crumble cookies recién horneadas, con el exterior crujiente y el interior tierno. Perfectas para coffee breaks y desayunos corporativos.', pills: ['NY Classic', 'Oreo', 'Lotus', 'Pistacchio', 'Kinder', 'Red Velvet', 'Dinosaurus', 'Triple Choc'] },
          { title: 'Milkshakes', desc: 'Batidos cremosos con helado artesano y leche fría. Perfectos para eventos al aire libre y celebraciones de verano.', pills: ['Vainilla', 'Chocolate', 'Fresa', 'Oreo', 'Lotus', 'Dinosaurus'] },
          { title: 'Lattes', desc: 'Servicio de coffee shop para tus eventos. Cafés de especialidad, matcha y chai, preparados al momento.', pills: ['Latte', 'French Vainilla', 'Oreo', 'Lotus', 'Mocha', 'Mocha White', 'Matcha', 'Chai'] },
        ],
      },
      form: {
        tag: 'Solicitud de catering',
        title: 'Cuéntanos tu evento',
        intro: 'Rellena el formulario y te respondemos en menos de 48 horas con un presupuesto cerrado, sin compromiso.',
        reassurance: ['Presupuesto gratis', 'Sin compromiso', 'Respuesta en 48h', 'Facturamos a empresas'],
        tipoCliente: 'Eres…',
        tipoClienteOptions: ['Empresa', 'Particular'],
        presupuesto: 'Presupuesto orientativo',
        presupuestoOptional: '— Opcional, nos ayuda a ajustar la propuesta',
        presupuestoOptions: ['Menos de 300€', '300–800€', '800–1.500€', '1.500–3.000€', 'Más de 3.000€', 'No lo sé aún'],
        whatsappFallback: '¿Prefieres WhatsApp? Escríbenos directamente',
        nombre: 'Nombre completo',
        email: 'Email',
        telefono: 'Teléfono',
        tipoEvento: 'Tipo de evento',
        fecha: 'Fecha del evento',
        personas: 'Número de personas',
        productos: 'Productos que quieres',
        mensaje: 'Mensaje adicional',
        mensajeOptional: '— Opcional',
        privacidad: 'He leído y acepto la Política de Privacidad',
        submit: 'Enviar solicitud →',
        sending: 'Enviando…',
        errorMsg: 'Ha habido un problema al enviar. Inténtalo de nuevo o escríbenos a contacto@beikitbakery.com',
        required: 'Este campo es obligatorio',
        emailError: 'Introduce un email válido',
        phoneError: 'Mínimo 9 dígitos',
        dateError: 'La fecha debe ser futura',
        rgpd: 'Responsable: Beikit Bakery · Finalidad: Gestionar tu solicitud de catering y contactarte · Legitimación: Tu consentimiento · Más info: Política de Privacidad',
        eventTypes: ['Evento corporativo', 'Celebración privada', 'Boda', 'Cumpleaños', 'Otro'],
        placeholderPhone: '+34 600 000 000',
        placeholderPersonas: 'Ej. 50…',
        placeholderProductos: 'Cuéntanos qué productos te interesan, cantidades aproximadas y detalles…',
        placeholderMensaje: 'Cualquier información adicional que quieras compartir…',
        note: 'Te contactaremos en menos de 48 horas · C/Princesa, 10 Granollers',
      },
    },
    gracias: {
      title: '¡Lo tenemos! 🎉',
      body: 'Hemos recibido tu solicitud de catering.\nNos ponemos en contacto contigo en menos de 48 horas.',
      cta: 'Volver al inicio →',
    },
    notFound: {
      title: 'Oops, esta página\nno existe.',
      sub: 'Pero nuestras cookies sí.',
      cta: 'Volver al inicio →',
    },
    legal: {
      avisoLegal: 'Aviso Legal',
      privacidad: 'Política de Privacidad',
      cookies: 'Política de Cookies',
      gestionarCookies: 'Gestionar cookies',
      copyright: '© 2026 Beikit Bakery',
    },
  },
  ca: {
    nav: { pideYa: 'DEMANA JA', catering: 'CÀTERING', tagLeft: 'AMERICAN BAKERY', tagRight: 'HEARTMADE EVERYDAY' },
    hero: {
      headline: 'Fes-te un regal amb Beikit',
      headlineLines: { line1: 'Fes-te un', line2: 'regal', line3: 'amb' },
      sub: 'Cookies, cheesecakes, milkshakes i lattes artesanals, fets amb cura cada dia a Granollers.',
      proof: '+500 comandes',
      proofLocation: 'Granollers',
      cta: 'DEMANA ARA',
      ctaSecondary: 'VEURE CARTA',
    },
    menu: {
      cookies:     { title: 'Cookies',     tagline: 'Cruixents per fora, perfectes per dins.', description: "Cookies americanes fetes a mà, amb un exterior lleugerament cruixent i un interior tendre que es desfan a cada mossegada." },
      cheesecakes: { title: 'Cheesecakes', tagline: 'Cremoses, irresistibles, nostres.', description: "Base cruixent, farcit setinat. Un tros i entens per què la recepta és el nostre secret millor guardat." },
      milkshakes:  { title: 'Milkshakes',  tagline: 'El batut que ho canvia tot.', description: "Gelat artesà, llet freda i molt de mimo a cada got. Espès, intens, americà de debò." },
      otros:       { title: 'Lattes',      tagline: 'El cafè com a tu t\'agrada.', description: "La nostra selecció de cafès d'especialitat, matcha i chai: receptes cremoses, aromàtiques i fetes amb cura." },
      pideYa: 'DEMANA JA',
      items: {
        cookies: [
          { name: 'NY Classic', price: '5,00\u00A0€', desc: "Un clàssic que mai falla, perfecte per als amants del simple però infal·lible. Amb chips de xocolata amb llet." },
          { name: 'Oreo', price: '5,00\u00A0€', desc: "Farcida amb una espectacular crema de Cookies & Cream, chips de xoco blanc i trossets d'Oreo. La nostra favorita!" },
          { name: 'Lotus', price: '5,00\u00A0€', desc: "Farcida amb la famosa crema de speculoos i chips de xocolata amb llet. Dolça, intensa i absolutament irresistible." },
          { name: 'Pistacchio', price: '5,00\u00A0€', desc: "Farcida d'addictiva crema de pistatxo, un toc salat, pistatxos i chips de xocolata blanca. Poc més a afegir…" },
          { name: 'Kinder', price: '5,00\u00A0€', desc: "Farcida de crema de Kinder amb chips de xocolata amb llet i coronada amb un mini Kinder Bueno." },
          { name: 'Red Velvet', price: '5,00\u00A0€', desc: "Elaborada amb cacau, un toc vermell avainillat, farcida de frosting de formatge crema i chips xoco duo." },
          { name: 'Dinosaurus', price: '5,00\u00A0€', desc: "Farcida de crema de la famosa galeta, chips de xoco blanc i un toc de sal. Els teus mossos seran més grans que els d'un T-Rex!" },
          { name: 'Triple Choc', price: '5,00\u00A0€', desc: "Per als amants de la xocolata. Massa elaborada amb cacau pur i chips de xoco duo. Un mos plaent…" },
        ],
        cheesecakes: [
          {
            title: 'Forn cremosa',
            items: [
              { name: 'Clàssica', price: '5,00\u00A0€', desc: "Recepta novaiorquesa sobre base de galeta cruixent. La versió que convenç a tothom, sense trucs." },
              { name: 'Oreo', price: '5,00\u00A0€', desc: "Trossos de galeta Oreo dins d'una crema densa i setinada. Cremosa per fora, llaminera per dins." },
              { name: 'Pistacchio', price: '5,00\u00A0€', desc: "Pistatxo sicilià fos en una crema suau. Elegant, intensa, inoblidable." },
              { name: 'Lotus', price: '5,00\u00A0€', desc: "Base Biscoff caramel·litzada i crema de Lotus. El caramel que tothom persegueix." },
              { name: 'Kinder', price: '5,00\u00A0€', desc: "Crema sedosa amb el sabor Kinder que reconeixes al primer mos. Pura nostàlgia." },
            ],
          },
          {
            title: 'Mousse freda',
            items: [
              { name: 'Clàssic de Maduixa', price: '5,00\u00A0€', desc: "Mousse airejada amb maduixa natural. Fresca, lleugera, sense culpa." },
              { name: 'Oreo', price: '5,00\u00A0€', desc: "Mousse etèria amb Oreo triturada. Cremosa per fora, cruixent per dins." },
              { name: 'Pistacchio', price: '5,00\u00A0€', desc: "Mousse verda pistatxo: sofisticació en textura núvol." },
              { name: 'Lotus', price: '5,00\u00A0€', desc: "Mousse freda amb caramel Lotus. Sedosa, llaminera, addictiva." },
            ],
          },
        ],
        milkshakes: [
          { name: 'Vainilla', price: '5,00\u00A0€', desc: "Vainilla bourbon i llet freda. El batut de tota la vida, però millorat." },
          { name: 'Chocolate', price: '5,00\u00A0€', desc: "Cacau pur i salsa fudge. Dens, fosc, sense concessions." },
          { name: 'Fresa', price: '5,00\u00A0€', desc: "Maduixes fresques batudes amb gelat i llet sencera. Sabor d'estiu tot l'any." },
          { name: 'Oreo', price: '5,00\u00A0€', desc: "Galetes Oreo triturades en un batut cremós. Cruixent a cada glop." },
          { name: 'Lotus', price: '5,00\u00A0€', desc: "Galetes Lotus caramel·litzades amb gelat de vainilla. Una bogeria cremosa." },
          { name: 'Dinosaurus', price: '5,00\u00A0€', desc: "La galeta de la infància batuda amb gelat. Nostàlgia en got alt." },
        ],
        otros: [
          { name: 'Cafè Latte', price: '3,00\u00A0€', desc: "Espresso doble i llet vaporitzada. Equilibri perfecte entre força i suavitat." },
          { name: 'Cafè French Vainilla', price: '3,20\u00A0€', desc: "Espresso amb crema de vainilla francesa. Dolç, aromàtic i elegant." },
          { name: 'Cafè Oreo', price: '3,50\u00A0€', desc: "Espresso, galeta Oreo triturada i llet vaporitzada. El teu latte amb un cruixit addictiu." },
          { name: 'Cafè Lotus', price: '3,50\u00A0€', desc: "Espresso amb caramel speculoos i llet vaporitzada. Torrat, acaramel·lat, irresistible." },
          { name: 'Cafè Mocha', price: '3,50\u00A0€', desc: "Espresso, xocolata negra i llet vaporitzada. Per als que mai trien entre cafè i xocolata." },
          { name: 'Cafè Mocha White', price: '3,50\u00A0€', desc: "Espresso, xocolata blanca i llet vaporitzada. Dolç, cremós i addictiu." },
          { name: 'Matcha Latte', price: '3,80\u00A0€', desc: "Matcha cerimonial batut amb llet vaporitzada. Energia verda, sense espresso." },
          { name: 'Chai Latte', price: '3,80\u00A0€', desc: "Mescla d'espècies infusionada amb llet vaporitzada. Càlid, picant i reconfortant." },
        ],
      },
    },
    claim: {
      text: 'Perquè un bon dia comença amb alguna cosa feta a poc a poc, a mà i amb el carinyo que et mereixes.',
      tagline: 'Heartmade Everyday',
    },
    nosotros: {
      label: 'Nosaltres',
      headline: 'On cada recepta explica una història feta a mà.',
      body1: "El que va començar com una passió compartida per la cultura americana, avui s'ha convertit en el nostre projecte de vida. Un lloc on donem forma a tot el que ens inspira, creant receptes que barregen tradició, creativitat i molt de mimo.",
      body2: "Cada cookie, cada cheesecake i cada detall està fet a mà, amb ingredients seleccionats i la cura de qui gaudeix cada pas del procés.",
    },
    rrss: { eyebrow: 'Spoiler:', headline: '\u201CLes nostres xarxes fan olor de cookies.\u201D', cta: 'Segueix-nos' },
    delivery: {
      eyebrow: 'Tres maneres de demanar',
      title: { line1Pre: 'El teu ', brand: 'Beikit', line1Post: ',', line2: 'com el vulguis' },
      subtitle: "Passa pel local, truca'ns i recull, o rep-ho a casa. Tu tries com emportar-te un trosset de Beikit.",
      options: [
        {
          icon: 'store',
          label: 'Al local',
          title: "Vine a veure'ns",
          body: 'Entra a la nostra bakery de Granollers, tria al moment el que més et vingui de gust i emporta-t\'ho acabat de fer.',
          ctas: [
            { label: 'Com arribar', href: 'https://maps.google.com/?q=Carrer+Princesa+10+08401+Granollers', external: true },
          ],
        },
        {
          icon: 'phone',
          label: 'Take Away',
          title: 'Truca i recull',
          body: "Fes la teva comanda per telèfon, t'avisem quan estigui llesta i passes a buscar-la sense cues ni esperes.",
          ctas: [
            { label: 'Trucar · 938 42 11 22', href: 'tel:+34938421122', external: false },
          ],
        },
        {
          icon: 'delivery',
          label: 'Delivery',
          title: "Te'l portem a casa",
          body: "Demana des de Glovo o Uber Eats i rep els teus preferits sense moure't del sofà.",
          ctas: [
            { label: 'Glovo', href: 'https://glovoapp.com', external: true },
            { label: 'Uber Eats', href: 'https://ubereats.com', external: true },
          ],
        },
      ],
    },
    footer: {
      title: "Posa't en contacte",
      phonelabel: 'Telèfon',
      phone: '938421122',
      addrlabel: 'Adreça',
      address: 'Carrer Princesa, 10\n08401 Granollers',
      hourslabel: 'Horaris',
      hoursClosed: 'Tancat',
      hoursDays: [
        { day: 'Dl', slots: ['9:00 – 13:00', '16:30 – 20:00'] },
        { day: 'Dt', slots: [] },
        { day: 'Dc', slots: ['9:00 – 13:00', '16:30 – 20:00'] },
        { day: 'Dj', slots: ['9:00 – 13:00', '16:30 – 20:00'] },
        { day: 'Dv', slots: ['9:00 – 13:00', '16:30 – 20:00'] },
        { day: 'Ds', slots: ['10:30 – 13:30', '17:30 – 20:00'] },
        { day: 'Dg', slots: ['10:30 – 13:30'] },
      ],
      ordersLabel: 'Comandes online',
    },
    catering: {
      hero: {
        badge: '★ Servei de Càtering',
        title: 'Fes especial el teu proper acte.',
        headlineLines: { line1: 'Fes especial', line2: 'el teu acte', line3: 'amb' },
        subtitle: "Càtering dolç artesà per a empreses, bodes i celebracions. Des de 20 persones, amb resposta en 48h i facturació a empreses.",
        cta: 'Sol·licitar pressupost',
        ctaSecondary: 'WhatsApp directe',
        reassurance: 'Pressupost gratis · Sense compromís · Resposta en 48h',
        priceAnchor: 'Des de 8€ / pax',
        audience: 'Empreses · Bodes · Aniversaris · Llançaments',
        seeHow: 'Veure com funciona',
      },
      logos: {
        tag: '★ Han confiat en nosaltres',
        items: ['Acme Co.', 'Studio Nord', 'Granollers Tech', 'Hotel Vila', 'Casa Martí', 'Atelier 08'],
      },
      valores: {
        tag: 'Qui som',
        title: 'Rebosteria americana feta amb amor, cada dia.',
        body1: "Som Juan i Anna, els fundadors de Beikit. Després d'anys perfeccionant les nostres receptes, obrim les portes de la nostra bakery americana a Granollers amb un objectiu clar: portar l'autèntic sabor americà a la teva taula — i ara també als teus actes.",
        body2: "Cada comanda de càtering la preparem amb la mateixa dedicació que posem a la nostra botiga. Sense dreceres, sense congelats. Heartmade Everyday.",
        cards: [
          { emoji: '🚚', title: 'Entrega inclosa', desc: 'Granollers + 30 km, sense cost ocult en actes des de 50 pax' },
          { emoji: '🧾', title: 'Facturació a empreses', desc: 'IVA desglossat i pagament a 30 dies per a clients corporatius' },
          { emoji: '✨', title: 'Personalitzable', desc: 'Adaptem producte, quantitat i format al teu acte' },
          { emoji: '⚡', title: 'Resposta en 48h', desc: 'Confirmem disponibilitat i pressupost en menys de dos dies' },
        ],
      },
      info: {
        tag: 'Info pràctica',
        title: "L'essencial, abans de demanar",
        cards: [
          { kpi: '20', unit: 'pax', label: 'Comanda mínima', desc: 'Per a serveis complets. Safates soltes des de 10 pax.' },
          { kpi: '7', unit: 'dies', label: 'Antelació recomanada', desc: 'Per a actes grans demana amb 14 dies — temporada alta omple ràpid.' },
          { kpi: '30', unit: 'km', label: 'Radi de lliurament', desc: 'Granollers i voltants. Més lluny? Pregunta-nos.' },
          { kpi: '48', unit: 'h', label: 'Temps de resposta', desc: 'Contestem cada sol·licitud en menys de 48 hores hàbils.' },
        ],
      },
      pasos: {
        tag: 'El procés',
        title: 'Com funciona',
        subtitle: 'Un procés simple i transparent — del teu primer missatge a l\'últim mos de l\'acte.',
        steps: [
          { time: 'Dia 0', title: 'Sol·licita', desc: "Omple el formulari o escriu-nos per WhatsApp. Explica'ns acte, data i nombre de persones." },
          { time: '< 48h', title: 'Reps proposta', desc: "Confirmem disponibilitat i enviem pressupost tancat amb opcions i productes suggerits." },
          { time: '7 dies abans', title: 'Confirmes i paguem', desc: "Tanquem el menú final, signes la proposta i reserves amb el 30%. Factura amb IVA per a empreses." },
          { time: 'Dia de l\'acte', title: 'Lliurem i gaudeixes', desc: "Portem tot muntat al lloc de l'acte en un radi de 30 km. Sense estrès, llest per servir." },
        ],
      },
      testimonios: {
        tag: 'Què en diuen',
        title: 'Actes que ja hem endolcit',
        items: [
          { quote: "El coffee break del llançament va ser un èxit. Les cookies van volar en quinze minuts.", author: 'Marta R.', role: 'Office Manager · Granollers Tech', event: 'Coffee break · 80 pax' },
          { quote: 'Vam demanar la taula dolça per a la nostra boda i tots els convidats ens van preguntar per Beikit. Servei impecable.', author: 'Anna & Pol', role: 'Boda · Mas Bonvilar', event: 'Taula dolça · 120 pax' },
          { quote: "Treballem amb ells per als esmorzars de l'equip. Puntualitat, qualitat i sempre alguna cosa nova de temporada.", author: 'Carlos M.', role: 'CFO · Studio Nord', event: 'Esmorzars recurrents' },
        ],
      },
      faq: {
        tag: 'Preguntes freqüents',
        title: 'Abans de demanar',
        items: [
          { q: 'Teniu opcions sense gluten o veganes?', a: "Sí. Tenim cookies sense gluten i opcions veganes en cookies, brownies i selecció de cheesecakes. Indica'ns-ho al formulari i et confirmem disponibilitat." },
          { q: 'Quina és la comanda mínima?', a: 'Per a serveis complets de càtering, 20 persones. Per a safates soltes o comandes puntuals, des de 10 unitats.' },
          { q: 'Feu lliurament i muntatge?', a: 'Sí, lliurem en un radi de 30 km de Granollers. Per a actes des de 50 pax, el lliurament va inclòs. El muntatge bàsic (safates, suports) està inclòs.' },
          { q: 'Com funciona el pagament i la facturació?', a: 'Acceptem transferència, targeta i Bizum. Per a empreses emetem factura amb IVA desglossat i acceptem pagament a 30 dies prèvia acord.' },
          { q: 'Política de cancel·lació?', a: "Cancel·lacions amb més de 7 dies d'antelació: sense cost. Entre 7 i 3 dies: 50% de la comanda. Menys de 72h: 100%. Canvis de data sense cost subjectes a disponibilitat." },
          { q: 'Quant costa?', a: 'Depèn del producte i volum. Un coffee break corporatiu ronda 8-12 €/persona; una taula dolça de boda 15-22 €/persona. Et fem pressupost tancat en 48h.' },
        ],
      },
      midcta: {
        title: 'Ja saps què necessites?',
        sub: "Salta directe al formulari o escriu-nos per WhatsApp.",
        primary: 'Sol·licitar pressupost',
        whatsapp: 'WhatsApp directe',
      },
      sticky: {
        label: 'Sol·licitar càtering',
      },
      productos: {
        tag: 'Què oferim',
        title: 'Productes disponibles',
        cards: [
          { badge: 'Bestseller', title: 'Cheesecakes', desc: "Dues famílies: forn cremoses i mousse fredes. Format individual o per compartir, ideals per a qualsevol celebració.", pills: ['Clàssica', 'Oreo', 'Pistacchio', 'Lotus', 'Kinder', 'Maduixa'] },
          { badge: 'Més demanat', title: 'Cookies', desc: "Crumble cookies acabades de coure, amb l'exterior cruixent i l'interior tendre. Perfectes per a coffee breaks i esmorzars corporatius.", pills: ['NY Classic', 'Oreo', 'Lotus', 'Pistacchio', 'Kinder', 'Red Velvet', 'Dinosaurus', 'Triple Choc'] },
          { title: 'Milkshakes', desc: "Batuts cremosos amb gelat artesà i llet freda. Perfectes per a actes a l'aire lliure i celebracions d'estiu.", pills: ['Vainilla', 'Chocolate', 'Fresa', 'Oreo', 'Lotus', 'Dinosaurus'] },
          { title: 'Lattes', desc: "Servei de coffee shop per als teus actes. Cafès d'especialitat, matcha i chai, preparats al moment.", pills: ['Latte', 'French Vainilla', 'Oreo', 'Lotus', 'Mocha', 'Mocha White', 'Matcha', 'Chai'] },
        ],
      },
      form: {
        tag: 'Sol·licitud de càtering',
        title: "Explica'ns el teu acte",
        intro: "Omple el formulari i et responem en menys de 48 hores amb un pressupost tancat, sense compromís.",
        reassurance: ['Pressupost gratis', 'Sense compromís', 'Resposta en 48h', 'Facturem a empreses'],
        tipoCliente: 'Ets…',
        tipoClienteOptions: ['Empresa', 'Particular'],
        presupuesto: 'Pressupost orientatiu',
        presupuestoOptional: "— Opcional, ens ajuda a ajustar la proposta",
        presupuestoOptions: ['Menys de 300€', '300–800€', '800–1.500€', '1.500–3.000€', 'Més de 3.000€', 'Encara no ho sé'],
        whatsappFallback: 'Prefereixes WhatsApp? Escriu-nos directament',
        nombre: 'Nom complet',
        email: 'Correu electrònic',
        telefono: 'Telèfon',
        tipoEvento: "Tipus d'acte",
        fecha: "Data de l'acte",
        personas: 'Nombre de persones',
        productos: "Productes que vols",
        mensaje: 'Missatge addicional',
        mensajeOptional: '— Opcional',
        privacidad: 'He llegit i accepto la Política de Privacitat',
        submit: "Enviar sol·licitud →",
        sending: 'Enviant…',
        errorMsg: "Hi ha hagut un problema en enviar. Torna-ho a intentar o escriu-nos a contacto@beikitbakery.com",
        required: 'Aquest camp és obligatori',
        emailError: 'Introdueix un email vàlid',
        phoneError: 'Mínim 9 dígits',
        dateError: 'La data ha de ser futura',
        rgpd: "Responsable: Beikit Bakery · Finalitat: Gestionar la teva sol·licitud de càtering i contactar-te · Legitimació: El teu consentiment · Més info: Política de Privacitat",
        eventTypes: ['Acte corporatiu', 'Celebració privada', 'Boda', 'Aniversari', 'Altre'],
        placeholderPhone: '+34 600 000 000',
        placeholderPersonas: 'Ex. 50…',
        placeholderProductos: "Explica'ns quins productes t'interessen, quantitats i detalls…",
        placeholderMensaje: "Qualsevol informació addicional que vulguis compartir…",
        note: 'Et contactarem en menys de 48 hores · C/Princesa, 10 Granollers',
      },
    },
    gracias: {
      title: 'Ho tenim! 🎉',
      body: "Hem rebut la teva sol·licitud de càtering.\nEns posem en contacte amb tu en menys de 48 hores.",
      cta: "Tornar a l'inici →",
    },
    notFound: {
      title: 'Ups, aquesta pàgina\nno existeix.',
      sub: 'Però les nostres cookies sí.',
      cta: "Tornar a l'inici →",
    },
    legal: {
      avisoLegal: 'Avís Legal',
      privacidad: 'Política de Privacitat',
      cookies: 'Política de Cookies',
      gestionarCookies: 'Gestionar cookies',
      copyright: '© 2026 Beikit Bakery',
    },
  },
} as const

export type Translations = typeof translations.es

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: translations.es,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext)
