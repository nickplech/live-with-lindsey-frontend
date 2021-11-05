import React from 'react'
import Popup from 'reactjs-popup'
import Account from './Account'
import styled from 'styled-components'

const Background = styled.div`
  background: rgba(20, 20, 20, 0.8);
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  z-index: 89000;
`
const Wrap = styled.div`
 
  .buttonio {
    cursor: pointer;
    border-radius: 50%;
    height: 25px;
    background: #f8b0b0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 25px;
 transform: translateY(-2px);
    justify-content: center;
 
    padding: 0;
  }
`
const Mode = styled.div`
  box-shadow: 0px 10px 5px -3px rgba(20, 20, 20, 0.2);
  z-index: 90000;
  position: relative;
  font-size: 16px;
  display: flex;
  flex-flow: column;
  width: 380px;
  padding: 20px;

  margin: 0 auto;

  margin-top: 80px;
  width: 90%;
  max-width: 500px;
  font-family: 'Bison';
  letter-spacing: 2px;
  color: slategrey;
  background: rgba(240, 240, 240, 1);
  border-radius: 15px;
  .content {
    width: 100%;
    padding: 10px 5px;

    position: relative;
  }

  .close {
    cursor: pointer;
    position: absolute;
    display: block;
    outline: none;
    padding: 2px 5px;
    border: none;
    line-height: 20px;
    right: -20px;
    top: -20px;
    font-size: 24px;
    /* background: ; */
    border-radius: 50%;
  }
`
const HelpList = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0px 0 0 0;
`
function ModalPicture({ image }) {
  return (
    <Wrap>
      <Popup trigger={<span className="buttonio">?</span>} modal nested>
        {(close) => (
          <Background>
            <Background />
            <Mode>
              <button className="close" onClick={close}>
                &times;
              </button>

              <div className="content">
                <HelpList>
                  <h1>OBS Steps</h1>
                  <ol
                    style={{
                      border: '2px solid #f8b0b0',
                      borderRadius: '10px',
                      width: '95%',
                      maxWidth: '600px',
                    }}
                  >
                    <li>Click settings and select the Stream option</li>{' '}
                    <li>Select Custom from service dropdown</li>
                    <li>
                      Enter{' '}
                      <b style={{ color: '#f8b0b0' }}>
                        rtmp://live.lindseyharrod:1935/live
                      </b>{' '}
                      in server input field (after first time this step can be
                      skipped)
                    </li>
                    <li>
                      Click <b style={{ color: '#f8b0b0' }}>Get StreamId</b>{' '}
                      button in your admin dashboard, the StreamId will
                      automatically be <b>copied</b>
                    </li>
                    <li>
                      Add your StreamId to the Stream Key field in OBS &amp;
                      Click apply to save.
                    </li>
                  </ol>
                </HelpList>
              </div>
            </Mode>
          </Background>
        )}
      </Popup>
    </Wrap>
  )
}

export default ModalPicture
