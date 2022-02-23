import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createEntry from "app/entries/mutations/createEntry"
import { EntryForm, FORM_ERROR } from "app/entries/components/EntryForm"

const NewEntryPage: BlitzPage = () => {
  const router = useRouter()
  const [createEntryMutation] = useMutation(createEntry)

  return (
    <div>
      <h1>Create New Entry</h1>

      <EntryForm
        submitText="Create Entry"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateEntry}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const entry = await createEntryMutation(values)
            router.push(Routes.ShowEntryPage({ entryId: entry.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.EntriesPage()}>
          <a>Entries</a>
        </Link>
      </p>
    </div>
  )
}

NewEntryPage.authenticate = true
NewEntryPage.getLayout = (page) => <Layout title={"Create New Entry"}>{page}</Layout>

export default NewEntryPage
