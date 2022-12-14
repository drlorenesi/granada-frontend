import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Form Inputs
import SelectField from '../../components/formInputs/SelectField';
import CheckboxGroupField from '../../components/formInputs/CheckboxGroupField';
import Submit from '../../components/formInputs/Submit';
// Queries
import { useGetProductos } from '../../queries/useMaestros';
// Data Table
import DataTable from '../../components/DataTable';
// Utils
// import { formatDec } from '../../utils/formatUtils';

export default function PorCanal() {
  const tipoOptions = [
    { key: 'Producto Terminado', value: '0' },
    { key: 'Materia Prima', value: '1' },
    { key: 'Producto Intermedio', value: '4' },
    { key: 'Material de Empaque', value: '2' },
    { key: 'Útiles de Limpieza', value: '3' },
  ];

  const checkboxOptions = [
    { key: 'Activo', value: '1' },
    { key: 'Inactivo', value: '0' },
  ];

  const defaultValues = {
    tipo: '0',
    estatus: ['1'],
  };

  const validationSchema = yup.object({
    tipo: yup
      .number()
      .typeError('Por favor seleccionar una opción.')
      .required('Campo obligatorio')
      .nullable(),
    estatus: yup
      .array()
      .of(yup.string())
      .min(1, 'Debes seleccionar almenos una opción.'),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const {
    isLoading,
    isFetching,
    refetch,
    data,
    // dataUpdatedAt,
    // isError,
    // error,
  } = useGetProductos(
    false,
    getValues('tipo'),
    encodeURIComponent(getValues('estatus'))
  );

  // Data Table
  // ----------
  const columns = [
    {
      Header: 'Código',
      accessor: 'codigo',
      Cell: ({ row }) => {
        return (
          <Link
            to={`/maestros/productos/${row.original.codigo}`}
            // target='_blank'
            // rel='noreferrer'
            style={{ textDecoration: 'none' }}
          >
            {row.original.codigo}
          </Link>
        );
      },
    },
    { Header: 'Código Alt', accessor: 'codigo_alt' },
    { Header: 'Descripción', accessor: 'descripcion' },
    {
      Header: 'Estatus',
      accessor: 'estatus',
      Cell: ({ row }) => {
        return row.original.estatus === 'Inactivo' ? (
          <span style={{ color: 'red' }}>Inactivo</span>
        ) : (
          <span style={{ color: 'green' }}>Activo</span>
        );
      },
    },
  ];

  const onSubmit = async (data) => {
    refetch();
  };

  // Sum up to 12
  const labelSize = 4;
  const inputSize = 8;

  return (
    <>
      <h2>Productos</h2>
      {/* Row 1 */}
      <Row>
        {/* Row 1 - Col 1 */}
        <Col lg={4} md={4} sm={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Tipo */}
            <Form.Group as={Row} className='mb-2'>
              <Form.Label column sm={labelSize}>
                Tipo:
              </Form.Label>
              <Col sm={inputSize}>
                <SelectField
                  control={control}
                  name='tipo'
                  options={tipoOptions}
                />
              </Col>
            </Form.Group>
            {/* Estatus */}
            <Form.Group as={Row} className='mb-2'>
              <Form.Label column sm={labelSize}>
                Estatus:
              </Form.Label>
              <Col sm={inputSize}>
                <CheckboxGroupField
                  control={control}
                  name='estatus'
                  options={checkboxOptions}
                />
              </Col>
            </Form.Group>
            {/* Submit */}
            <Form.Group as={Row}>
              <Col sm={{ span: inputSize, offset: labelSize }}>
                <Submit
                  name='Enviar'
                  isSubmitting={isSubmitting || isLoading || isFetching}
                  error={Object.keys(errors).length > 0}
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
        {/* Row 1 - Col 2 */}
        <Col lg={4} md={4} sm={6}></Col>
      </Row>
      {/* Row 2 */}
      <br />
      <Row>
        <Col>
          {data && (
            <DataTable columns={columns} data={data.data.rows} footer={true} />
          )}
        </Col>
      </Row>
    </>
  );
}
