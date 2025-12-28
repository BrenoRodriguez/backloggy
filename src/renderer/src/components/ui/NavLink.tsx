import { Link, type LinkComponentProps } from '@tanstack/react-router'
import { cva, type VariantProps } from 'class-variance-authority'

const navLinkVariants = cva(
  'cursor-pointer transition-all duration-200 ease-in',
  {
    variants: {
      appearance: {
        navbar: 'select-none tracking-wide hover:text-accent-light',
        settings:
          'flex items-start gap-6 border-stone-800 border-b px-12 py-4 text-lg',
        editGame:
          'flex w-38 items-center justify-center gap-3 rounded-t-sm border-b-2 py-2 font-medium text-lg hover:text-accent-light',
      },
      active: {
        navbar: 'text-accent-light',
        editGame: 'border-b-2 border-b-accent-light text-accent-light',
      },
    },
    defaultVariants: {
      appearance: 'navbar',
    },
  },
)

type NavLinkProps = { children: React.ReactNode } & LinkComponentProps &
  VariantProps<typeof navLinkVariants>

export const NavLink = ({
  children,
  appearance,
  active,
  ...props
}: NavLinkProps) => {
  return (
    <Link
      {...props}
      className={navLinkVariants({ appearance })}
      activeProps={{
        className: navLinkVariants({ appearance, active }),
      }}
    >
      {children}
    </Link>
  )
}
