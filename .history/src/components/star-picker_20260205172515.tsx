'use client'

import { useState } from "react"
import { StarIcon } from "lucide-react"

import { cn } from '@/lib/utils'

interface StarPickerProps {
    value?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    className?: string;
}

export const StarPicker = ({
    value = 0,
    onChange, disabled, className
}: StarPickerProps) => {
    

    return (
        <div></div>
    )
}