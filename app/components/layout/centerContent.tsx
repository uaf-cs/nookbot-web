import type { ReactNode } from 'react'

interface CenterContentProps {
  children: ReactNode
}

export function CenterContent (props: CenterContentProps) {
  return (
    <div className="px-6 mt-8 max-w-2xl md:px-0 lg:max-w-4xl self-center space-y-6 w-full">
      {props.children}
    </div>
  )
}
