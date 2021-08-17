import React, { useState } from 'react'
import Signup from './Signup'
import SelectSubscription from './SelectSubscription'

function SelectSubscriptionSwitch() {
  const [plan, setPlan] = useState(null)
  const handleSetPlan = (e, planType) => {
    e.preventDefault()
    const thePlan = planType
    setPlan(thePlan)
  }
  if (plan) {
    return <Signup plan={plan} />
  }
  return <SelectSubscription handleSetPlan={handleSetPlan} />
}

export default SelectSubscriptionSwitch
