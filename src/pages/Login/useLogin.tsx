import { useForm } from 'react-hook-form'

type LoginFormValues = {
  email: string
  password: string
}

export function useLogin() {
  const { handleSubmit, control } = useForm<LoginFormValues>()

  const onSubmit = handleSubmit(async (data: LoginFormValues) => {
    console.log('data', data)
  })

  return [{ control }, { onSubmit }] as const
}
