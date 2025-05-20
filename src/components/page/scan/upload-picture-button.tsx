import { BorderlessIconButton } from '@/components/ui/button/borderless-icon-button'
import { cn } from '@/utils/cn'
import { Upload, XCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'

export function PictureUploadButton ({
  onImageChange,
  image
}: {
  onImageChange?: (image: File | null) => void
  image?: File | null
}) {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  let key = Math.random().toString(36)

  React.useEffect(() => {
    if (!image) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      key = Math.random().toString(36)
    }
  }, [image])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onImageChange) {
      onImageChange(file)
    }
  }

  return (
    <>
      <div className='relative w-52 h-52 bg-transparent border rounded-2xl border-secondary-bg-hover border-dashed hover:cursor-pointer'>
        {image && (
          <BorderlessIconButton
            className='absolute -top-4 -right-4 bg-transparent rounded-full z-10 hover:cursor-pointer text-[#3261D7]' onClick={(e) => {
              e.preventDefault()
              setOpen(true)
            }}
          >
            <XCircle className='h-6 w-6 bg-background rounded-full' />
          </BorderlessIconButton>
        )}

        {image
          ? (
            <Image
              src={URL.createObjectURL(image)}
              alt='Uploaded'
              fill
              className='rounded-2xl object-cover'
            />
            )
          : (
            <button
              className={
              cn(
                'relative flex justify-center items-center h-full w-full',
                image && 'border-solid'
              )
            }
              onClick={handleClick}
            >
              <Upload
                className='w-6 h-6 text-secondary-bg-hover'
              />
            </button>
            )}
        <input
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={handleChange}
          className='hidden'
          key={key}
        />
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent sadFace>
          <AlertDialogHeader>
            <AlertDialogTitle>인증 이미지를 변경할까요?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                setOpen(false)
                onImageChange?.(null)
              }}
            >
              네
            </AlertDialogAction>
            <AlertDialogCancel onClick={(e) => {
              e.preventDefault()
              setOpen(false)
            }}
            >
              아니요
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
