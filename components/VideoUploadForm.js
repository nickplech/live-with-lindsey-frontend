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
  
$file: Upload
  ) {
    uploadNewVideoOnDemand(
      name: $name
      description: $description
   
    file: $file
    ) {
      id
    
      description
      name
      
    }
  }
`


const VideoUploadForm = () => {
  const [nameState, setNameState] = useState('test')
  const [descriptionState, setDescriptionState] = useState('testutesrtttyyty')
  const [uppy, setUppy] = useState(null) 
   
 useEffect(() => {
    const uppy = new Uppy()
    .use(Tus, { endpoint: 'http://localhost:3001/admin/api' })
    .use(Webcam, { id: 'MyWebcam' })
    .use(ImageEditor, { id: 'MyImageEditor' })
 setUppy(uppy)

    return () => uppy.close()
  }, [])

  useEffect(() => {
    if(uppy === null) return
     uppy.on('complete', (result) => {
    const url = result.successful[0].uploadURL
    uppy.store.dispatch({
      type: 'SET_VOD_URL',
      payload: { url },
    })
    uploadNewVideoOnDemand({variables: { file: url, name: nameState,  description: descriptionState }})
  })
  }, [uppy])


  const [uploadNewVideoOnDemand, {data, loading, error}] = useMutation(UPLOAD_VOD_VIDEO )
  const upload = data && data.VideoOnDemand
 console.log(upload) 
 if (loading) return <Loader />
 if (error) return <Error error={error} />
 


  return (
  
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
          { id: 'caption', name: 'Caption', placeholder: 'add description here' }
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
          requiredMetaFields: ['caption'],
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




 