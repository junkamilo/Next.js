import { HomeIcon } from "@primer/octicons-react"
import Link from "next/link"
import { ActiveLink } from "../active-link/ActiveLink"

const NavItems = [
  { path: '/about', text: 'about' },
  { path: '/PricePage', text: 'Pricing' },
  { path: '/ContacPage', text: 'Contact' },
]


export const Navar = async () => {
  return (
    <nav className="flex bg-blue-800 bg-opacity-30 p-2 m-2 rounded">
      <Link href={'/'}>
        <HomeIcon />
        Home</Link>

      {
        NavItems.map(navItem => (
          <ActiveLink key={navItem.path} {...navItem} />
        ))
      }

    </nav>
  )
}
