interface Props {
  pageLength: number
  currentPage: number
  choicePage: (e: React.MouseEvent<HTMLElement>) => void
}

export const PagingBtn: React.FC<Props> = (props) => {
  const { pageLength, currentPage, choicePage } = props
  const btnArray = [...Array(pageLength)].map((_, i) => i + 1)

  return (<>
    <div className="flex flex-row justify-center">
      {btnArray.map((num) => (
        <div className={(num === currentPage) ? "choice_paging_btn" : "paging_btn"} onClick={choicePage} key={num}>{ num }</div>
      ))}
    </div>
  </>)
}
