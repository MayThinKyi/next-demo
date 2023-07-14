import SearchBar from '@/app/components/(blog)/search'
import Link from 'next/link';
import React from 'react'
const searchNews=async(title)=>{
    const res=await fetch(`https://newsapi.org/v2/everything?q=${title}&apiKey=${process.env.NEWS_API_KEY}`);
    const data=await res.json();
    return data?.articles;
}
const BlogSearchPage = async({searchParams}) => {
    const {title}=searchParams;
    const searchedNewsData=await searchNews(title);
    console.log(searchedNewsData)
  return (
    <div className='py-20 px-10'>
      <div className='flex items-center justify-between gap-y-8 flex-wrap'>
      <div className='flex items-center justify-between gap-y-8 flex-wrap'>
    {searchedNewsData?.map((article)=>{
        return  <div className='w-[320px] border rounded-lg' key={article?.title}>
            <Link href={`/blogs/${article?.title}`}  className='bg-[#fff] rounded-lg'>
        <img className='rounded-t-lg max-h-[200px] object-cover' width={500} height={200} src={article?.urlToImage ? article?.urlToImage: '/placeholder.png'} alt={article?.title} />
       <div className='px-5 pb-3'>
            <h1 className='line-clamp-3 text-xl font-semibold text-black my-2'>{article?.title}</h1>
            <h1 className='line-clamp-3'>{article?.content ? article?.content :'No Content....'}</h1>
       </div>
    </Link></div>
      })} 
    </div>
    </div>
    </div>
  )
}

export default BlogSearchPage
