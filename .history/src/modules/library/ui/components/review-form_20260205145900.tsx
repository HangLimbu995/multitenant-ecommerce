import {z} from 'zod'
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

import {useTRPC} from '@/trpc/client'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
// import {StarPicker} from '@/compon ents/star-picker'

import { ReviewsGetOneOutput } from "@/modules/reviews/types";

interface Props {
    productId: string;
    initialData?: ReviewsGetOneOutput;
}

const formSchema = z.object({
    
})

export const ReviewForm = ({ productId, initialData }: Props) => {
    return (
        <div>
            Review Form!
        </div>
    )
}