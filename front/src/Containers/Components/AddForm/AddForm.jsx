import React, { Fragment } from 'react'

function AddForm({ eventOnSubmit, inputs, onChange}) {
  return (
     <form onSubmit={eventOnSubmit}>
        {
           inputs.map((value, index) => {

              return (

                 <Fragment key={index}>
                    <Input
                       type={typeof value === "string" ? "text" : "number"}
                       value={value}
                       onChange={onChange[index]}
                    />

                    {
                       !value.trim().length && <p>{ msg }</p>
                    }
                 </Fragment>

              )
           })
        }
    </form>
  )
}

export default AddForm;