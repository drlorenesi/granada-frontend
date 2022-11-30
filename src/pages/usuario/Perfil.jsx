import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Form Inputs
import InputField from '../../components/formInputs/InputField';
import SelectField from '../../components/formInputs/SelectField';
import Submit from '../../components/formInputs/Submit';
// Components
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
// Queries
import { useGetRoles } from '../../queries/useRoles';
import { useGetPerfil } from '../../queries/usePerfil';

export default function Perfil() {
  const { isLoading: isLoadingRoles, data: roles } = useGetRoles();
  const selectOptions = roles?.data.map((role) => {
    return { key: role.descripcion, value: role.nivel };
  });

  const {
    isLoading: isLoadingPerfil,
    isError,
    error,
    data,
  } = useGetPerfil(!!roles);

  const defaultValues = {
    nombre: data?.data.nombre || '',
    apellido: data?.data.apellido || '',
    extension: data?.data.extension || '',
    email: data?.data.email || '',
    role: data?.data.role.nivel || '',
  };

  const validationSchema = yup.object({
    nombre: yup
      .string()
      .min(2, 'Tu nombre no puede ser menor de 2 caracteres.')
      .max(255, 'Tu nombre no puede ser mayor de 255 caracteres.')
      .required('Campo requerido.'),
    apellido: yup
      .string()
      .min(2, 'Tu apellido no puede ser menor de 2 caracteres.')
      .max(255, 'Tu apellido no puede ser mayor de 255 caracteres.')
      .required('Campo requerido.'),
    extension: yup
      .string()
      .min(2, 'Tu extension no puede ser menor de 2 caracteres.')
      .max(255, 'Tu extension no puede ser mayor de 255 caracteres.')
      .nullable(),
    email: yup.string().email('Correo electrónico inválido.'),
    role: yup.number('test').integer().min(0).max(10),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  // effect runs when data updated
  useEffect(() => {
    // reset form with user data
    reset({
      nombre: data?.data.nombre || '',
      apellido: data?.data.apellido || '',
      extension: data?.data.extension || '',
      email: data?.data.email || '',
      role: data?.data.role.nivel || '',
    });
  }, [reset, data]);

  const onSubmit = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(JSON.stringify(data, null, 2));
      }, 500);
    });
  };

  if (isLoadingRoles || isLoadingPerfil) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error.message} />;
  }

  return (
    <>
      <h2>Mi Perfil</h2>
      <Row>
        <Col lg={4} md={6} sm={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre */}
            <Form.Group className='mb-2'>
              <Form.Label>Nombre:</Form.Label>
              <InputField control={control} name='nombre' type='text' />
            </Form.Group>
            {/* Apellido */}
            <Form.Group className='mb-2'>
              <Form.Label>Apellido:</Form.Label>
              <InputField control={control} name='apellido' type='text' />
            </Form.Group>
            {/* Extension */}
            <Form.Group className='mb-2'>
              <Form.Label>Extensión:</Form.Label>
              <InputField control={control} name='extension' type='text' />
            </Form.Group>
            {/* Email */}
            <Form.Group className='mb-2'>
              <Form.Label>Email:</Form.Label>
              <InputField
                control={control}
                name='email'
                type='email'
                disabled
              />
            </Form.Group>
            {/* Role */}
            <Form.Group className='mb-2'>
              <Form.Label>Role:</Form.Label>
              <SelectField
                control={control}
                name='role'
                options={selectOptions}
                disabled
              />
            </Form.Group>
            <Submit
              name='Actualizar'
              isSubmitting={isSubmitting}
              error={Object.keys(errors).length > 0}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
}
