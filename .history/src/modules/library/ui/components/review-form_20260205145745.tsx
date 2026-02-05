import {z} from 'zod'
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

import {trpc} from '@/trpc/'

import { ReviewsGetOneOutput } from "@/modules/reviews/types";

interface Props {
    productId: string;
    initialData?: ReviewsGetOneOutput;
}

export const ReviewForm = ({ productId, initialData }: Props) => {
    return (
        <div>
            Review Form!
        </div>
    )
}