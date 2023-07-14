import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import {
    getCustomerById,
    getAvatar,
    getAllFeedbackImages,
    previewAttachment
} from '@/api/api_function'
import { Rating } from '@mui/material'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import FeedbackImage from './FeedbackImage';

const Feedback = ({feedback}: any) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const [customer, setCustomer] = useState<any>(null);
    const [avatar, setAvatar] = useState<string>('');
    const [product, setProduct] = useState<any>(null);
    const [color, setProductColor] = useState<any>(null);
    const [productImageUrl, setProductImageUrl] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [listImage, setListImage] = useState<any[]>([]);

    const createdAtDate = new Date(feedback.createdAt)
    const createdAtDateString = createdAtDate.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })

    useEffect(() => {
        getCustomerById(feedback.customerId, currentUser).then((res) => {
            setCustomer(res.data.data);
            // console.log('customer', res.data.data);
            // getAvatar(currentUser).then((res) => {
            //     setAvatar(res.data.data);
            //     console.log('avatar', res.data.data);
            // });
            getAllFeedbackImages(feedback._id).then((res) => {
                setProductImageUrl(res.data.data);
                setListImage(res.data.data);
            });
        });
    }, [feedback]);

    return (
        <div key={feedback._id} className='grid grid-cols-2 md:grid-cols-4 mb-4'>
            <div className='flex items-center space-x-2'>
                <Rating name="read-only" precision={0.5} value={feedback.feedbackRating} readOnly />
                <div className='text-sm font-medium'>{customer?.customerLastName + ' ' + customer?.customerFirstName}</div>
            </div>
            <div  className='ml-2'>
                <div>
                    <div className='text-md text-gray-600'>{feedback.feedbackTitle}</div>
                    <div className='text-lg text-black font-bold'>{feedback.feedbackContent}</div>
                    <div>
                        {
                            productImageUrl.map((image: any, index: number) => {
                                return (
                                    <div key={index} className='inline-block mr-2'>
                                        <FeedbackImage image={productImageUrl} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='text-md text-gray-700'>{createdAtDateString}</div>
                </div>
            </div>
        </div>
    )
}

export default Feedback