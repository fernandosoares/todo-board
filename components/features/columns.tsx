import Column from './column'
import FormDialog from './form-dialog'

export default function Columns() {
  return (
    <div className="mb-12">
      <FormDialog />
      <section className="mt-10 flex gap-6 lg:gap-12">
        <Column title="Planning" status="PLANNING" />
        <Column title="Todo" status="TODO" />
        <Column title="In Progress" status="IN_PROGRESS" />
        <Column title="Done" status="DONE" />
        <Column title="Archived" status="ARCHIVED" />
      </section>
    </div>
  )
}
