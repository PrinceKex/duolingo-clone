import React from 'react'
import { SimpleForm, required, TextInput, Edit } from 'react-admin'

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='id' validate={[required()]} label='Title' />
        <TextInput source='title' validate={[required()]} label='Title' />
        <TextInput source='imageSrc' validate={[required()]} label='image' />
      </SimpleForm>
    </Edit>
  )
}
