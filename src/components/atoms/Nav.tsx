import { NavBtn } from './NavBtn'
import { useRouter } from 'next/router'

interface Props {
  name: string
  color: string
  val: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  labels: Array<string>
}

export const Nav: React.FC<any> = (props) => {
  const { name, color, val, onChange, labels } = props
  // console.log(labels)

  return (<>
    <div className="flex flex-row justify-start">
      {labels.map((label: string, index: number) => (
        <NavBtn
          name={name}
          color={color}
          val={val}
          onChange={onChange}
          key={index}
        >{label}</NavBtn>
      ))}
    </div>
  </>)
}
