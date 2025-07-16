import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

const languages = [
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Tiếng Việt' }
]

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  return (
    <Select
      value={i18n.language}
      style={{ width: 120 }}
      onChange={(lng) => i18n.changeLanguage(lng)}
      options={languages}
    />
  )
}
