import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../lib/i18n'
import { HeroSection } from '../components/sections/HeroSection'
import { MenuSection } from '../components/sections/MenuSection'
import { ClaimSection } from '../components/sections/ClaimSection'
import { NosotrosSection } from '../components/sections/NosotrosSection'
import { RRSSSection } from '../components/sections/RRSSSection'
import { DeliverySection } from '../components/sections/DeliverySection'

export function Home() {
  const { lang, t } = useLanguage()

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.homeTitle}</title>
        <meta name="description" content={t.meta.homeDesc} />
        <meta property="og:title" content={t.meta.homeTitle} />
        <meta property="og:description" content={t.meta.homeOgDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beikitbakery.com" />
        <meta property="og:site_name" content="Beikit Bakery" />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'ca_ES'} />
        <meta property="og:image" content="https://beikitbakery.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={t.meta.homeTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.homeTitle} />
        <meta name="twitter:description" content={t.meta.homeOgDesc} />
        <meta name="twitter:image" content="https://beikitbakery.com/og-image.png" />
        <link rel="canonical" href="https://beikitbakery.com" />
        {/* JSON-LD lives statically in index.html so non-JS crawlers get it;
            duplicating it here would render a second identical block. */}
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
