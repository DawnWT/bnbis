/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import useRentModal from '@/hooks/useRentModal'

import Heading from '../Heading'
import CategoryInput from '../inputs/CategoryInput'
import Counter from '../inputs/Counter'
import CountrySelect from '../inputs/CountrySelect'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import { categories } from '../navbar/Categories'
import Modal from './Modal'

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
}

const RentModal = () => {
  const rentModal = useRentModal()
  const router = useRouter()

  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

  const Map = useMemo(
    () => dynamic(async () => import('../Map'), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  )

  const setCustomValue = (id: string, value: unknown) => {
    setValue(id as any, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setStep((prev) => prev - 1)
  }

  const onNext = () => {
    setStep((prev) => prev + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      onNext()
      return
    }

    setIsLoading(true)

    axios
      .post('/api/housings', data)
      .then(() => {
        toast.success('Listing created successfully !')

        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch(() => toast.error('An error occurred !'))
      .finally(() => {
        setIsLoading(false)
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((el) => (
          <div key={el.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomValue('category', category)
              }}
              selected={category === el.label}
              label={el.label}
              icon={el.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located ?"
          subtitle="Help guests find you !"
        />
        <CountrySelect
          value={location as any}
          onChange={(value) => {
            setCustomValue('location', value)
          }}
        />
        <Map center={(location as any)?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          title="Number of guests"
          subtitle="How many guests do you allow ?"
          value={guestCount}
          onChange={(value) => {
            setCustomValue('guestCount', value)
          }}
        />
        <hr />
        <Counter
          onChange={(value) => {
            setCustomValue('roomCount', value)
          }}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setCustomValue('bathroomCount', value)
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => {
            setCustomValue('imageSrc', value)
          }}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place ?"
          subtitle="Short and sweet works best !"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register as any}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register as any}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night ?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          disabled={isLoading}
          register={register as any}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <div>
      <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Airbnbis your home"
        body={bodyContent}
      />
    </div>
  )
}

export default RentModal
