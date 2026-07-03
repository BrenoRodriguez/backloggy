'use server'
import 'dotenv/config'
import prisma from '../prisma'

export async function getIGDBToken() {
  const stored = await prisma.apiToken.findUnique({
    where: {
      provider: 'igdb',
    },
  })

  if (stored && stored.expiresAt > new Date()) {
    return stored.token
  }

  const newToken = await updateIGDBToken()

  return newToken
}

async function updateIGDBToken() {
  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.IGDB_CLIENT_ID || '',
      client_secret: process.env.IGDB_CLIENT_SECRET || '',
      grant_type: 'client_credentials',
    }),
    // IMPORTANT: only request a new token if needed
    cache: 'no-store',
  })

  const data = await res.json() // { access_token, expires_in }

  const expiresAt = new Date(Date.now() + data.expires_in * 1000)

  await prisma.apiToken.upsert({
    where: { provider: 'igdb' },
    update: {
      token: `Bearer ${data.access_token}`,
      expiresAt,
    },
    create: {
      provider: 'igdb',
      token: `Bearer ${data.access_token}`,
      expiresAt,
    },
  })

  return `Bearer ${data.access_token}`
}

export async function queryIGDB(endpoint: string, query: string) {
  const igdbToken = await getIGDBToken()

  const res = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
    method: 'POST',
    headers: {
      'Client-ID': process.env.IGDB_CLIENT_ID || '',
      Authorization: igdbToken,
    },
    body: query,
  })

  if (!res.ok) {
    throw new Error(`IGDB error: ${await res.text()}`)
  }

  return res.json()
}
