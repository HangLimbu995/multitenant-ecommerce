import { ReviewsGetOneOutput } from "@/modules/reviews/types";

interface Props {
    productId: string;
    initialData?: ReviewsGetOneOutput;
}

export const ReviewForm = ({productId, }) => {
    return(
        <div>
            Review Form!
        </div>
    )
}