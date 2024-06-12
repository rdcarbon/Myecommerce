import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react'

type Props = {
    items:string[];
    checked:string[];
    onChange:(items:string[])=>void;
}

export default function CheckboxButtons({items,checked,onChange}: Props) {
  const [checkedItems,setCheckedItems]=React.useState(checked || [] as string[])
  function handleChecked(value:string){
   const  currentIndex= checkedItems.findIndex(item=>item===value)
   let newChecked:string[]=[]
   if (currentIndex===-1) newChecked=[...checkedItems,value];
   else newChecked=checkedItems.filter(item=> item!==value);
   setCheckedItems(newChecked)
   onChange(newChecked)
  }

    return (
    <FormGroup>
    {items.map((item) => (
      <FormControlLabel
        key={item}
        control={<Checkbox key={item} checked={checkedItems.indexOf(item)>=0} onChange={()=>handleChecked(item)}/>}
        label={item}
        

      />
    ))}
  </FormGroup>
  )
}