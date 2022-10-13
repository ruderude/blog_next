export interface Post {
  frontMatter: {
    title: string
    date: string
    description: string
    image: string
    year: string
    categories: string[]
  },
  slug: string
}

export interface FrontMatter {
  title: string
  date: string
  description: string
  image: string
  year: string
  categories: string[]
}

export interface Slug {
  params:{ slug: string }
}