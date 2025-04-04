"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { ILawyer } from "@/interfaces/ILawyer";
import { LawyerService } from "@/service/lawyer.service";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getAvatarFallback, getAvatarUrl } from "@/hooks/use-avatar-url";

interface LawyerMultiSelectProps {
  selectedLawyers: ILawyer[];
  setSelectedLawyers: React.Dispatch<React.SetStateAction<ILawyer[]>>;
}

export default function LawyerMultiSelect({
  selectedLawyers,
  setSelectedLawyers,
}: LawyerMultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((lawyer: ILawyer) => {
    setSelectedLawyers((prevLawyers: ILawyer[]) =>
      prevLawyers.filter((l) => l.email !== lawyer.email)
    );
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const newSelected = [...selectedLawyers];
            const validLawyers = newSelected.pop() as unknown;

            setSelectedLawyers(validLawyers as ILawyer[]);
          }
        }

        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const [allLawyers, setAllLawyers] = React.useState<ILawyer[]>([]);

  const selectableLawyers = allLawyers.filter(
    (lawyer) => !selectedLawyers.includes(lawyer)
  );

  const filteredLawyers = selectableLawyers.filter((lawyer) => {
    const search = inputValue?.toLowerCase() || "";
    return (
      lawyer.username.toLowerCase().includes(search) ||
      lawyer.email.toLowerCase().includes(search)
    );
  });


  React.useEffect(() => {
    const onGetAllLawyers = async () => {
      try {
        const lawyers = await LawyerService.getAllLawyers();
        const lawyer = await LawyerService.getLawyer();

        setAllLawyers(lawyers.filter((l) => l.id !== lawyer.id));
      } catch (error) {
        console.log("LawyerMultiSelect - onGetAllLawyers: ", error);
      }
    };

    onGetAllLawyers();
  }, []);

  return (
    // @ts-ignore
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selectedLawyers.map((lawyer) => {
            return (
              <Badge key={lawyer.email} variant="secondary">
                {lawyer.email}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(lawyer);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(lawyer)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          {/* @ts-ignore */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select frameworks..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="relative mt-2">
        {/* @ts-ignore */}
        <CommandList>
          {open && filteredLawyers.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              {/* @ts-ignore */}
              <CommandGroup className="h-full overflow-auto">
                {filteredLawyers
                  .filter((lawyer, index) => index <= 5)
                  .map((lawyer) => {
                    return (
                      // @ts-ignore
                      <CommandItem
                        key={lawyer.email}
                        onMouseDown={(e: any) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          setInputValue("");
                          setSelectedLawyers((prev) => [...prev, lawyer]);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex gap-2 items-center">
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                              src={getAvatarUrl(lawyer.avatar)}
                              alt={lawyer.name}
                            />
                            <AvatarFallback className="rounded-lg">
                              {getAvatarFallback(lawyer.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            <h4 className="font-semibold">{lawyer.username}</h4>
                            <p className="font-medium text-zinc-500">
                              {lawyer.email}
                            </p>
                          </div>
                        </div>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
