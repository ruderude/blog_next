import { Post } from '@/src/assets/types';

export const useSearchBlogs = (year: any, category: any, blogs: Post[]): Post[] => {
  let yearFilteredBlogs = [];
  let categoryFilteredBlogs = [];

  yearFilteredBlogs = year === 'all' ? blogs : blogs.filter((blog) => blog.frontMatter.year === year);

  categoryFilteredBlogs = category === 'all' ? yearFilteredBlogs : yearFilteredBlogs.filter((blog) => blog.frontMatter.categories.includes(category));

  // if (year === 'all') {
  //   yearFilteredBlogs = blogs;
  // } else {
  //   yearFilteredBlogs = blogs.filter((blog) => blog.frontMatter.year === year);
  // }

  // if (category === 'all') {
  //   categoryFilteredBlogs = yearFilteredBlogs;
  // } else {
  //   categoryFilteredBlogs = yearFilteredBlogs.filter((blog) => blog.frontMatter.categories.includes(category));
  // }

  return categoryFilteredBlogs;
  
}