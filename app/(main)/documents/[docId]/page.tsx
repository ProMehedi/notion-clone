import React from 'react'

interface Props {
  params: { docId: string }
}

const SingleDoc = ({ params }: Props) => {
  return (
    <div>
      <h1>{params?.docId}</h1>
    </div>
  )
}

export default SingleDoc
