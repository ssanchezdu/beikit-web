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
        <title>Beikit Bakery</title>
        <meta name="description" content="Cookies, cheesecakes y milkshakes artesanales. American Bakery en Granollers. Pedidos a domicilio vía Uber Eats." />
        {/* og:title keeps the full descriptive form for link previews —
            shorter tab titles, richer share cards. */}
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
