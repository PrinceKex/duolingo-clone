import React from 'react'
import {
  List,
  TextField,
  Create,
  SimpleForm,
  required,
  TextInput,
  ReferenceInput,
  NumberInput,
  SelectInput,
  BooleanInput,
} from 'react-admin'

export const ChallengeOptionCreate = () => {
  return (
    <Create>
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
    </Create>
  )
}
