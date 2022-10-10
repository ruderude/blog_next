interface Props {
  name: string
  color: string
  onChange: (e: any) => void
  children: string
}

export const NavBtn: React.FC<Props> = (props) => {
  const { name, color, onChange, children } = props
  const style_text = `bg-${color}-500 hover:bg-${color}-600 peer-checked:bg-${color}-700 text-white rounded px-4 py-2 mx-1`

  return (<>
    {/* <button className="shadow-lg bg-orange-500 hover:bg-orange-600 shadow-orange-600 peer-checked:bg-orange-700 text-white rounded px-2 py-1">Submit</button>
    <button className="shadow-lg bg-yellow-500 hover:bg-yellow-600 shadow-yellow-600 peer-checked:bg-yellow-700 text-white rounded px-2 py-1">Submit</button> */}
    <div className="mx-1">
      <input type="radio" name={name} id={name+children} value={children} className="hidden peer" onChange={onChange} />
      <label htmlFor={name+children} className={style_text}>{children}</label>
    </div>
  </>)
}