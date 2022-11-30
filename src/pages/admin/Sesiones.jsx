import { FaStopCircle } from 'react-icons/fa';
// Bootstrap
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// Components
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
// Data Table
import DataTable from '../../components/DataTable';
// Queries
import { useGetSesiones, useEliminar } from '../../queries/useAdmin';
// Utils
import { formatDateMed } from '../../utils/formatUtils';

export default function Sesiones() {
  const { isLoading, isError, error, data } = useGetSesiones();
  const { mutateAsync: eliminar } = useEliminar();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error.message} />;
  }

  const handleEliminar = async (id) => {
    await eliminar(id);
  };

  // Data Table
  // ----------
  const columns = [
    { Header: 'Nombre', accessor: 'usuario.nombre' },
    { Header: 'Apellido', accessor: 'usuario.apellido' },
    { Header: 'Role', accessor: 'usuario.role.descripcion' },
    { Header: 'Dispositivo', accessor: 'userAgent' },
    { Header: 'IP', accessor: 'ip' },
    {
      Header: 'Creada',
      accessor: 'createdAt',
      Cell: ({ row }) => formatDateMed(new Date(row.original.createdAt)),
    },
    {
      Header: 'Acciones',
      accessor: 'none',
      Cell: (props) => {
        return (
          <div className='text-nowrap' style={{ textAlign: 'center' }}>
            <OverlayTrigger overlay={<Tooltip>Eliminar sesión</Tooltip>}>
              <Button
                size='sm'
                variant='danger'
                onClick={() => handleEliminar(props.row.original._id)}
              >
                <FaStopCircle />
              </Button>
            </OverlayTrigger>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <h2>Sesiones</h2>
      <p>Sesiones activas en el sistema.</p>
      {data && <DataTable columns={columns} data={data.data} footer={false} />}
    </>
  );
}
