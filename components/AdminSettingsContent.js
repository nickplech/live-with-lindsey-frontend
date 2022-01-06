import React from 'react'
import Calendar from './Calendar'
import Tabs from './Tabs'
import UpdateEquipment from './UpdateEquipment'
import CreatePrivateClass from './CreatePrivateClass'
import UpdateTagSettings from './UpdateTagSettings'
import UpdateScheduleSettings from './UpdateScheduleSettings'

const AdminSettingsContent = () => {
  return (
    <Tabs
      activeTab={{
        id: 'tab1',
      }}
    >
      <Tabs.Tab id="tab1" title="book">
        <Calendar />
      </Tabs.Tab>
      <Tabs.Tab id="tab2" title="classtype">
        <UpdateScheduleSettings />
      </Tabs.Tab>
      <Tabs.Tab id="tab3" title="search">
        <UpdateTagSettings />
      </Tabs.Tab>
      <Tabs.Tab id="tab4" title="weighty">
        <UpdateEquipment />
      </Tabs.Tab>
      <Tabs.Tab id="tab5" title="person">
        <CreatePrivateClass />
      </Tabs.Tab>
    </Tabs>
  )
}
export default AdminSettingsContent
