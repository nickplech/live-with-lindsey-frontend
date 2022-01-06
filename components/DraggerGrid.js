import React from 'react'
import _ from 'lodash'
import gql from 'graphql-tag'
//  import {Mutation} from '@apollo/client'
// import '../static/styles.css'
import { format } from 'date-fns'
import styled from 'styled-components'
import RGL, { WidthProvider } from 'react-grid-layout'


const ReactGridLayout = WidthProvider(RGL)


const StyledInput = styled.button`
  text-align: left;
  padding: 0;
  /* padding-top: 3px; */
  outline: none;
  font-weight: 600;
  display: flex;
  flex-flow: column;align-items: flex-start;
  justify-content: flex-start;
  height: 25px;
  width: 100%;
  z-index: 2;
  opacity: 1;
  background: transparent;
  border: none;
  border-radius: 3px 0 0 3px;
  font-size: 1em;
  border-bottom: '0px';
  cursor: pointer;
  transition: 0.3s;
  color: white;
  /* button,
  [type='button'] {
    -webkit-appearance: button;
  } */
  &:hover {
    background: rgba(200, 100, 20, 0.15);
  }
  &:before {
    content: ' ';
    position: absolute;
    border-radius: 0 5px 5px 0;
    width: 100%;
    height: 100%;
    opacity: 0.75;
    z-index: -1;
    background: ${(props) =>
      props.appointmentsArr[props.index].reason[0].color};
  }
`
const CurrentHeight = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  height: 100%;
  justify-content: center;
  align-items: center;
  p {
    margin: 0 auto;
    color: white;
    font-size: 20px;
    font-weight: 980;
    text-align: center;
    width: 100%;
  }
`
const CurrentStartTime = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  height: 100%;
  justify-content: center;
  align-items: center;
  p {
    margin: 0 auto;
    color: white;
    font-size: 20px;
    font-weight: 980;
    text-align: center;
    width: 100%;
  }
`
const Count = styled.p`
  display: flex;
  margin: 5px 5px 0 5px;
  left: 5px;
  color: white;
  position: relative;
  display: flex;

  flex-flow: row;
  right: 0;
  color: white;
  font-weight: 600;
  opacity: 1;
  z-index: 400;
`
const Span = styled.span`
  display: flex;
  margin: 5px 5px 0 5px;
  left: 5px;
  color: white;
  position: relative;
  display: flex;
  text-transform: uppercase;
  flex-flow: row;
  right: 0;
  color: white;
  font-weight: 600;
  opacity: 1;
  z-index: 400;
`

 class AppSlot extends React.Component {
  static defaultProps = {
    className: 'layout',
    isable: true,
    isDroppable: true,
    isResizable: true,
    cols: 1,
    rowHeight: 24,
    useCSSTransforms: true,
    onLayoutChange: function () {},
    preventCollision: true,
    compactType: null,
    margin: [0, 1],
  }

  state = {
    appLength: null,
    isResizing: [],
    start: '',
    updatingId: '',
    updatingIndex: '',
    updatingIdFirm: '',
    toolbox: [],
    tempDisplayHeight: null,
    tempDisplayStartTime: null,
  }

  updateDragStats = (id, i) => {
    this.setState({ updatingId: id, updatingIndex: i })
  }
  generateDOM = () => {
   
    const appointmentsArr = this.props.appointments
    return this.props.appointmentIndices && this.props.appointmentIndices.map((item, i) => {
      const y = parseInt(item)
      const groupAppointment = appointmentsArr[i].users.length
      const lengthOf = appointmentsArr[i].timeRange.appLength / 15

      const currentDisplayHeightInMinutes =
        (this.state.tempDisplayHeight * 15) % 60
      const currentDisplayHeightInHours = Math.floor(
        (this.state.tempDisplayHeight * 15) / 60,
      )
      const polishedHours =
        currentDisplayHeightInHours < 1
          ? ''
          : currentDisplayHeightInHours +
            ' ' +
            `hour${currentDisplayHeightInHours === 1 ? '' : 's'}`

      const currentDisplayStartTime =
        this.state.tempDisplayStartTime &&
        Data_15[this.state.tempDisplayStartTime].time +
          ' ' +
          Data_15[this.state.tempDisplayStartTime].ampm

      const polishedStartTime = currentDisplayStartTime

      return (
        <StyledInput
          key={appointmentsArr[i].id}
          index={i}
          appointmentsArr={appointmentsArr}
          name={appointmentsArr[i].start}
          onMouseOver={() => {
            this.updateDragStats(appointmentsArr[i].id, i)
          }}
          onClick={(e) => {
            this.props.update(e)
            this.props.selectAppointment(appointmentsArr[i])
          }}
          data-grid={{
            i: i.toString(),
            x: 1,
            y: y,
            w: 1,
            h: lengthOf,
            minH: 1,
            maxH: 60,
            maxW: 1,
          }}
          style={{
            borderLeft: `8px solid ${appointmentsArr[i].reason[0].color}`,
          }}
        >
          <Span>{appointmentsArr[i].reason.name} </Span>
          <Count>{`Subscribers: ${groupAppointment}`}</Count>

          {this.state.tempDisplayHeight &&
            appointmentsArr[i].id === this.state.updatingIdFirm && (
              <CurrentHeight>
                <p>
                  {polishedHours +
                    ' ' +
                    (currentDisplayHeightInMinutes === 0
                      ? ''
                      : currentDisplayHeightInMinutes + 'mins')}
                </p>
              </CurrentHeight>
            )}
          {this.state.tempDisplayStartTime &&
            appointmentsArr[i].id === this.state.updatingIdFirm && (
              <CurrentStartTime>
                <p>{polishedStartTime}</p>
              </CurrentStartTime>
            )}
        </StyledInput>
      )
    })
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(this.state.layout)
    this.setState({ layout })
  }
  displayStartTime = async (layout) => {
    const startTime = layout[this.state.updatingIndex].y

    this.setState({
      tempDisplayStartTime: startTime,
    })
  }
  displayLengthOnResize = async (layout) => {
    const testerHeight = layout.i
    const displayHeight = layout[this.state.updatingIndex].h
    const currentDisplayHeightInMinutes = (displayHeight * 15) % 60
    console.log(currentDisplayHeightInMinutes)
    console.log(layout, testerHeight)
    this.setState({
      tempDisplayHeight: displayHeight,
    })
  }
  onTakeItem = (item) => {
    this.setState((prevState) => ({
      toolbox: {
        ...prevState.toolbox,
        [prevState.currentBreakpoint]: prevState.toolbox[
          prevState.currentBreakpoint
        ].filter(({ i }) => i !== item.i),
      },
    }))
  }

  onPutItem = (item) => {
    this.setState((prevState) => {
      return {
        toolbox: {
          ...prevState.toolbox,
          [prevState.currentBreakpoint]: [
            ...(prevState.toolbox[prevState.currentBreakpoint] || []),
            item,
          ],
        },
      }
    })
  }

  updateAppointment = async (layout, updateAppointmentLengthMutation) => {
    const theBlessing = layout[this.state.updatingIndex].h
    const newHeight = theBlessing * 15
    this.setState({
      appLength: newHeight,
      tempDisplayHeight: null,
    })

    const res = await updateAppointmentLengthMutation({
      variables: {
        id: this.state.updatingIdFirm,
        appLength: newHeight,
      },
    })

    await this.props.updateViewerStateLength(newHeight, res)
  }

  handleOnDrop = async (layout, updateAppointmentMutation) => {
    const theBlessing = layout[this.state.updatingIndex].y

    const newStart = Data_15[theBlessing].time + ' ' + Data_15[theBlessing].ampm

    await updateAppointmentMutation({
      variables: {
        id: this.state.updatingIdFirm,
        start: newStart,
      },
    })
    this.setState({ tempDisplayStartTime: null })
    await this.props.updateViewerState(newStart)
  }

  render() {
      console.log(this.props.appointments)
 
 
                 return (
                  <ReactGridLayout
                    layout={this.state.layout}
                    style={{ marginTop: '-1px' }}
                    onLayoutChange={this.onLayoutChange}
                    maxRows={60}
                    onResize={(layout) => {
                      this.displayLengthOnResize(layout)
                    }}
                    onDrag={(layout) => {
                      this.displayStartTime(layout)
                    }}
                    onResizeStart={() => {
                      this.setState({ updatingIdFirm: this.state.updatingId })
                    }}
                    onDragStart={() =>
                      this.setState({ updatingIdFirm: this.state.updatingId })
                    }
                    onResizeStop={(layout) =>
                      this.updateAppointment(layout, updateAppointmentLength)
                    }
                    onDragStop={(layout) =>
                      this.handleOnDrop(layout, updateAppointment)
                    }
                    {...this.props}
                  >
                    {this.generateDOM()}
                  </ReactGridLayout>
      
    )
  }
}

export default AppSlot
 
