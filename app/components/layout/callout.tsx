import { CheckIcon, ExclamationCircleIcon, ExclamationIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'
import type { ReactNode } from 'react'

export enum CalloutTypes {
  INFO,
  SUCCESS,
  WARN,
  ERROR
}

interface CalloutProps {
  type?: CalloutTypes
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
  title?: ReactNode
  children: ReactNode
}

interface CalloutClassList {
  head: string
  icon: string
  side: string
  defaultIcon: NonNullable<CalloutProps['icon']>
}

const styles: { [key in CalloutTypes]: CalloutClassList } = {
  [CalloutTypes.INFO]: {
    head: 'bg-sky-200',
    icon: 'text-sky-600',
    side: 'border-sky-600',
    defaultIcon: InformationCircleIcon
  },
  [CalloutTypes.SUCCESS]: {
    head: 'bg-emerald-200',
    icon: 'text-emerald-600',
    side: 'border-emerald-600',
    defaultIcon: CheckIcon
  },
  [CalloutTypes.WARN]: {
    head: 'bg-amber-200',
    icon: 'text-amber-500',
    side: 'border-amber-500',
    defaultIcon: ExclamationIcon
  },
  [CalloutTypes.ERROR]: {
    head: 'bg-rose-200',
    icon: 'text-rose-600',
    side: 'border-rose-600',
    defaultIcon: ExclamationCircleIcon
  }
}

export function Callout ({ type, title, icon, children }: CalloutProps) {
  const classList = type !== undefined
    ? styles[type]
    : {
        head: 'bg-slate-300',
        icon: 'text-slate-600',
        side: 'border-slate-500',
        defaultIcon: ChevronRightIcon
      }
  const Icon = icon ?? classList.defaultIcon
  return (
    <div className={'rounded-r-md border-solid border-l-4 bg-slate-100 overflow-clip shadow-md ' + classList.side}>
      {title !== undefined
        ? <div className={'flex p-2 space-x-2 items-center ' + classList.head}>
          <Icon className={'flex-shrink-0 h-6 w-6 ' + classList.icon} aria-hidden="true" />
          <span className='font-bold'>{title}</span>
          </div>
        : null
      }
      <div className='p-2'>
        {children}
      </div>
    </div>
  )
}
