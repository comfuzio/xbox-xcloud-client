import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarContent,
    NavbarItem,
    Link,
    Avatar,
    Button,
  } from "@heroui/react";

  import '../styles/header.module.css'
  
//   export const AcmeLogo = () => {
//     return (
//       <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
//         <path
//           clipRule="evenodd"
//           d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
//           fill="currentColor"
//           fillRule="evenodd"
//         />
//       </svg>
//     );
//   };
  
  export default function Header() {
    const menuItems = [
      "My Consoles",
      "xCloud Library",
      "Settings",
    ];
  
    return (
      <Navbar isBordered>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>
  
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <p className="font-bold text-inherit">Greenlight</p>
          </NavbarBrand>
        </NavbarContent>
  
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <p className="font-bold text-inherit">Greenlight</p>
          </NavbarBrand>

          <NavbarItem isActive>
            <Link color="foreground" href="/" data-nav data-nav-group="default">
              My Consoles
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link aria-current="page" href="xcloud" data-nav data-nav-group="default">
              xCloud Library
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="settings" data-nav data-nav-group="default">
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent>
  
        <NavbarContent as="div" justify="end">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
        </NavbarContent>
  
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
  }
  