import { RefObject } from "react";

export const useDropdownPosition = (
    ref: RefObject<HTMLDivElement | null > | <RefObject<HTMLDivElement>
) => {
    const getDropdownPosition  = () => {
        if(!ref.current) return {top: 0, left: 0}

        
    }
}