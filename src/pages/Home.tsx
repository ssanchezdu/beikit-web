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
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'ca_ES'} />
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
