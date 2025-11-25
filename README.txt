# Portfolio —  (HTML5, CSS3, JS + Accesibilidad)

Este proyecto, "El Sabor de la Casa", es un sitio web de recetas responsivo y accesible:

- ** [1] HTML semántico**: uso correcto de `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure` y `figcaption` para estructurar el contenido de manera lógica.
- ** [2] CSS responsive**: enfoque *mobile-first* utilizando media queries; implementación de CSS Grid y Flexbox para layouts complejos; uso extensivo de variables CSS (Custom Properties) para consistencia; gestión de foco visible y contraste de colores.
- ** [3] Interacción JS (mínima y accesible)**: menú de navegación móvil (hamburguesa); sistema de pestañas (tabs) para newsletters; validación de formularios en el cliente (contacto, checkout, desafíos); carrusel infinito de recetas.
- ** [4] Accesibilidad**: uso de atributos ARIA (`aria-expanded`, `aria-controls`, `aria-live`, `aria-invalid`); roles ARIA en componentes interactivos; soporte completo para navegación por teclado.

> En el código se han aplicado las mejores prácticas de desarrollo web moderno, asegurando una experiencia de usuario fluida y accesible.

## Estructura del Proyecto

El sitio está organizado en múltiples páginas HTML interconectadas:

- `index.html`: Página de inicio con un "Hero" destacado, carrusel de recetas populares, sección de suscripción y testimonios de usuarios.
- `categoria.html`: Catálogo de recetas con filtros laterales (por dificultad, tiempo, tipo) y una grilla de tarjetas responsiva.
- `receta-x.html`: Página de detalle de una receta individual. Incluye microdatos Schema.org, lista de ingredientes interactiva (ajuste de raciones), instrucciones paso a paso y modo cocina.
- `desafios.html`: Sección de gamificación con listado de retos culinarios (activos, finalizados y premium) en formato de tarjetas.
- `desafio-detalle.html`: Vista detallada de un desafío activo con formulario de participación y carga de archivos.
- `suscripcion-premium.html`: Landing page para la venta de la membresía "Chef Pro", con tablas de precios y comparativas de beneficios.
- `checkout.html`: Simulación de pasarela de pago segura con validación de tarjeta de crédito y dirección.
- `contacto.html`: Formulario de contacto accesible con validación en tiempo real y sección de información adicional/FAQ.
- `gracias.html`, `gracias-pago.html`, `desafio-gracias.html`: Páginas de confirmación y agradecimiento para mejorar el flujo del usuario.
- `styles.css`: Hoja de estilos global que define el diseño visual, la tipografía, los colores y la adaptabilidad responsiva.
- `main.js`: Archivo principal de JavaScript que maneja toda la lógica de interacción, validación y manipulación del DOM.

## Cómo usar

1. Abrir `index.html` en cualquier navegador web moderno.
2. Navegar por el sitio utilizando el menú principal (adaptable a móvil y escritorio).
3. Explorar las funcionalidades interactivas:
   - Probar el menú hamburguesa en vista móvil.
   - Cambiar entre las pestañas "Recetas Semanales" y "Guía Premium" en el index.
   - Intentar enviar formularios vacíos en "Contacto" o "Checkout" para ver la validación y los mensajes de error accesibles.
   - Ajustar las raciones en la página de receta (`receta-x.html`) y observar cómo cambian las cantidades de ingredientes.
   - Navegar por el carrusel de recetas en la página de inicio o en el detalle de receta.
