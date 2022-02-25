import { useMutation } from "blitz"
import createEntry from "../mutations/createEntry"
import { CreateEntryInput } from "../validations"

export interface CreateEntryProps {
  onChange: (values: CreateEntryInput) => void
}

export interface CreateEntryFormValues {
  energy: number
  valence: number
}

const VALENCE = [0, 1, 2, 3, 4, 5] as const
const ENERGY = [5, 4, 3, 2, 1, 0] as const

export const EntryButtonGrid: React.FC<CreateEntryProps> = ({ onChange }) => {
  // 6x6 grid of buttons, with x axis being the valence and y axis being the energy
  // Each button is a clickable square
  // Each square has a value of between 0 and 5

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(6, 1fr)",
        width: `${6 * 40}px`,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {ENERGY.map((y) =>
        VALENCE.map((x) => (
          <button
            style={{
              backgroundColor: "white",
              border: "1px solid black",
              width: "40px",
              height: "40px",
            }}
            key={`${y}-${x}`}
            onClick={() =>
              onChange({
                energy: y,
                valence: x,
              })
            }
          >
            {x}:{y}
          </button>
        ))
      )}
    </div>
  )
}
