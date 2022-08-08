import type { ReactNode } from 'react'

interface CenterContentProps {
  children: ReactNode
}

export function CenterContent (props: CenterContentProps) {
  return (
    <div className="px-4 max-w-2xl lg:max-w-4xl self-center space-y-4 w-full">
      {props.children}
    </div>
  )
}
