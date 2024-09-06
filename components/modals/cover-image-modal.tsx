'use client'
import React from 'react'
import { useParams } from 'next/navigation'
// Convex
import { useMutation } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
// Hooks
import { useEdgeStore } from '~/lib/edgestore'
import { useCoverImage } from '~/hooks/use-cover-image'
// Components
import { SingleImageDropzone } from '~/components/single-image-dropzone'
import { Dialog, DialogContent, DialogHeader } from '~/components/ui/dialog'

const CoverImageModal = () => {
  const [file, setFile] = React.useState<File>()
  const [isUploading, setIsUploading] = React.useState(false)

  const params: { docId: Id<'documents'> } = useParams() as {
    docId: Id<'documents'>
  }
  const { edgestore } = useEdgeStore()
  const coverImage = useCoverImage()
  const update = useMutation(api.documents.update)

  const onChange = async (file: File | undefined) => {
    if (!file) return

    setFile(file)
    setIsUploading(true)

    const res = await edgestore.publicFiles.upload({
      file,
      options: { replaceTargetUrl: coverImage.url },
    })

    await update({ id: params.docId, coverImage: res.url })

    setFile(undefined)
    setIsUploading(false)
    coverImage.onClose()
  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className='text-lg text-center font-semibold -mb-2'>
            Cover Image
          </h2>
          <p className='text-sm text-center text-gray-500'>
            Choose a cover image for your document
          </p>
        </DialogHeader>
        <SingleImageDropzone
          disabled={isUploading}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CoverImageModal
