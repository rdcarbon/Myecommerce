import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"

interface Props  {
    options:{ value:string;label:string;}[]
    onChange:(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void
    selectedValue:string
}
// const sortOptions = [
//     { value: "name", label: "Alphabetical" },
//     { value: "priceDesc", label: "Price - High to low" },
//     { value: "price", label: "Price - Low to high" },
//   ];
export default function RadioButtonGroup({options,onChange,selectedValue}: Props) {
  return (
    <FormControl component='fieldset'>
            <RadioGroup
              aria-label="gender"
              defaultValue={"female"}
              name="radio-buttons-group"
              value={selectedValue}
              onChange={onChange}
            >
              {options.map(({ value, label }) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={label}
                  key={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
  )
}