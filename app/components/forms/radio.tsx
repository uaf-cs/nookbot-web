import { RadioGroup } from '@headlessui/react'
import { CheckIcon, MinusIcon } from '@heroicons/react/outline'
import { classNames } from '~/utils'

interface RadioOption {
  value: string
  name: string
}
interface RadioProps {
  label: string
  name: string
  options: RadioOption[]
  selected: string | null
  onChange: (value: string) => any
}

export function Radio ({ label, name, options, selected, onChange }: RadioProps) {
  return (
    <RadioGroup value={selected} name={name} onChange={onChange} className=' space-y-2'>
      <RadioGroup.Label>{label}</RadioGroup.Label>
      {options.map(opt => (
        <RadioGroup.Option value={opt.value} key={opt.value}>
          {({ active, checked }) => (
            <div
              className={classNames(
                'p-2 flex justify-between border-l-4 border-solid cursor-pointer transition-all',
                checked ? 'bg-uaf-636 border-uaf-blue shadow-lg' : 'bg-slate-200 border-slate-500 shadow hover:shadow-md hover:bg-slate-300',
                active ? 'outline-2 outline-uaf-blue' : ''
              )}
            >
              <span>{opt.name}</span>
              {checked
                ? (<CheckIcon className='w-6 h-6 text-uaf-blue' />)
                : null}
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}
