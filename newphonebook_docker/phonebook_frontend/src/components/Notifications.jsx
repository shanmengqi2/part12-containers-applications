const Notifications = ({ message, type }) => {

  const styleSuccess = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const styleError = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === '') {
    return null
  }

  return (
    <div style={type === 'success' ? styleSuccess : styleError}>
      {message}
    </div>
  )
}

export default Notifications
