import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/src/assets/types';

interface Props {
  post: Post
}

export const BlogCard: React.FC<Props> = (props) => {
  const { post } = props

  return (
    <>
      <div>
      <Link href={`/blog/${post.slug}`}>
        <a>
          <div className=''>
            <Image
              className="rounded-lg"
              src={`/${post.frontMatter.image}`}
              width={1200}
              height={700}
              alt={post.frontMatter.title}
            />
          </div>
          <div className="px-2">
            <h1 className="font-bold text-lg leading-tight text_pre">{post.frontMatter.title}</h1>
            <span className='text-xs'>{post.frontMatter.date}</span>
          </div>
        </a>
      </Link>
      <div className="space-x-2">
        {post.frontMatter.categories.map((category) => (
          <span className='bg-orange-500 text-white rounded px-2' key={category}>
            {category}
          </span>
        ))}
      </div>
    </div>
    </>
  );
};