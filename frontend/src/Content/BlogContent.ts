import { BlogCardProps } from "../components/Home/BlogCard"
import blog1 from '../assets/images/Blog/blog-1.webp'
import blog2 from '../assets/images/Blog/blog-2.webp'
import blog3 from '../assets/images/Blog/blog-3.webp'


export const blogs : BlogCardProps[] = [
    {
        imgSrc : blog1,
        writer : 'RamRahim',
        date : new Date(2023,3,28),
        title : 'Safety rules for bike workshops',
        content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quo odit nesciunt. Atque eius suscipit ex dolor ea aliquam eum, corporis saepe sequi, officia cupiditate incidunt molestias maiores facere facilis!'
    },
    {
        imgSrc : blog2,
        writer : 'Manjolika Sharma',
        date : new Date(2023,3,29),
        title : 'How to choose bar repair services?',
        content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quo odit nesciunt. Atque eius suscipit ex dolor ea aliquam eum, corporis saepe sequi, officia cupiditate incidunt molestias maiores facere facilis!'
    },
    {
        imgSrc : blog3,
        writer : 'Nagini Verma',
        date : new Date(2023,3,30),
        title : '10 preventive maintainenance tips',
        content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quo odit nesciunt. Atque eius suscipit ex dolor ea aliquam eum, corporis saepe sequi, officia cupiditate incidunt molestias maiores facere facilis!'
    },
]