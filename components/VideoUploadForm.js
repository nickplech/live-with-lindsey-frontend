import { useEffect, useRef, useState } from 'react'
import Router from 'next/router'
// import * as UpChunk from '@mux/upchunk'
// import useSwr from 'swr'
 import { useMutation } from '@apollo/client'
 import gql from 'graphql-tag'
import Loader from './Loader'
import Error from './ErrorMessage'
const UPLOAD_VOD_VIDEO = gql`
  mutation UPLOAD_VOD_VIDEO(
    $name: String
    $description: String
$file: Upload
  ) {
    uploadNewVideoOnDemand(
      name: $name
      description: $description
    file: $file
    ) {
      id
      url
      description
      name
    }
  }
`


const VideoUploadForm = () => {
  const [nameState, setNameState] = useState('test')
  const [descriptionState, setDescriptionState] = useState('testutesrtttyyty')
  const [isUploading, setIsUploading] = useState(false)
  const [isPreparing, setIsPreparing] = useState(false)
  const [uploadId, setUploadId] = useState(null)
  const [progress, setProgress] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef(null)


const [uploadNewVideoOnDemand, {data, loading, error}] = useMutation(UPLOAD_VOD_VIDEO, {variables: {name: nameState,  description: descriptionState }})
  const upload = data && data.VideoOnDemand

  useEffect(() => {
    if (upload && upload.id) {
      Router.push({
        pathname: `/item/${upload.id}`,
        scroll: false,
      })
    }
  }, [upload])

  if (error) return <Error error="Error fetching api" />
  if (data && data.error) return <Error error={data.error} />

  const createUpload = async () => {
   await uploadNewVideoOnDemand({variables: { file:  inputRef.current.files[0],  }})
   if(loading) return <Loader />
   if(error) return <Error error={error}/>
   
 
  }

  const startUpload = (evt) => {
    setIsUploading(true)
 createUpload()

    // upload.on('error', (err) => {
    //   setErrorMessage(err.detail)
    // })

    // upload.on('progress', (progress) => {
    //   setProgress(Math.floor(progress.detail))
    // })

    // upload.on('success', () => {
    //   setIsPreparing(true)
    // })
  }

  if (errorMessage) return <Error error={error} />

  return (
    <>
      <div className="container">
        {isUploading ? (
          <>
            {isPreparing ? (
              <div>Preparing..</div>
            ) : (
              <div>Uploading...{progress ? `${progress}%` : ''}</div>
            )}
            <Loader />
          </>
        ) : (
          <label>
            <button type="button" onClick={() => inputRef.current.click()}>
              Select a video file
            </button>
            <input type="file" onChange={startUpload} ref={inputRef} />
          </label>
        )}
      </div>
      <style jsx>{`
        input {
          display: none;
        }
      `}</style>
    </>
  )
}

export default VideoUploadForm
