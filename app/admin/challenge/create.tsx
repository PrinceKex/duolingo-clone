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
} from 'react-admin'

export const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source='question' validate={[required()]} label='Question' />
        <SelectInput
          source='type'
          choices={[
            { id: 'SELECT', name: 'SELECT' },
            { id: 'ASSIST', name: 'ASSIST' },
          ]}
          validate={[required()]}
        />
        <ReferenceInput source='lessonId' reference='lessons' />
        <NumberInput source='order' validate={[required()]} label='order' />
      </SimpleForm>
    </Create>
  )
}
