import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu";
import { Button } from "@/app/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/ui/avatar";
import { truncateText } from "@/helpers/truncate";
import { Session } from "next-auth";
import { SignOutLink } from "@/app/ui/sign-out-link";
import { LogOut } from "lucide-react";

export async function UserNav(session: Session) {
  const username = session?.user?.username || "";
  const email = session?.user?.email || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>{truncateText(username, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutLink>
          <DropdownMenuLabel
            className={
              "!cursor-pointer relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            }
          >
            Log out
            <DropdownMenuShortcut>
              <LogOut className="w-[20px]" />
            </DropdownMenuShortcut>
          </DropdownMenuLabel>
        </SignOutLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
