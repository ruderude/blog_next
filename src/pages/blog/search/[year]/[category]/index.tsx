import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import fs from 'fs';
import matter from 'gray-matter';
import { years, categories } from '@/src/assets';
import { Nav } from '@/src/components/atoms';
import { BlogCard } from '@/src/components/blog';
import { Post } from '@/src/assets/types';
import { useSearchBlogs } from '@/src/hooks/blog/useSearchBlogs';
import { PagingBtn } from '@/src/components/atoms/PagingBtn';


interface Props {
  posts: Post[]
}

const SeachBlogs: NextPage<Props> = (props) => {
  // ページサイズ
  const PAGE_SIZE  = 2;
  const { posts } = props;
  const router = useRouter();
  const { year, category, page } = router.query;
  const currentPage = page ? Number(page) : 1;
  console.log(currentPage)

  const [yearRadio, setYearRadio] = useState(year);
  const [categoryRadio, setCategoryRadio] = useState(category);

  useEffect(() => {
    setCategoryRadio((e) => category);
    setYearRadio((e) => year);
  }, [year, category])

  const choicePage = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.innerText)

    router.push({
      pathname: `/blog/search/${year}/${category}`,
      query: { page: e.currentTarget.innerText }
    });
  }
  
  const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.currentTarget.value;
    setCategoryRadio((e) => category);
    // console.log(yearRadio, category);
    router.push({
      pathname: `/blog/search/${yearRadio}/${category}`
    });
  }

  const changeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.currentTarget.value;
    setYearRadio((e) => year);
    // console.log(year, categoryRadio)
    router.push({
      pathname: `/blog/search/${year}/${categoryRadio}`
    });
  }

  const searchBlogs = useSearchBlogs(year, category, posts);
  // console.log(searchBlogs);

  const getPageLength = (posts: any) => {
    return Math.ceil(posts.length / PAGE_SIZE);
  }

  const pageLength = getPageLength(searchBlogs);

  console.log("searchBlogs");
  // const slicedBlogs = searchBlogs.slice(1, 3);
  const slicedBlogs = searchBlogs.slice(
    PAGE_SIZE * (currentPage - 1),
    PAGE_SIZE * currentPage
  );

  return (
    <>
      <div className='p-3'>
        <h1>SeachBlogs</h1>
        <h1>Year: { year }</h1>
        <h1>categories: {category}</h1>
        <br />
        <Nav
          name={'categories'}
          color={'orange'}
          val={categoryRadio}
          labels={categories}
          onChange={changeCategory}
        ></Nav>
        <br />
        <Nav
          name={'year'}
          color={'yellow'}
          val={yearRadio}
          labels={years}
          onChange={changeYear}
        ></Nav>
        <br />
        <div className="my-8">
          <div className="grid grid-cols-3 gap-4">
            {slicedBlogs.map((post) => (
              <React.Fragment key={post.slug}>
                <BlogCard post={post} />
              </React.Fragment>
            ))}
          </div>
        </div>
        <br />
        <PagingBtn pageLength={pageLength} currentPage={currentPage} choicePage={choicePage} />
      </div>
    </>
  )
}

export const getStaticProps = () => {
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );

  return {
    props: {
      posts: sortedPosts
    },
  };
};

export async function getStaticPaths({ params }: any) {

  let paths: Array<object> = [];
  for (let x = 0; x < years.length; x++) {
    for (let y = 0; y < categories.length; y++) {
      paths.push({
        params: {
          year: years[x],
          category: categories[y],
        }
      });
    }
  }

  return {
    paths: paths,
    fallback: false,
  };
}

export default SeachBlogs