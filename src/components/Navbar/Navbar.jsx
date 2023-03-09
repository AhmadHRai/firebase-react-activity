import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { auth } from "../../util/firebase";
import { signOut } from "firebase/auth";



const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Login", href: "/login", current: false },
  { name: "Signup", href: "/signup", current: false },
  { name: "Profile", href: "/profile", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SignOutButton(){
  function handleSignout(){
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Signed out")
      //todo: add isLoggedIn state in the app js and style this button later on in live when everything is ok
    }).catch((error) => {
      console.log(error)
    });
  }
  return(
    <>
      <button onClick={handleSignout}>SignOut</button>
    </>
  );
}

export default function Navbar() {

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch ">
                <div className="hidden sm:ml-6 sm:block">
                  {navigation.map((item) => (
                    <>
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    </>
                  ))}
                  {auth?.currentUser && <SignOutButton/>}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {auth?.currentUser && <SignOutButton/>}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
