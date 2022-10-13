import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { createElement, Fragment } from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import remarkPrism from 'remark-prism';
import rehypeReact from 'rehype-react';
import rehypeParse from 'rehype-parse';
import remarkUnwrapImages from 'remark-unwrap-images';
import { Slug, FrontMatter } from '@/src/assets/types';
import { NextSeo } from 'next-seo';
import { host } from '@/next-seo.config';

const toReactNode = (content: string) => {
  return unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: MyLink,
        img: MyImage,
      },
    })
    .processSync(content).result;
};

const MyLink = ({ children, href }: any) => {
  if (href === '') href = '/';
  return href.startsWith('/') || href.startsWith('#') ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const MyImage = ({ src, alt }: any) => {
  return (
    <div className="relative max-w-full h-96">
      <Image src={src} alt={alt} layout="fill" objectFit="contain" />
    </div>
  );
};

const Blog: NextPage<{ frontMatter: FrontMatter, content: string }> = ({ frontMatter, content }) => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
        openGraph={{
          type: 'website',
          url: `${host}blog/${slug}`,
          title: frontMatter.title,
          description: frontMatter.description,
          images: [
            {
              url: `${host}${frontMatter.image}`,
              width: 1200,
              height: 700,
              alt: frontMatter.title,
            },
          ],
        }}
      />

      <div className="prose prose-lg max-w-none">
        <div className="">
          <Image
            src={`/${frontMatter.image}`}
            width={1200}
            height={700}
            objectFit="contain"
            alt={frontMatter.title}
          />
        </div>
        <div className='p-3'>
          <h1 className="text_pre my-0">{frontMatter.title}</h1>
          <span>{frontMatter.date}</span>
          <div className="text_pre space-x-2">
            {frontMatter.categories.map((category) => (
              <span className='bg-orange-500 text-white rounded px-2' key={category}>
                <Link href={`/blog/search/all/${category}`}>
                  <a className='text-white'>{category}</a>
                </Link>
              </span>
            ))}
          </div>
          <div className='text_pre'>
            {toReactNode(content)}
          </div>
        </div>
        
      </div>
    </>
  );
};

export async function getStaticProps({ params }: Slug) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);
  const result = await unified()
    .use(remarkParse)
    .use(remarkPrism, {
      plugins: ['line-numbers'],
    })
    .use(remarkToc, {
      heading: '目次',
      tight: true,
    })
    .use(remarkUnwrapImages)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);
  return { props: { frontMatter: data, content: result.toString() } };
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  // console.log('paths:', paths);
  return {
    paths,
    fallback: false,
  };
}

export default Blog;