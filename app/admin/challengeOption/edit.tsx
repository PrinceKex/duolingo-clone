import React from 'react'
import {
  SimpleForm,
  required,
  TextInput,
  Edit,
  ReferenceInput,
  NumberInput,
  SelectInput,
  BooleanInput,
} from 'react-admin'

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='text' validate={[required()]} label='Text' />
        <BooleanInput source='correct' label='correct option' />
        <ReferenceInput source='challengeId' reference='challenges' />
        <TextInput
          source='imageSrc'
          validate={[required()]}
          label='Image URL'
        />
        <TextInput
          source='audioSrc'
          validate={[required()]}
          label='Audio URL'
        />
      </SimpleForm>
    </Edit>
  )
}
