export interface Project {
  id: string;
  title: { EN: string; ES: string };
  description: { EN: string; ES: string };
  tech: string[];
  github: string;
  position: [number, number, number];
}

export const projectsData: Project[] = [
  {
    id: "project-10-event-based-analysis",
    title: { EN: "Event-Based Business Analysis", ES: "Análisis de Negocios por Eventos" },
    description: { 
      EN: "Analyzes user behavior via sales funnels and evaluates A/A/B test results to determine the impact of design changes.", 
      ES: "Analiza el comportamiento de usuarios mediante embudos de ventas y evalúa pruebas A/A/B para medir el impacto de rediseños." 
    },
    tech: ["Python", "Pandas", "Seaborn", "A/B Testing"],
    github: "https://github.com/yairfabricio/Project-10-event-based-analysis",
    position: [-4, 2, -2]
  },
  {
    id: "First_time_response_Power_bi",
    title: { EN: "First Time Response Dashboard", ES: "Dashboard de Primera Respuesta" },
    description: { 
      EN: "Power BI dashboard focusing on first-time response metrics and customer service analytics to optimize support operations.", 
      ES: "Dashboard en Power BI centrado en métricas de primera respuesta y análisis de servicio al cliente para optimizar operaciones." 
    },
    tech: ["Power BI", "Data Analysis", "Dashboards"],
    github: "https://github.com/yairfabricio/First_time_response_Power_bi",
    position: [0, 3.5, -3]
  },
  {
    id: "meta_ads_dashboard_power_bi",
    title: { EN: "Meta Ads Performance Dashboard", ES: "Dashboard de Rendimiento Meta Ads" },
    description: { 
      EN: "Comprehensive data processing pipeline in Python and interactive visualization in Power BI for tracking Meta Ads campaigns.", 
      ES: "Pipeline completo de procesamiento de datos en Python y visualización interactiva en Power BI para el seguimiento de campañas en Meta Ads." 
    },
    tech: ["Python", "Power BI", "Marketing Analytics"],
    github: "https://github.com/yairfabricio/meta_ads_dashboard_power_bi",
    position: [4, 2, -2]
  },
  {
    id: "whatsapp-web-scrapping",
    title: { EN: "WhatsApp Web Scraper", ES: "Scraper de WhatsApp Web" },
    description: { 
      EN: "Python-based tool for extracting data and automating interactions within WhatsApp Web for data collection purposes.", 
      ES: "Herramienta basada en Python para la extracción de datos y automatización de interacciones en WhatsApp Web." 
    },
    tech: ["Python", "Web Scraping", "Data Engineering"],
    github: "https://github.com/yairfabricio/whatsapp-web-scrapping",
    position: [-3.5, -2, -1]
  },
  {
    id: "google_sheets_to_excel",
    title: { EN: "Sheets to Excel Pipeline", ES: "Pipeline de Sheets a Excel" },
    description: { 
      EN: "Data integration tool to automate the exporting and synchronization of structured data from Google Sheets to Excel.", 
      ES: "Herramienta de integración de datos para automatizar la exportación y sincronización de datos desde Google Sheets a Excel." 
    },
    tech: ["Python", "ETL", "Google API"],
    github: "https://github.com/yairfabricio/google_sheets_to_excel",
    position: [0, -3, -1.5]
  },
  {
    id: "project-12-forecasts-and-predictions",
    title: { EN: "Forecasts and Predictions", ES: "Pronósticos y Predicciones" },
    description: { 
      EN: "Machine learning models and statistical analysis implemented to generate business forecasts and predictive insights.", 
      ES: "Modelos de machine learning y análisis estadístico implementados para generar pronósticos comerciales y predicciones." 
    },
    tech: ["Python", "Machine Learning", "Jupyter Notebook"],
    github: "https://github.com/yairfabricio/project-12-forecasts-and-predictions",
    position: [3.5, -2, -1]
  }
];
