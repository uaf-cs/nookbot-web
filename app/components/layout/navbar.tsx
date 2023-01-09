/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ShieldCheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Link } from '@remix-run/react'

import wordmark from '~/assets/wordmark.svg'
import type { GoogleUser, User } from '@prisma/client'
import { classNames } from '../../utils'

const resources = [
  {
    name: 'Guides',
    description: 'Learn how to maximize Nookbot to get the most out of it.',
    href: '#',
    icon: BookmarkSquareIcon
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon
  },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon }
]

interface NavbarProps {
  user: User | null
  googleUser: GoogleUser | null
}

export function Navbar ({ user, googleUser }: NavbarProps) {
  return (
    <Popover className="relative bg-white">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1 text-gray-500">
            <Link to="/">
              <span className="sr-only">Nookbot</span>
              <img
                className="h-8 w-auto sm:h-10"
                src={wordmark}
                alt=""
              />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Link to="/communities" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Communities
            </Link>
            <Link to="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Docs
            </Link>

            <Popover className="relative">
              {({ open }: { open: boolean }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    )}
                  >
                    <span>More</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                            >
                              <item.icon className="flex-shrink-0 h-6 w-6 text-uaf-blue" aria-hidden="true" />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-2">
            {user === null
              ? <>
                <Link to="/login" className="button bg-slate-100 border-uaf-636">
                  Sign in
                </Link>
                <Link
                  to="/login"
                  className="button bg-slate-200 border-uaf-blue"
                >
                  Sign up
                </Link>
              </>
              : <>
                <Link
                  to="/dashboard"
                  className="button bg-slate-100 border-uaf-636 ml-8 flex items-center space-x-2"
                >
                  <img
                    className='h-6 rounded-full'
                    src={googleUser?.avatar ?? ''}
                    alt=""
                  />
                  <span>{user.fullName}</span>
                </Link>
              </>
            }

          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto text-grey-500"
                    src={wordmark}
                    alt="Nookbot"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link to="/communities" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Communities
                </Link>

                <Link to="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Docs
                </Link>
                {resources.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div>
                {user === null
                  ? <>
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center button bg-slate-200 border-uaf-blue"
                    >
                      Sign up
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Existing user?{' '}
                      <Link to="/login" className="text-uaf-blue hover:text-indigo-500">
                        Sign in
                      </Link>
                    </p>
                  </>
                  : <>
                    <Link
                      to="/dashboard"
                      className="w-full flex items-center justify-center button bg-slate-100 border-uaf-636"
                    >
                      <img
                        className='h-6 rounded-full'
                        src={googleUser?.avatar ?? ''}
                        alt=""
                    />
                      <span>{user.fullName}</span>
                    </Link>
                    <p className='mt-6 text-center text-base font-medium'>
                      <Link to="/logout" className="text-uaf-blue hover:text-indigo-500">
                        Sign out
                      </Link>
                    </p>
                  </>
                }
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
