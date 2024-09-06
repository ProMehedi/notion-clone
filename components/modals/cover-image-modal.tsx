'use client'

// Hooks
import { useCoverImage } from '~/hooks/use-cover-image'
// Components
import { Dialog, DialogContent, DialogHeader } from '~/components/ui/dialog'

const CoverImageModal = () => {
  const { isOpen, onClose } = useCoverImage()
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
        <div>TODO: Upload image</div>
      </DialogContent>
    </Dialog>
  )
}

export default CoverImageModal
