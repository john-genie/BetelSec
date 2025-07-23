'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronDown, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from '../icons/logo';
import React from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { FuturisticMenuIcon } from '../icons/futuristic-menu-icon';

const productLinks = [
    { name: 'PRISM', href: '/products/prism', description: 'AI-powered threat mitigation & hybrid PQC encryption for total data protection.' },
    { name: 'SYNAPSE', href: '/products/synapse', description: 'Quantum-Resistant Security for Data in Motion' },
    { name: 'DSG', href: '/products/dsg', description: 'Data Security Gateway for Post-Quantum Data-at-Rest' },
    { name: 'Post-Quantum VPN', href: '/products/vpn', description: 'The Future of Secure Remote Access' },
    { name: 'QRC-84', href: '/products/qrc-84', description: 'Anonymous Post-Quantum Communication Channel' },
];

const threatLinks = [
    { name: 'Harvest Now, Decrypt Later', href: '/threats/harvest-now-decrypt-later' },
    { name: 'Quantum Risk Assessment', href: '/risk-assessment' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(productLinks[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'border-b bg-background/80 shadow-sm backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Logo className="h-6 w-6" />
          <span>BetelSec</span>
        </Link>
        
        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                    <Link
                      href={hoveredProduct.href}
                      className="flex h-full flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <Lock className="h-8 w-8" />
                      <div className="mt-4 mb-2 text-lg font-medium">
                        {hoveredProduct.name}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {hoveredProduct.description}
                      </p>
                    </Link>
                    <ul className="flex flex-col gap-1">
                      {productLinks.map((component) => (
                        <ListItem
                          key={component.name}
                          title={component.name}
                          href={component.href}
                          onMouseEnter={() => setHoveredProduct(component)}
                        />
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Threat Analysis <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {threatLinks.map(link => (
                    <DropdownMenuItem key={link.name} asChild>
                        <Link href={link.href}>{link.name}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" asChild>
            <Link href="/about">About Us</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/blog">Blog</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <FuturisticMenuIcon open={mobileMenuOpen} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-8">
                    <Logo className="h-6 w-6" />
                    <span>BetelSec</span>
                </Link>
              <nav className="flex flex-col gap-4">
                 <SheetClose asChild>
                    <Button variant="ghost" asChild className="w-full justify-start text-lg px-4 py-2 font-medium">
                        <Link href="/">Home</Link>
                    </Button>
                </SheetClose>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="products" className="border-b-0">
                    <AccordionTrigger className="px-4 py-2 text-lg font-medium hover:no-underline [&[data-state=open]>svg]:rotate-180">Products</AccordionTrigger>
                    <AccordionContent className="pl-6 pb-2">
                      <div className="flex flex-col gap-2">
                        {productLinks.map(link => (
                            <SheetClose asChild key={link.name}>
                                <Link href={link.href} className="text-muted-foreground hover:text-foreground">{link.name}</Link>
                            </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="threats" className="border-b-0">
                    <AccordionTrigger className="px-4 py-2 text-lg font-medium hover:no-underline [&[data-state=open]>svg]:rotate-180">Threat Analysis</AccordionTrigger>
                    <AccordionContent className="pl-6 pb-2">
                       <div className="flex flex-col gap-2">
                        {threatLinks.map(link => (
                            <SheetClose asChild key={link.name}>
                                <Link href={link.href} className="text-muted-foreground hover:text-foreground">{link.name}</Link>
                            </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <SheetClose asChild>
                    <Button variant="ghost" asChild className="w-full justify-start text-lg px-4 py-2 font-medium">
                        <Link href="/about">About Us</Link>
                    </Button>
                </SheetClose>
                <SheetClose asChild>
                    <Button variant="ghost" asChild className="w-full justify-start text-lg px-4 py-2 font-medium">
                        <Link href="/blog">Blog</Link>
                    </Button>
                </SheetClose>
                 <SheetClose asChild>
                    <Button variant="ghost" asChild className="w-full justify-start text-lg px-4 py-2 font-medium">
                        <Link href="/contact">Contact</Link>
                    </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<typeof Link> & { onMouseEnter?: React.MouseEventHandler<HTMLLIElement> }
>(({ className, title, href, onMouseEnter, ...props }, ref) => {
  return (
    <li onMouseEnter={onMouseEnter}>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title as string}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
