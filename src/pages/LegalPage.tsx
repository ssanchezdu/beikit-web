import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguage, type Lang } from '../lib/i18n'
import { EASE_ENTRANCE } from '../lib/motion'
import { Button } from '../components/ui/Button'

export type LegalDocKey = 'avisoLegal' | 'privacidad' | 'cookies'

type Section = { heading: string; body: string[] }
type Doc = { title: string; sections: Section[] }

/*
  BORRADOR. El texto legal de abajo es una plantilla estándar (LSSI-CE 34/2002 y
  RGPD/LOPDGDD). Los marcadores [ … ] deben completarse con los datos reales del
  negocio y el conjunto debe ser revisado por un asesor legal antes de publicar.
*/

const UPDATED: Record<Lang, string> = {
  es: '15 de mayo de 2026',
  ca: '15 de maig de 2026',
}

const UI: Record<Lang, { draft: string; updated: string; back: string }> = {
  es: {
    draft:
      'Borrador pendiente de revisión legal. Completa los campos marcados [entre corchetes] y revisa el contenido con un asesor antes de publicar.',
    updated: 'Última actualización',
    back: 'Volver al inicio',
  },
  ca: {
    draft:
      'Esborrany pendent de revisió legal. Completa els camps marcats [entre claudàtors] i revisa el contingut amb un assessor abans de publicar.',
    updated: 'Última actualització',
    back: "Tornar a l'inici",
  },
}

const CONTENT: Record<LegalDocKey, Record<Lang, Doc>> = {
  avisoLegal: {
    es: {
      title: 'Aviso Legal',
      sections: [
        {
          heading: 'Datos identificativos',
          body: [
            'En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos del titular de este sitio web:',
            'Titular: [nombre o razón social del titular]. NIF/CIF: [NIF o CIF]. Domicilio: Carrer Princesa, 10, 08401 Granollers (Barcelona). Correo electrónico: contacto@beikitbakery.com. Teléfono: 603 91 94 73.',
          ],
        },
        {
          heading: 'Objeto',
          body: [
            'Este sitio web tiene carácter informativo sobre los productos de repostería y el servicio de catering de Beikit Bakery. El acceso y la navegación atribuyen la condición de usuario e implican la aceptación del presente Aviso Legal.',
          ],
        },
        {
          heading: 'Condiciones de uso',
          body: [
            'El usuario se compromete a hacer un uso adecuado de los contenidos del sitio web y a no emplearlos para incurrir en actividades ilícitas, lesionar derechos de terceros o introducir software malicioso.',
          ],
        },
        {
          heading: 'Propiedad intelectual e industrial',
          body: [
            'Todos los contenidos del sitio web —textos, fotografías, gráficos, logotipos, iconos y diseño— son titularidad del titular o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o transformación sin autorización expresa.',
          ],
        },
        {
          heading: 'Responsabilidad',
          body: [
            'El titular no se hace responsable de los daños derivados de un uso inadecuado del sitio web ni de las interrupciones, errores u omisiones que puedan existir en sus contenidos. Los enlaces a sitios de terceros (plataformas de pedido, redes sociales) se ofrecen únicamente como referencia y el titular no asume responsabilidad sobre su contenido.',
          ],
        },
        {
          heading: 'Legislación aplicable y jurisdicción',
          body: [
            'El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de Granollers, salvo que la normativa de consumo aplicable disponga otro fuero.',
          ],
        },
      ],
    },
    ca: {
      title: 'Avís Legal',
      sections: [
        {
          heading: 'Dades identificatives',
          body: [
            "En compliment de la Llei 34/2002, d'11 de juliol, de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSI-CE), es faciliten les dades següents del titular d'aquest lloc web:",
            'Titular: [nom o raó social del titular]. NIF/CIF: [NIF o CIF]. Domicili: Carrer Princesa, 10, 08401 Granollers (Barcelona). Correu electrònic: contacto@beikitbakery.com. Telèfon: 603 91 94 73.',
          ],
        },
        {
          heading: 'Objecte',
          body: [
            "Aquest lloc web té caràcter informatiu sobre els productes de rebosteria i el servei de càtering de Beikit Bakery. L'accés i la navegació atribueixen la condició d'usuari i impliquen l'acceptació d'aquest Avís Legal.",
          ],
        },
        {
          heading: "Condicions d'ús",
          body: [
            "L'usuari es compromet a fer un ús adequat dels continguts del lloc web i a no emprar-los per incórrer en activitats il·lícites, lesionar drets de tercers o introduir programari maliciós.",
          ],
        },
        {
          heading: 'Propietat intel·lectual i industrial',
          body: [
            "Tots els continguts del lloc web —textos, fotografies, gràfics, logotips, icones i disseny— són titularitat del titular o de tercers que n'han autoritzat l'ús, i estan protegits per la normativa de propietat intel·lectual i industrial. Queda prohibida la seva reproducció, distribució o transformació sense autorització expressa.",
          ],
        },
        {
          heading: 'Responsabilitat',
          body: [
            "El titular no es fa responsable dels danys derivats d'un ús inadequat del lloc web ni de les interrupcions, errors o omissions que puguin existir en els seus continguts. Els enllaços a llocs de tercers (plataformes de comanda, xarxes socials) s'ofereixen únicament com a referència i el titular no assumeix responsabilitat sobre el seu contingut.",
          ],
        },
        {
          heading: 'Legislació aplicable i jurisdicció',
          body: [
            "Aquest Avís Legal es regeix per la legislació espanyola. Per a la resolució de qualsevol controvèrsia, les parts se sotmeten als Jutjats i Tribunals de Granollers, llevat que la normativa de consum aplicable disposi un altre fur.",
          ],
        },
      ],
    },
  },
  privacidad: {
    es: {
      title: 'Política de Privacidad',
      sections: [
        {
          heading: 'Responsable del tratamiento',
          body: [
            'Responsable: [nombre o razón social del titular]. NIF/CIF: [NIF o CIF]. Domicilio: Carrer Princesa, 10, 08401 Granollers (Barcelona). Correo electrónico: contacto@beikitbakery.com.',
          ],
        },
        {
          heading: 'Datos que recogemos',
          body: [
            'A través del formulario de solicitud de catering recogemos: nombre, correo electrónico, teléfono (opcional), tipo de evento, fecha aproximada, número de personas, productos de interés y el mensaje que decidas incluir.',
            'No recogemos datos de navegación con fines de seguimiento ni elaboramos perfiles.',
          ],
        },
        {
          heading: 'Finalidad del tratamiento',
          body: [
            'Utilizamos tus datos exclusivamente para atender tu solicitud, elaborar y enviarte un presupuesto de catering, y mantener la comunicación necesaria para gestionar el servicio. No los empleamos para fines distintos ni para enviar comunicaciones comerciales no solicitadas.',
          ],
        },
        {
          heading: 'Base legal',
          body: [
            'La base legal del tratamiento es tu consentimiento, prestado al marcar la casilla de aceptación del formulario, y la aplicación de medidas precontractuales a petición tuya (elaboración del presupuesto).',
          ],
        },
        {
          heading: 'Conservación de los datos',
          body: [
            'Conservamos tus datos durante el tiempo necesario para gestionar tu solicitud y, una vez finalizada, durante los plazos legalmente exigibles para atender posibles responsabilidades. Transcurridos dichos plazos, los datos se suprimen.',
          ],
        },
        {
          heading: 'Destinatarios y encargados del tratamiento',
          body: [
            'No cedemos tus datos a terceros, salvo obligación legal. El formulario de catering se procesa a través del proveedor Formspree, que actúa como encargado del tratamiento para hacer llegar el mensaje a nuestro correo. [Verifica y, si procede, formaliza el contrato de encargado de tratamiento con el proveedor.]',
          ],
        },
        {
          heading: 'Tus derechos',
          body: [
            'Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a contacto@beikitbakery.com, indicando el derecho que deseas ejercer.',
            'Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
          ],
        },
      ],
    },
    ca: {
      title: 'Política de Privacitat',
      sections: [
        {
          heading: 'Responsable del tractament',
          body: [
            'Responsable: [nom o raó social del titular]. NIF/CIF: [NIF o CIF]. Domicili: Carrer Princesa, 10, 08401 Granollers (Barcelona). Correu electrònic: contacto@beikitbakery.com.',
          ],
        },
        {
          heading: 'Dades que recollim',
          body: [
            "A través del formulari de sol·licitud de càtering recollim: nom, correu electrònic, telèfon (opcional), tipus d'acte, data aproximada, nombre de persones, productes d'interès i el missatge que decideixis incloure.",
            'No recollim dades de navegació amb finalitats de seguiment ni elaborem perfils.',
          ],
        },
        {
          heading: 'Finalitat del tractament',
          body: [
            "Utilitzem les teves dades exclusivament per atendre la teva sol·licitud, elaborar i enviar-te un pressupost de càtering, i mantenir la comunicació necessària per gestionar el servei. No les emprem per a finalitats diferents ni per enviar comunicacions comercials no sol·licitades.",
          ],
        },
        {
          heading: 'Base legal',
          body: [
            "La base legal del tractament és el teu consentiment, prestat en marcar la casella d'acceptació del formulari, i l'aplicació de mesures precontractuals a petició teva (elaboració del pressupost).",
          ],
        },
        {
          heading: 'Conservació de les dades',
          body: [
            "Conservem les teves dades durant el temps necessari per gestionar la teva sol·licitud i, un cop finalitzada, durant els terminis legalment exigibles per atendre possibles responsabilitats. Transcorreguts aquests terminis, les dades se suprimeixen.",
          ],
        },
        {
          heading: 'Destinataris i encarregats del tractament',
          body: [
            "No cedim les teves dades a tercers, llevat d'obligació legal. El formulari de càtering es processa a través del proveïdor Formspree, que actua com a encarregat del tractament per fer arribar el missatge al nostre correu. [Verifica i, si escau, formalitza el contracte d'encarregat de tractament amb el proveïdor.]",
          ],
        },
        {
          heading: 'Els teus drets',
          body: [
            "Pots exercir els teus drets d'accés, rectificació, supressió, oposició, limitació del tractament i portabilitat escrivint a contacto@beikitbakery.com, indicant el dret que vols exercir.",
            "Si consideres que el tractament no s'ajusta a la normativa, pots presentar una reclamació davant l'Agència Espanyola de Protecció de Dades (www.aepd.es).",
          ],
        },
      ],
    },
  },
  cookies: {
    es: {
      title: 'Política de Cookies',
      sections: [
        {
          heading: 'Qué son las cookies',
          body: [
            'Las cookies son pequeños archivos de texto que un sitio web almacena en tu dispositivo al visitarlo. Sirven para recordar información sobre la visita y pueden ser propias o de terceros.',
          ],
        },
        {
          heading: 'Cookies y almacenamiento que utiliza este sitio',
          body: [
            'Almacenamiento técnico (necesario): guardamos tu decisión sobre cookies en el almacenamiento local de tu navegador para recordarla en visitas posteriores. Es estrictamente necesario para el funcionamiento del aviso de cookies y no requiere consentimiento.',
            'Cookies de analítica (opcionales): si las aceptas, se cargan cookies de Google Analytics (por ejemplo «_ga» y «_ga_*») que nos permiten medir de forma agregada y anónima cómo se usa la web para mejorarla. No se cargan ni se ejecuta ningún script de analítica hasta que las aceptas expresamente.',
          ],
        },
        {
          heading: 'Cookies de terceros',
          body: [
            'Si aceptas las cookies de analítica, Google LLC actúa como proveedor del servicio de medición. Asimismo, al enviar el formulario de catering, el proveedor Formspree puede instalar cookies propias en su dominio para el correcto procesamiento del envío. Estas cookies se rigen por la política de privacidad de cada proveedor.',
          ],
        },
        {
          heading: 'Gestión y revocación del consentimiento',
          body: [
            'Puedes aceptar o rechazar las cookies de analítica desde el aviso que aparece en tu primera visita, y cambiar tu decisión en cualquier momento mediante el enlace «Gestionar cookies» del pie de página. Tu decisión se recuerda durante 24 meses, transcurridos los cuales se te volverá a preguntar.',
            'Además, puedes permitir, bloquear o eliminar las cookies instaladas en tu dispositivo configurando las opciones de tu navegador.',
          ],
        },
      ],
    },
    ca: {
      title: 'Política de Cookies',
      sections: [
        {
          heading: 'Què són les cookies',
          body: [
            "Les cookies són petits fitxers de text que un lloc web emmagatzema al teu dispositiu quan el visites. Serveixen per recordar informació sobre la visita i poden ser pròpies o de tercers.",
          ],
        },
        {
          heading: 'Cookies i emmagatzematge que utilitza aquest lloc',
          body: [
            "Emmagatzematge tècnic (necessari): desem la teva decisió sobre cookies a l'emmagatzematge local del teu navegador per recordar-la en visites posteriors. És estrictament necessari per al funcionament de l'avís de cookies i no requereix consentiment.",
            "Cookies d'analítica (opcionals): si les acceptes, es carreguen cookies de Google Analytics (per exemple «_ga» i «_ga_*») que ens permeten mesurar de manera agregada i anònima com s'utilitza la web per millorar-la. No es carreguen ni s'executa cap script d'analítica fins que les acceptes expressament.",
          ],
        },
        {
          heading: 'Cookies de tercers',
          body: [
            "Si acceptes les cookies d'analítica, Google LLC actua com a proveïdor del servei de mesurament. Així mateix, en enviar el formulari de càtering, el proveïdor Formspree pot instal·lar cookies pròpies al seu domini per al processament correcte de l'enviament. Aquestes cookies es regeixen per la política de privacitat de cada proveïdor.",
          ],
        },
        {
          heading: 'Gestió i revocació del consentiment',
          body: [
            "Pots acceptar o rebutjar les cookies d'analítica des de l'avís que apareix a la teva primera visita, i canviar la teva decisió en qualsevol moment mitjançant l'enllaç «Gestionar cookies» del peu de pàgina. La teva decisió es recorda durant 24 mesos, transcorreguts els quals se't tornarà a preguntar.",
            "A més, pots permetre, bloquejar o eliminar les cookies instal·lades al teu dispositiu configurant les opcions del teu navegador.",
          ],
        },
      ],
    },
  },
}

export function LegalPage({ doc }: { doc: LegalDocKey }) {
  const { lang } = useLanguage()
  const d = CONTENT[doc][lang]
  const ui = UI[lang]

  return (
    <>
      <Helmet>
        <title>{d.title} — Beikit Bakery</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="bg-cream min-h-[80vh] px-6 md:px-12 pt-[120px] pb-24">
        <motion.article
          className="max-w-[680px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_ENTRANCE }}
        >
          <h1 className="font-display text-[40px] md:text-[56px] leading-[1.05] text-dark">
            {d.title}
          </h1>
          <p className="font-body text-[13px] text-dark/55 mt-3">
            {ui.updated}: {UPDATED[lang]}
          </p>

          {/* Draft notice — remove once content is legally reviewed */}
          <p
            role="note"
            className="font-body text-[13px] leading-[1.6] text-dark/80 bg-yellow/20 border border-yellow/50 rounded-sm px-4 py-3 mt-6"
          >
            {ui.draft}
          </p>

          <div className="flex flex-col gap-9 mt-10">
            {d.sections.map((s) => (
              <section key={s.heading} className="flex flex-col gap-3">
                <h2 className="font-body font-bold text-[17px] md:text-[19px] text-dark">
                  {s.heading}
                </h2>
                {s.body.map((p, i) => (
                  <p key={i} className="font-body text-[15px] leading-[1.7] text-dark/75">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <Button variant="dark" to="/" className="text-[12px] tracking-[0.14em] px-7 py-3.5 gap-2.5 mt-12">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {ui.back}
          </Button>
        </motion.article>
      </section>
    </>
  )
}
