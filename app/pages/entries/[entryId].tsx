import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEntry from "app/entries/queries/getEntry"
import deleteEntry from "app/entries/mutations/deleteEntry"

export const Entry = () => {
  const router = useRouter()
  const entryId = useParam("entryId", "number")
  const [deleteEntryMutation] = useMutation(deleteEntry)
  const [entry] = useQuery(getEntry, { id: entryId })

  return (
    <>
      <Head>
        <title>Entry {entry.id}</title>
      </Head>

      <div>
        <h1>Entry {entry.id}</h1>
        <pre>{JSON.stringify(entry, null, 2)}</pre>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteEntryMutation({ id: entry.id })
              router.push(Routes.EntriesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowEntryPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.EntriesPage()}>
          <a>Entries</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Entry />
      </Suspense>
    </div>
  )
}

ShowEntryPage.authenticate = true
ShowEntryPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowEntryPage
