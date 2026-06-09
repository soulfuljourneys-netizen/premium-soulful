import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const HUBSPOT_API_BASE = 'https://api.hubapi.com';
const HUBSPOT_TIME_PROPERTY = 'timespent';

async function readJsonBody(req: any) {
  return new Promise<any>((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer | string) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function getHubspotAuthConfig() {
  const apiKey = process.env.HUBSPOT_API_KEY || '';
  if (!apiKey) {
    return null;
  }
  if (apiKey.startsWith('pat-')) {
    return {
      query: '',
      headers: { Authorization: `Bearer ${apiKey}` },
    };
  }
  return {
    query: `?hapikey=${encodeURIComponent(apiKey)}`,
    headers: {},
  };
}

async function hubspotMiddleware(req: any, res: any, next: any) {
  if (!req.url) return next();
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith('/api/hubspot')) return next();

  const auth = getHubspotAuthConfig();
  if (!auth) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Missing HUBSPOT_API_KEY environment variable.' }));
    return;
  }

  try {
    if (url.pathname === '/api/hubspot-contact' && req.method === 'GET') {
      const id = url.searchParams.get('id');
      if (!id) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Missing HubSpot contact id.' }));
        return;
      }

      const response = await fetch(
        `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${encodeURIComponent(id)}${auth.query}&properties=firstname,lastname,email,phone,${HUBSPOT_TIME_PROPERTY}`,
        {
          headers: {
            Accept: 'application/json',
            ...(auth.headers as Record<string, string>),
          },
        },
      );
      const json = await response.json();
      res.statusCode = response.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(json));
      return;
    }

    if (url.pathname === '/api/hubspot-time-spent' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const id = body?.id;
      const time_spent_seconds = body?.time_spent_seconds;
      if (!id || typeof time_spent_seconds !== 'number') {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            error: 'Missing id or time_spent_seconds in request payload.',
          }),
        );
        return;
      }

      const response = await fetch(
        `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${encodeURIComponent(id)}${auth.query}`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(auth.headers as Record<string, string>),
          },
          body: JSON.stringify({
            properties: {
              [HUBSPOT_TIME_PROPERTY]: String(time_spent_seconds),
            },
          }),
        },
      );
      const json = await response.json();
      res.statusCode = response.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(json));
      return;
    }

    next();
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'HubSpot proxy error',
      }),
    );
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
    {
      name: 'hubspot-api-proxy',
      configureServer(server) {
        server.middlewares.use(hubspotMiddleware);
      },
      configurePreviewServer(server) {
        server.middlewares.use(hubspotMiddleware);
      },
    },
  ],
})
