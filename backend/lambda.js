exports.handler = async (event) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const headers = {
    'Access-Control-Allow-Origin': frontendUrl,
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.path === '/api/hello') {
    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello from backend!' }),
    };
  }

  if (event.path === '/api/update' && event.httpMethod === 'PUT') {
    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Update received', data: event.body }),
    };
  }

  return {
    statusCode: 200,
    headers: { ...headers, 'Content-Type': 'text/plain' },
    body: 'Hello World\n',
  };
};
