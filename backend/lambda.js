exports.handler = async (event) => {
  // Normalize path to handle stage prefixes (/prod, /dev, etc.) and case
  const rawPath = (event.path || '').toLowerCase();
  const path = rawPath.replace(/^\/(prod|dev|staging)\//, '/');
  const method = event.httpMethod || 'GET';

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  const baseHeaders = {
    'Access-Control-Allow-Origin': frontendUrl,
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (method === 'OPTIONS') {
    return { statusCode: 200, headers: baseHeaders, body: '' };
  }

  if (path.endsWith('/api/hello') && method === 'GET') {
    return {
      statusCode: 200,
      headers: { ...baseHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello from backend!' }),
    };
  }

  if (path.endsWith('/api/update') && method === 'PUT') {
    let parsedBody = event.body;
    try {
      if (typeof parsedBody === 'string' && parsedBody.trim()) {
        parsedBody = JSON.parse(parsedBody);
      }
    } catch (_) {
      // leave as raw string if JSON parse fails
    }
    return {
      statusCode: 200,
      headers: { ...baseHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Update received', data: parsedBody }),
    };
  }

  return {
    statusCode: 404,
    headers: { ...baseHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Not Found', path: event.path, method }),
  };
};
