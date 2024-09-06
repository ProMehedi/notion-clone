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

  const params = useParams() as { docId: Id<'documents'> }
  const { edgestore } = useEdgeStore()
  const { onClose, isOpen } = useCoverImage()
  const update = useMutation(api.documents.update)

  const onChange = async (file: File | undefined) => {
    if (!file) return

    setFile(file)
    setIsUploading(true)

    const { url } = await edgestore.publicFiles.upload({ file })
    await update({ id: params.docId, coverImage: url })

    setFile(undefined)
    setIsUploading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
