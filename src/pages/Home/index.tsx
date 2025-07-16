import { LanguageSwitcher } from '@/components/Customs/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation('home')
  return (
    <main>
      <LanguageSwitcher />
      <h1>{t('welcome')}</h1>
    </main>
  )
}
