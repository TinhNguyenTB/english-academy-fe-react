import { FormInput } from '@/components/Atoms/FormInput'
import { Button, Form } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useLogin } from '@/pages/Login/useLogin'
import { useTranslation } from 'react-i18next'

export function LoginPage() {
  const { t } = useTranslation('common')
  const [values, handles] = useLogin()
  const { control } = values
  const { onSubmit } = handles

  return (
    <main
      className='flex items-center justify-center h-screen px-4 overflow-auto bg-cover bg-center'
      style={{ backgroundImage: "url('/images/bgLogin.jpg')" }}
    >
      <div className='w-full max-w-md bg-white opacity-80 p-6 rounded-xl shadow-md'>
        <Form layout='vertical' onFinish={onSubmit}>
          <FormInput
            control={control}
            name='email'
            label='Email'
            required
            size='large'
            rules={{
              required: t('validation.required'),
              pattern: { value: /^\S+@\S+$/, message: t('validation.email') }
            }}
            prefix={<MailOutlined />}
          />

          <FormInput
            control={control}
            name='password'
            label='Password'
            password
            size='large'
            required
            rules={{ required: t('validation.required') }}
            prefix={<LockOutlined />}
          />
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              {t('btn.login')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  )
}
