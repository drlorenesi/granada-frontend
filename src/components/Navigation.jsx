import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
// Bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
// Auth Hook
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(null);
  const { useLogout } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => setMenuOpen(false);

  const { mutateAsync: logout } = useLogout('/login');

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <Navbar
        bg='light'
        expand='sm'
        sticky='top'
        className='shadow-sm rounded mb-2'
      >
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            <FaHome />
          </Navbar.Brand>
          <Navbar.Toggle onClick={toggleMenu} />
          <Navbar.Offcanvas
            placement='end'
            show={menuOpen ? 1 : 0}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <hr />
              {/* Left side Nav */}
              {/* -------------- */}
              <Nav className='me-auto'>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  {/* Ventas */}
                  <NavDropdown title='Ventas'>
                    {/* Por Canal */}
                    <NavDropdown.Item
                      as={NavLink}
                      to='ventas/canal'
                      onClick={menuOpen ? toggleMenu : null}
                    >
                      Por Canal
                    </NavDropdown.Item>
                    {/* Por Producto */}
                    <NavDropdown.Item
                      as={NavLink}
                      to='ventas/producto'
                      onClick={menuOpen ? toggleMenu : null}
                    >
                      Por Producto
                    </NavDropdown.Item>
                    {/* Por Categría */}
                    <NavDropdown.Item
                      as={NavLink}
                      to='ventas/categoria'
                      onClick={menuOpen ? toggleMenu : null}
                    >
                      Por Categría
                    </NavDropdown.Item>
                  </NavDropdown>
                  {/* Producción */}
                  <NavDropdown title='Producción'>
                    {/* Sugerido PT*/}
                    <NavDropdown.Item
                      as={NavLink}
                      to='produccion/sugerido-pt'
                      onClick={menuOpen ? toggleMenu : null}
                    >
                      Orden Sugerida - PT
                    </NavDropdown.Item>
                    {/* Sugerido Materiales */}
                    <NavDropdown.Item
                      as={NavLink}
                      to='produccion/sugerido-ma'
                      onClick={menuOpen ? toggleMenu : null}
                    >
                      Orden Sugerida - Materiales
                    </NavDropdown.Item>
                  </NavDropdown>
                  {/* Posts */}
                  <Nav.Link
                    as={NavLink}
                    to='posts'
                    onClick={menuOpen ? toggleMenu : null}
                  >
                    Posts
                  </Nav.Link>
                </Nav>
              </Nav>
              {/* Right side Nav */}
              {/* ------------- */}
              <Nav>
                <Nav.Link
                  as={NavLink}
                  to='info'
                  onClick={menuOpen ? toggleMenu : null}
                >
                  Info
                </Nav.Link>
                {/* Dropdown Admin */}
                <NavDropdown align='end' title='Admin'>
                  <NavDropdown.Item
                    as={NavLink}
                    to='admin/usuarios'
                    onClick={menuOpen ? toggleMenu : null}
                  >
                    Usuarios
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to='admin/sesiones'
                    onClick={menuOpen ? toggleMenu : null}
                  >
                    Sesiones
                  </NavDropdown.Item>
                </NavDropdown>
                {/* Dropdown Usuario */}
                <NavDropdown align='end' title={<FaUserCircle size={21} />}>
                  <NavDropdown.Item
                    as={NavLink}
                    to='perfil'
                    onClick={menuOpen ? toggleMenu : null}
                  >
                    Mi Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to='pass'
                    onClick={menuOpen ? toggleMenu : null}
                  >
                    Cambiar Contraseña
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <span className='d-flex'>
                      <div className='me-auto'>Cerrar Sesión</div>
                      <div>
                        <FaSignOutAlt />
                      </div>
                    </span>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
