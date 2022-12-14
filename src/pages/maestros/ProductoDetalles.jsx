import { Link, useParams } from 'react-router-dom';
// Bootstrap
import Button from 'react-bootstrap/Button';
// Components
import Loader from '../../components/Loader';
// Queries
import { useGetProducto } from '../../queries/useMaestros';

export default function ProductoDetalles() {
  let { id } = useParams();

  const { isLoading, data } = useGetProducto(id);
  console.log(data?.data?.rows[0]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h2>Producto</h2>
      <p>Detalles de producto {id}</p>
      <Link to='/maestros/productos'>
        <Button variant='primary'>Regresar</Button>
      </Link>
    </>
  );
}
