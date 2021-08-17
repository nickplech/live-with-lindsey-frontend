import React from 'react'
import UpdateUserProfiles from './UpdateUserProfile'
import Tabs from './Tabs'
import styled from 'styled-components'
import OrderCount from './OrdersList'
import { useUser } from './User'

const Styled = styled.div`
  text-align: left;
  max-width: ${(props) => props.theme.innerWidth};
  margin: 0 auto;
  padding: 2rem;
  padding-top: 0;
`

const TabParent = ({page}) => {
  const me = useUser()
  if (!me) return null

  return (
    <Styled>
      <Tabs
        activeTab={{
          id: 'tab1',
        }}
      >
        <Tabs.Tab id="tab1" title="profile">
          <UpdateUserProfiles
            id={me.id}
            cellPhone={me.cellPhone}
            email={me.email}
            businessName={me.businessName}
            image={me.image}
          />
        </Tabs.Tab>
        <Tabs.Tab id="tab2" title="order history">
          <OrderCount page={page} userId={me.id} />
        </Tabs.Tab>

      </Tabs>
    </Styled>
  )
}
export default TabParent
