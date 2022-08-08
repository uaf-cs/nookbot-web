import { Link } from '@remix-run/react'
import type { RemixLinkProps } from '@remix-run/react/components'

export function Navigate (props: RemixLinkProps & React.RefAttributes<HTMLAnchorElement>) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <Link {...props} className="text-sky-600 underline-offset-2 underline"></Link>
  )
}
