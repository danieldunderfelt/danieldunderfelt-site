import React from 'react'
import { observer } from 'mobx-react'

export default observer(props => {
  
  return (
    <div className="Hero">
      { props.children }
    </div>
  )
})
