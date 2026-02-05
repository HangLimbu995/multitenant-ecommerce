import {z} from 'zod'
import {useState}

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