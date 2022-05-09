import React, { Fragment } from 'react';
import Input from './Input';

function AddForm({ msg ,eventOnSubmit, inputs, onChange}) {
  return (
     <form onSubmit={eventOnSubmit}>
        {
           inputs.map((value, index) => {

              return (

                 <Fragment key={index}>
                    <Input
                       type={typeof value === "string" ? "text" : "text"}
                       value={value}
                       onChange={onChange[index]}
                    />

                    {/* {
                       !value.trim().length && <p>{ msg }</p>
                    } */}
                 </Fragment>

              )
           })
        }
        <Input type="submit"/>
    </form>
  )
}

export default AddForm;