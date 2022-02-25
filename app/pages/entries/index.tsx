import { Suspense, useState } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEntries from "app/entries/queries/getEntries"
import { EntryButtonGrid } from "app/entries/components/Grid"

const ITEMS_PER_PAGE = 100

export const EntriesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ entries, hasMore }] = usePaginatedQuery(getEntries, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link href={Routes.ShowEntryPage({ entryId: entry.id })}>
              <a>
                {entry.createdAt.toString()} {entry.energy.toString()} - {entry.valence.toString()}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const CreateEntry = () => {
  const [energy, setEnergy] = useState(0)
  const [valence, setValence] = useState(0)

  return (
    <>
      <EntryButtonGrid
        onChange={({ energy, valence }) => {
          setEnergy(energy)
          setValence(valence)
        }}
      />
      energy: {energy} - valence: {valence}
    </>
  )
}

const EntriesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Entries</title>
      </Head>

      <div>
        <CreateEntry />

        <Suspense fallback={<div>Loading...</div>}>
          <EntriesList />
        </Suspense>
      </div>
    </>
  )
}

EntriesPage.authenticate = true
EntriesPage.getLayout = (page) => <Layout>{page}</Layout>

export default EntriesPage
