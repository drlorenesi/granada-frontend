import Alert from 'react-bootstrap/Alert';

export default function ErrorMessage({ message }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Alert variant='danger'>
        <Alert.Heading>The following error ocurred:</Alert.Heading>
        <ul>
          <li>{message}</li>
        </ul>
      </Alert>
    </div>
  );
}
