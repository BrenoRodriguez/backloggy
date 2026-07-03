'use server'

import prisma from '../prisma'
import { COUNTRIES_BY_COUNTRY_CODE } from './constants'
import { queryIGDB } from './igdb'

const LIMIT_PER_REQUEST = 500

export async function importFranchises() {
  const pageTotal = await getPageAmount('franchises/count')

  for (let page = 0; page < pageTotal; page++) {
    const offset = page * LIMIT_PER_REQUEST

    const franchises: { id: number; name: string }[] = await queryIGDB(
      'franchises',
      `
        fields name;
        limit ${LIMIT_PER_REQUEST};
        offset ${offset};
      `,
    )

    await prisma.franchiseSnapshot.createMany({
      data: franchises.map(({ name, id }) => ({
        id,
        name,
      })),
      skipDuplicates: true,
    })
  }
}

export async function importCollections() {
  const pageTotal = await getPageAmount('collections/count')

  for (let page = 0; page < pageTotal; page++) {
    const offset = page * LIMIT_PER_REQUEST

    const collections: {
      id: number
      name: string
      type: { id: number; name: string }
    }[] = await queryIGDB(
      'collections',
      `
        fields name, type.name;
        limit ${LIMIT_PER_REQUEST};
        offset ${offset};
      `,
    )

    await prisma.collectionSnapshot.createMany({
      data: collections.map(({ name, id, type }) => ({
        id,
        name,
        type: type.name,
      })),
      skipDuplicates: true,
    })
  }
}

export async function importCompanies() {
  const pageTotal = await getPageAmount('companies/count')

  for (let page = 0; page < pageTotal; page++) {
    const offset = page * LIMIT_PER_REQUEST

    const companies: {
      id: number
      country: number
      parent?: number
      changed_company_id: number
      description: string
      logo: { id: number; url: string }
      name: string
      start_date: number
      url: string
      status: { id: number; name: string }
    }[] = await queryIGDB(
      'companies',
      `
        fields
          country,
          description,
          start_date,
          logo.url,
          name,
          parent,
          status.name,
          changed_company_id,
          url
        ;
          limit ${LIMIT_PER_REQUEST};
          offset ${offset};
        `,
    )

    await prisma.companySnapshot.createMany({
      data: companies.map((company) => ({
        id: company.id,
        name: company.name,
        description: company.description,
        foundingDate:
          company.start_date && company.start_date > 0
            ? new Date(company.start_date * 1000)
            : null,
        url: company.url,
        logoUrl: company.logo?.url,
        country: COUNTRIES_BY_COUNTRY_CODE[company.country],
        status: company.status.name,
      })),
      skipDuplicates: true,
    })
  }
}

export async function importParentCompanies() {
  const pageTotal = await getPageAmount('companies/count')

  for (let page = 0; page < pageTotal; page++) {
    const offset = page * LIMIT_PER_REQUEST

    const companies: {
      id: number
      country: number
      parent?: number
      changed_company_id: number
      description: string
      logo: { id: number; url: string }
      name: string
      start_date: number
      url: string
      status: { id: number; name: string }
    }[] = await queryIGDB(
      'companies',
      `
        fields
          country,
          description,
          start_date,
          logo.url,
          name,
          parent,
          status.name,
          changed_company_id,
          url
        ;
          limit ${LIMIT_PER_REQUEST};
          offset ${offset};
        `,
    )

    for (const company of companies) {
      if (!company.parent) continue

      const parentExists = await prisma.companySnapshot.findUnique({
        where: { id: company.parent },
        select: { id: true },
      })

      if (!parentExists) continue

      await prisma.companySnapshot.update({
        where: { id: company.id },
        data: { parentId: company.parent },
      })
    }

    console.log('Page: ' + page)
  }
}

async function getPageAmount(endpoint: string) {
  const itemAmount: { count: number } = await queryIGDB(endpoint, '')

  return Math.ceil(itemAmount.count / LIMIT_PER_REQUEST)
}

/*

for (const company of companies) {
  if (!company.parent) break

  await prisma.companySnapshot.update({
    where: { id: company.id },
    data: { parentId: company.parent },
  })
}
*/
