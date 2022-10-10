import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Slug: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <>
      <h1>Slug</h1>
      <h1>slug: { slug }</h1>
    </>
  );
};

export default Slug;