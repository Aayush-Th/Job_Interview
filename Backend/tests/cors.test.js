const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

const server = app.listen(0, async () => {
  const port = server.address().port;

  test('allows localhost and 127.0.0.1 frontend origins for auth requests', async () => {
    const response = await fetch(`http://127.0.0.1:${port}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://127.0.0.1:5173',
      },
      body: JSON.stringify({ email: 'demo@example.com', password: 'wrong' }),
    });

    assert.equal(response.headers.get('access-control-allow-origin'), 'http://127.0.0.1:5173');
    assert.equal(response.status, 400);
  });

  await test.run();
  server.close();
});
