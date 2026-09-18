import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

const EMAIL = "adrian.zuniga2707@gmail.com";
const WHATSAPP = "525561208661";

export const DATA = {
  name: "Donovan Zuñiga",
  initials: "DZ",
  // Ajustar al dominio real después del primer deploy (se usa en metadatos y enlaces absolutos).
  url: "https://portfolio-donovan.workers.dev",
  description:
    "Automatización de procesos y sistemas a la medida, para que tu negocio deje de depender de hacer las cosas a mano.",
  summary: `Ayudo a negocios a dejar de depender de una persona haciendo las cosas a mano. Construyo automatizaciones con n8n, Google Sheets, bases de datos, correo automatizado e IA supervisada: cotizaciones que se aprueban solas, pagos que se concilian sin tocarlos y dashboards que se actualizan solos.

Hoy hay **más de 150 workflows en producción**, corriendo en **3 servidores propios** con respaldos automáticos diarios, para **8+ empresas** de distintos giros. [Escríbeme por WhatsApp](https://wa.me/${WHATSAPP}) y platicamos qué se puede automatizar en tu negocio.`,
  avatarUrl: "/me.jpg",
  stats: [
    { value: "150+", label: "workflows en producción" },
    { value: "3", label: "servidores propios" },
    { value: "8+", label: "empresas atendidas" },
  ],
  skills: [
    "n8n (servidor propio)",
    "Google Sheets / Workspace",
    "Supabase",
    "NocoDB",
    "Gmail / Zoho Mail API",
    "Webhooks y formularios",
    "Cloudflare Workers / D1",
    "IA supervisada",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Inicio" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: EMAIL,
    tel: `+${WHATSAPP}`,
    social: {
      WhatsApp: {
        name: "WhatsApp",
        url: `https://wa.me/${WHATSAPP}`,
        icon: Icons.whatsapp,
        navbar: true,
      },
      email: {
        name: "Enviar correo",
        url: `mailto:${EMAIL}`,
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  // Cada caso enlaza a su artículo en el blog. Sin datos de clientes: solo lo que hace el proceso.
  projects: [
    {
      title: "Dashboards en tiempo real",
      category: "Dashboards",
      href: "/blog/dashboards-en-tiempo-real",
      description:
        "Que el dueño vea el negocio de un vistazo: cuánto se ha aprobado, cuánto falta por cobrar, quién necesita seguimiento hoy y en qué va cada folio, actualizado solo.",
      technologies: ["Dashboards", "KPIs", "Tiempo real"],
    },
    {
      title: "De la venta al pago, sin tocarlo a mano",
      category: "Ventas y pagos",
      href: "/blog/de-la-venta-al-pago",
      description:
        "Cada venta dispara un flujo que registra el pedido, cruza pagos y comisiones contra lo esperado y avisa por los canales correctos.",
      technologies: ["n8n", "Conciliación", "Marketplace"],
    },
    {
      title: "De la cotización a la cobranza",
      category: "Cotización a cobranza",
      href: "/blog/cotizacion-a-cobranza",
      description:
        "Aprobaciones que llegan directo al correo de quien decide y recordatorios diarios para que ninguna cuenta se quede pendiente por descuido.",
      technologies: ["n8n", "Correo", "Recordatorios"],
    },
    {
      title: "Procesos con muchas ramas",
      category: "Automatización a gran escala",
      href: "/blog/procesos-con-muchas-ramas",
      description:
        "Un motor de notificaciones con 13 tipos de evento en un solo flujo y un cotizador automático de punta a punta, corriendo todos los días sin intervención manual.",
      technologies: ["n8n", "Notificaciones", "Cotizador"],
    },
    {
      title: "IA que ayuda a responder, sin perder el control",
      category: "IA supervisada",
      href: "/blog/ia-supervisada",
      description:
        "Un asistente lee los mensajes de clientes y prepara la respuesta, pero nunca la envía solo: una persona la aprueba, la edita o la rechaza.",
      technologies: ["IA supervisada", "Discord", "Aprobación humana"],
    },
  ],
} as const;
