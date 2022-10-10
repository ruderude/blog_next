import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from "react";
import fs from 'fs';
import { years, categories } from '../../../../../../define'
import { Nav } from '../../../../../components/atoms/Nav'

const SeachBlogs: NextPage = () => {
  const router = useRouter();
  const { year, category } = router.query;

  const [yearRadio, setYearRadio] = useState(year);
  const [categoryRadio, setCategoryRadio] = useState(category);

  // console.log(yearRadio)
  // console.log(categoryRadio)
  
  const changeCategory = (e: any) => {
    const category = e.target.value
    setCategoryRadio((e) => category)
    // console.log(yearRadio, category)
    router.push({
      pathname: `/blog/search/${yearRadio}/${category}`
    })
  }

  const changeYear = (e: any) => {
    const year = e.target.value
    setYearRadio((e) => year)
    // console.log(year, categoryRadio)
    router.push({
      pathname: `/blog/search/${year}/${categoryRadio}`
    })
  }

  return (
    <>
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
    </>
  )
}

export const getStaticProps = () => {
  const files = fs.readdirSync('posts');
  console.log('files:', files);
  return {
    props: {
      posts: [],
    },
  };
};

export async function getStaticPaths({ params }: any) {

  let paths: Array<object> = []
  for (let x = 0; x < years.length; x++) {
    for (let y = 0; y < categories.length; y++) {
      paths.push({
        params: {
          year: years[x],
          category: categories[y],
        }
      })
    }
  }
  console.log(paths)
  return {
    paths: paths,
    fallback: false,
  };
}

export default SeachBlogs