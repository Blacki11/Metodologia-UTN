import * as Yup from 'yup';

export const formSchema = Yup.object({
  nombre: Yup.string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  correo: Yup.string()
    .required('El correo es obligatorio')
    .email('El correo no es válido'),
  contraseña: Yup.string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmarContraseña: Yup.string()
    .oneOf([Yup.ref('contraseña')], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña'),
});
