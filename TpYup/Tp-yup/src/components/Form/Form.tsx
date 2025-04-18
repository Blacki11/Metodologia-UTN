import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { formSchema } from '../../schemas/formSchema';
import Swal from 'sweetalert2';
import styles from './form.module.css';

interface FormState {
  nombre: string;
  correo: string;
  contraseña: string;
  confirmarContraseña: string;
}

interface Errors {
  [key: string]: string;
}

const Form: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const validateField = async (name: string, value: string) => {
    try {
      await formSchema.validateAt(name, { ...form, [name]: value });
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await formSchema.validate(form, { abortEarly: false });
      setErrors({});
      Swal.fire('Formulario enviado correctamente', '', 'success');
      setForm({
        nombre: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: '',
      });
    } catch (err: any) {
      const newErrors: Errors = {};
      err.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} error={errors.nombre} />
      <Input label="Correo" name="correo" type="email" value={form.correo} onChange={handleChange} error={errors.correo} />
      <Input label="Contraseña" name="contraseña" type="password" value={form.contraseña} onChange={handleChange} error={errors.contraseña} />
      <Input label="Confirmar Contraseña" name="confirmarContraseña" type="password" value={form.confirmarContraseña} onChange={handleChange} error={errors.confirmarContraseña} />
      <Button disabled={Object.keys(errors).length > 0 || Object.values(form).some(val => val === '')}>Enviar</Button>
    </form>
  );
};

export default Form;
