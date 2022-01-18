import React, { useEffect, useState } from 'react'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import { Dashboard } from '@uppy/react'
 import Webcam from '@uppy/webcam'
 import ImageEditor from '@uppy/image-editor'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
 import { useMutation } from '@apollo/client'
 import gql from 'graphql-tag'
import Loader from './Loader'
import Error from './ErrorMessage'


const UPLOAD_VOD_VIDEO = gql`
  mutation UPLOAD_VOD_VIDEO(
    $name: String
    $description: String
    $url: String
  ) {
    uploadNewVideoOnDemand(
      name: $name
      description: $description
      url: $url
    ) {
      id
      description
      name
      # filename
      # mimetype
      # encoding
    }
  }
`


const VideoUploadForm = () => {
  const [nameState, setNameState] = useState('test')
  const [descriptionState, setDescriptionState] = useState('testutesrtttyyty')
  const [uppy, setUppy] = useState(null) 
   
 useEffect(() => {
    const uppy = new Uppy()
    .use(Tus, { endpoint: 'http://localhost:3001/admin/api/uploadvods' })
    .use(Webcam, {
      id: 'MyWebcam',
      onBeforeSnapshot: () => Promise.resolve(),
      countdown: false,
      modes: ["video-audio", "video-only", "audio-only", "picture"],
      mirror: true,
      facingMode: "user",
      locale: {
        strings: {
          // Shown before a picture is taken when the `countdown` option is set.
          smile: "Smile!",
          // Used as the label for the button that takes a picture.
          // This is not visibly rendered but is picked up by screen readers.
          takePicture: "Take a picture",
          // Used as the label for the button that starts a video recording.
          // This is not visibly rendered but is picked up by screen readers.
          startRecording: "Begin video recording",
          // Used as the label for the button that stops a video recording.
          // This is not visibly rendered but is picked up by screen readers.
          stopRecording: "Stop video recording",
          // Title on the “allow access” screen
          allowAccessTitle: "Please allow access to your camera",
          // Description on the “allow access” screen
          allowAccessDescription:
            "In order to take pictures or record video with your camera, please allow camera access for this site.",
        },
      }})
    .use(ImageEditor, { id: 'MyImageEditor' })
 setUppy(uppy)

    return () => uppy.close()
  }, [])

  const uppyUpload = async () => {
   const res =  await uppy.on('complete', (result) => {
      const url = result.successful[0].uploadURL
      uppy.store.dispatch({
        type: 'SET_VOD_URL',
        payload: { url },
      })
      return url
    })
   await uploadNewVideoOnDemand({variables: { url: res, name: nameState,  description: descriptionState }})
     
  }

  useEffect(() => {
    if(uppy === null) return
    uppyUpload()
       
  }, [uppy])


  const [uploadNewVideoOnDemand, {data, loading, error}] = useMutation(UPLOAD_VOD_VIDEO )
  const upload = data && data.VideoOnDemand
 console.log(upload) 
 if (loading) return <Loader />
 if (error) return <Error error={error} />
 


  return (
    // <form onSubmit={() => {console.log("submitted baby")}} encType={'multipart/form-data'}>
    // <input name={'video'} type={'file'} onChange={({target: { files }}) => {
    //     const file = files[0]
    //     file && uploadNewVideoOnDemand({ variables: { file: file } })
    // }}/>{loading && <p>Loading.....</p>}</form>


      <div className="container">

           {uppy &&  <Dashboard
             id={'Dashboard'}
        uppy={uppy}
        showProgressDetails={true}
        note={'Images and Video only'}
        // proudlyDisplayPoweredByUppy={false}
        height={350}
        metaFields={[
          { id: 'name', name: 'Name', placeholder: 'file name' },
          { id: 'description', name: 'description', placeholder: 'add description here' }
        ]}
        meta={{ type: 'video-on-demand' }}
        debug={ true}
        autoProceed={ false}
        plugins={ ['MyWebcam', 'MyImageEditor']}
        restrictions={{
          maxFileSize: 5000000000,
          maxNumberOfFiles: 3,
          minNumberOfFiles: 1,
          allowedFileTypes: ['video/*'],
      
        }}
    
        width={'100%'}
        locale={{
          strings: {
  
            dropHereOr: 'Drop Video Here or %{browse}',
        
            browse: 'browse',
          },
        }}
     
      />}
       
     
      </div>
  )
}

export default VideoUploadForm




 