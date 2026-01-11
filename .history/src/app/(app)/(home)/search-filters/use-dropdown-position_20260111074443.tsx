import { RefObject } from "react";

export const useDropdownPosition = (
    ref: RefObject<HTMLDivElement | null > | <RefObject<HTMLDivElement>
) => {
    const getDropdownPosition  = () => {
        if(!ref.current) return {top: 0, left: 0}

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240; // Width of dropdown (w-60 = 15rem = 240rem)

        


    }
}