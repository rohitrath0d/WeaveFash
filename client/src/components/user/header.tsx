// "use client";

// import { ArrowLeft, Menu, ShoppingBag, ShoppingCart, User } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Button } from "../ui/button";
// import { useAuthStore } from "@/store/useAuthStore";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "../ui/sheet";
// import { useEffect, useState } from "react";
// import { useCartStore } from "@/store/useCartStore";
// import Image from "next/image";
// import logo from "../../../public/images/logo.png"

// const navItems = [
//   {
//     title: "HOME",
//     to: "/",
//   },
//   {
//     title: "PRODUCTS",
//     to: "/listing",
//   },
// ];

// function Header() {
//   const { logout, user, isLoading } = useAuthStore();
//   const router = useRouter();
//   const [mobileView, setMobileView] = useState<"menu" | "account">("menu");
//   const [showSheetDialog, setShowSheetDialog] = useState(false);
//   const { fetchCart, items } = useCartStore();

//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   async function handleLogout() {
//     await logout();
//     // router.push("/auth/login");
//     // router.push("/home-page"); 
//     // router.push("/"); 


//   // Delay to prevent accidental "ghost click" on new Login button
//   setTimeout(() => {
//     router.push("/home-page");
//   }, 100); // 100ms is usually enough

//   }

//   const renderMobileMenuItems = () => {
//     switch (mobileView) {
//       case "account":
//         return (
//           <div className="space-y-2">
//             <div className="flex items-center">
//               <Button
//                 onClick={() => setMobileView("menu")}
//                 variant="ghost"
//                 size="icon"
//               >
//                 <ArrowLeft />
//               </Button>
//             </div>
//             <nav className="space-y-2">
//               <p
//                 onClick={() => {
//                   setShowSheetDialog(false);
//                   router.push("/account");
//                 }}
//                 className="block cursor-pointer w-full p-2"
//               >
//                 Your Account
//               </p>


//               {/* <Button
//                 onClick={() => {
//                   setShowSheetDialog(false);
//                   setMobileView("menu");
//                   handleLogout();
//                 }}
//               >
//                 Logout
//               </Button> */}

//               {user ? (
//                 <Button
//                   onClick={() => {
//                     setShowSheetDialog(false);
//                     setMobileView("menu");
//                     handleLogout();
//                   }}
//                 >
//                   Logout
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={() => {
//                     setShowSheetDialog(false);
//                     // router.push("/auth/login");
//                     // ✅ Only route if user clicks login themselves
//                     router.push("/auth/login");
//                   }}
//                 >
//                   Login
//                 </Button>
//               )}


//             </nav>
//           </div>
//         );

//       default:
//         return (
//           <div className="space-y-6 py-6">
//             <div className="space-y-3">
//               {navItems.map((navItem) => (
//                 <p
//                   className="block w-full ml-0 font-semibold p-2 cursor-pointer"
//                   onClick={() => {
//                     setShowSheetDialog(false);
//                     router.push(navItem.to);
//                   }}
//                   key={navItem.title}
//                 >
//                   {navItem.title}
//                 </p>
//               ))}
//             </div>
//             <div className="space-y-4">
//               <Button
//                 onClick={() => setMobileView("account")}
//                 className="w-full justify-start"
//               >
//                 <User className="mr-1 h-4 w-4" />
//                 Account
//               </Button>
//               <Button
//                 onClick={() => {
//                   setShowSheetDialog(false);
//                   router.push("/cart");
//                 }}
//                 className="w-full justify-start"
//               >
//                 <ShoppingBag className="mr-1 h-4 w-4" />
//                 Cart (2)
//               </Button>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <header className="sticky bg-white  top-0 z-50 shadow-sm">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-20">
//           <Link className="text-2xl font-bold" href="/">
//             <Image
//               src={logo}
//               alt="logo"
//               width={220}
//               height={250}
//             // className=""
//             />
//             {/* <img src={shoplogo} alt="shoplogo" /> */}
//           </Link>
//           <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
//             <nav className="flex items-center space-x-8">
//               {navItems.map((item, index) => (
//                 <Link
//                   href={item.to}
//                   key={index}
//                   className="text-sm font-semibold hover:text-gray-700"
//                 >
//                   {item.title}
//                 </Link>
//               ))}
//             </nav>
//           </div>
//           <div className="hidden lg:flex items-center space-x-4">
//             <div
//               className="relative cursor-pointer"
//               onClick={() => router.push("/cart")}
//             >
//               <ShoppingCart />
//               <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
//                 {items?.length}
//               </span>
//             </div>

//             {/* <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button size="icon" variant={"ghost"}>
//                   <User className="h-5 w-5" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem onClick={() => router.push("/account")}>
//                   Your Account
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={handleLogout}>
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//              */}


//             {user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button size="icon" variant={"ghost"}>
//                     <User className="h-5 w-5" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => router.push("/account")}>
//                     Your Account
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={handleLogout}>
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Button onClick={() => router.push("/auth/login")}>
//                 Login
//               </Button>
//             )}


//           </div>
//           <div className="lg:hidden">
//             <Sheet
//               open={showSheetDialog}
//               onOpenChange={() => {
//                 setShowSheetDialog(false);
//                 setMobileView("menu");
//               }}
//             >
//               <Button
//                 onClick={() => setShowSheetDialog(!showSheetDialog)}
//                 size="icon"
//                 variant="ghost"
//               >
//                 <Menu className="h-6 w-6" />
//               </Button>
//               <SheetContent side="left" className="w-80">
//                 <SheetHeader>
//                   <SheetTitle>ECOMMERCE</SheetTitle>
//                 </SheetHeader>
//                 {renderMobileMenuItems()}
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;


"use client";

import { ArrowLeft, Menu, ShoppingBag, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import logo from "../../../public/images/logo.png"

const navItems = [
  {
    title: "HOME",
    to: "/",
  },
  {
    title: "PRODUCTS",
    to: "/listing",
  },
];

function Header() {
  const { logout, isAuthenticated, user } = useAuthStore(); // Now using isAuthenticated
  const router = useRouter();
  const [mobileView, setMobileView] = useState<"menu" | "account">("menu");
  const [showSheetDialog, setShowSheetDialog] = useState(false);
  const { fetchCart, items } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  async function handleLogout() {
    const success = await logout();
    // router.push("/auth/login");
    // router.push("/home-page");
    //  if (success) {
    //     // Only navigate if logout was successful
    //     router.push("/auth/login");
    // }
  }

  const renderMobileMenuItems = () => {
    switch (mobileView) {
      case "account":
        return (
          <div className="space-y-2">
            <div className="flex items-center">
              <Button
                onClick={() => setMobileView("menu")}
                variant="ghost"
                size="icon"
              >
                <ArrowLeft />
              </Button>
            </div>
            <nav className="space-y-2">
              {isAuthenticated ? (
                <>
                  <p
                    onClick={() => {
                      setShowSheetDialog(false);
                      router.push("/account");
                    }}
                    className="block cursor-pointer w-full p-2"
                  >
                    Your Account
                  </p>
                  <Button
                    onClick={() => {
                      setShowSheetDialog(false);
                      setMobileView("menu");
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setShowSheetDialog(false);
                    router.push("/auth/login");
                  }}
                  className="w-full"
                >
                  Login
                </Button>
              )}
            </nav>
          </div>
        );

        // default:
        return (
          <div className="space-y-6 py-6">
            <div className="space-y-3">
              {navItems.map((navItem) => (
                <p
                  className="block w-full ml-0 font-semibold p-2 cursor-pointer"
                  onClick={() => {
                    setShowSheetDialog(false);
                    router.push(navItem.to);
                  }}
                  key={navItem.title}
                >
                  {navItem.title}
                </p>
              ))}
            </div>
            <div className="space-y-4">
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={() => setMobileView("account")}
                    className="w-full justify-start"
                  >
                    <User className="mr-1 h-4 w-4" />
                    Account
                  </Button>
                  <Button
                    onClick={() => {
                      setShowSheetDialog(false);
                      router.push("/cart");
                    }}
                    className="w-full justify-start"
                  >
                    <ShoppingBag className="mr-1 h-4 w-4" />
                    Cart ({items?.length || 0})
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setShowSheetDialog(false);
                    router.push("/auth/login");
                  }}
                  className="w-full justify-start"
                >
                  <User className="mr-1 h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          </div>
        );


      default:
        return (
          <div className="space-y-6 py-6">
            <div className="space-y-3">
              {navItems.map((navItem) => (
                <p
                  className="block w-full ml-0 font-semibold p-2 cursor-pointer"
                  onClick={() => {
                    setShowSheetDialog(false);
                    router.push(navItem.to);
                  }}
                  key={navItem.title}
                >
                  {navItem.title}
                </p>
              ))}
            </div>
            <div className="space-y-4">
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={() => setMobileView("account")}
                    className="w-full justify-start"
                  >
                    <User className="mr-1 h-4 w-4" />
                    Account
                  </Button>
                  <Button
                    onClick={() => {
                      setShowSheetDialog(false);
                      router.push("/cart");
                    }}
                    className="w-full justify-start"
                  >
                    <ShoppingBag className="mr-1 h-4 w-4" />
                    Cart ({items?.length || 0})
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setShowSheetDialog(false);
                      router.push("/auth/login");
                    }}
                    className="w-full justify-start"
                  >
                    <User className="mr-1 h-4 w-4" />
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      setShowSheetDialog(false);
                      router.push("/auth/register");
                    }}
                    className="w-full justify-start"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        );

    }
  };

  return (
    <header className="sticky bg-white top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link className="text-2xl font-bold" href="/">
            <Image
              src={logo}
              alt="logo"
              width={220}
              height={250}
            />
          </Link>
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            <nav className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  href={item.to}
                  key={index}
                  className="text-sm font-semibold hover:text-gray-700"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden lg:flex items-center space-x-4">


            {/* {isAuthenticated && (
              <div
                className="relative cursor-pointer"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  {items?.length || 0}
                </span>
              </div>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant={"ghost"}>
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/account")}>
                    Your Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => router.push("/auth/login")}
                variant="ghost"
              >
                Login
              </Button>
            )}
          </div> */}

            {/* Always show cart, but only show count for authenticated users */}
            <div
              className="relative cursor-pointer"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart />
              {isAuthenticated && items?.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </div>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant={"ghost"}>
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/account")}>
                    Your Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/auth/login")}
                  variant="ghost"
                  className="bg-black text-white"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/auth/register")}
                  variant="outline"
                  className="bg-black text-white"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <Sheet
              open={showSheetDialog}
              onOpenChange={() => {
                setShowSheetDialog(false);
                setMobileView("menu");
              }}
            >
              <Button
                onClick={() => setShowSheetDialog(!showSheetDialog)}
                size="icon"
                variant="ghost"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>ECOMMERCE</SheetTitle>
                </SheetHeader>
                {renderMobileMenuItems()}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
