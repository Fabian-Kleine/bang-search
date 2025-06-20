import { ReactElement } from "react";
import LucideIcon, { IconName } from "./lucide-icon";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface IconInputProps {
    icon: IconName;
    children: ReactElement<HTMLInputElement | HTMLTextAreaElement>;
    className?: string;
}

export default function IconInput({ icon, children, className }: IconInputProps) {

    const isTextarea = children.type.toString().toLowerCase().includes("textarea");

    return (
        <div className={cn("relative", className)}>
            <LucideIcon className={cn("absolute left-3 transform -translate-y-1/2 text-muted-foreground text-sm", isTextarea ? "top-5" : "top-1/2")} size={18} name={icon} />
            <Slot className="pl-10 pr-4">
                {children}
            </Slot>
        </div>
    );
}