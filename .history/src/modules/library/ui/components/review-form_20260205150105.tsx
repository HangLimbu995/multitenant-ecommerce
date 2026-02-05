import { z } from 'zod'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

import { useTRPC } from '@/trpc/client'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
// import {StarPicker} from '@/compon ents/star-picker'

import { ReviewsGetOneOutput } from "@/modules/reviews/types";

interface Props {
    productId: string;
    initialData?: ReviewsGetOneOutput;
}

const formSchema = z.object({
    rating: z.number().min(1, { message: "Rating is required" }).max(5),
    description: z.string().min(1, { message: "Description is required" })
})

export const ReviewForm = ({ productId, initialData }: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: initialData?.rating ?? 0,
            description: initialData?.description ?? ""
        }
    })

    return (
        <div>
            Review Form!
        </div>
    )
}