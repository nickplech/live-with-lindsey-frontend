import React from 'react'
import AdminCalendarAlt from './AdminCalendarAlt'
import Tabs from './Tabs'
import UpdateEquipment from './UpdateEquipment'
import styled from 'styled-components'
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
        <AdminCalendarAlt />
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
    </Tabs>
  )
}
export default AdminSettingsContent
