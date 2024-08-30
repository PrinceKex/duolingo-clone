import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  NumberField,
  SelectField,
} from 'react-admin'

export const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick='edit'>
        <TextField source='id' />
        <TextField source='question' />
        <SelectField
          source='type'
          choices={[
            { id: 'SELECT', name: 'SELECT' },
            { id: 'ASSIST', name: 'ASSIST' },
          ]}
        />
        <ReferenceField source='unitId' reference='units' />
        <NumberField source='order' />
      </Datagrid>
    </List>
  )
}
