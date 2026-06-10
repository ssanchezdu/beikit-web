import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../lib/i18n'
import { HeroSection } from '../components/sections/HeroSection'
import { MenuSection } from '../components/sections/MenuSection'
import { ClaimSection } from '../components/sections/ClaimSection'
import { NosotrosSection } from '../components/sections/NosotrosSection'
import { RRSSSection } from '../components/sections/RRSSSection'
import { DeliverySection } from '../components/sections/DeliverySection'

export function Home() {
  const { lang } = useLanguage()

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>Beikit Bakery — American Bakery en Granollers</title>
        <meta name="description" content="Cookies, cheesecakes y milkshakes artesanales. American Bakery en Granollers. Pedidos a domicilio vía Uber Eats." />
        <meta property="og:title" content="Beikit Bakery — American Bakery en Granollers" />
        <meta property="og:description" content="Cookies, cheesecakes y milkshakes artesanales. Heartmade Everyday." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beikitbakery.com" />
        <meta property="og:site_name" content="Beikit Bakery" />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'ca_ES'} />
        <meta property="og:image" content="https://beikitbakery.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Beikit Bakery — American Bakery en Granollers" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Beikit Bakery — American Bakery en Granollers" />
        <meta name="twitter:description" content="Cookies, cheesecakes y milkshakes artesanales. Heartmade Everyday." />
        <meta name="twitter:image" content="https://beikitbakery.com/og-image.png" />
        <link rel="canonical" href="https://beikitbakery.com" />
        <script type="application/ld+json">{`{
  "@context": "https://schema.org",
  "@type": "Bakery",
  "name": "Beikit Bakery",
  "description": "American Bakery en Granollers. Cookies, cheesecakes y milkshakes artesanales. Heartmade Everyday.",
  "url": "https://beikitbakery.com",
  "telephone": "+34603919473",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Carrer Princesa, 10",
    "addressLocality": "Granollers",
    "postalCode": "08401",
    "addressCountry": "ES"
  },
  "servesCuisine": ["American"],
  "priceRange": "€€",
  "image": "https://beikitbakery.com/og-image.png",
  "sameAs": [
    "https://www.instagram.com/beikit_bakery/",
    "https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw"
  ]
}`}</script>
      </Helmet>

      <HeroSection />
      <MenuSection />
      <DeliverySection />
      <ClaimSection />
      <NosotrosSection />
      <RRSSSection />
    </>
  )
}
