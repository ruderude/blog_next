import { NavBtn } from './NavBtn'
import { useRouter } from 'next/router'

interface Props {
  name: string
  color: string
  onChange: (e: any) => void
  labels: Array<string>
}

export const Nav: React.FC<any> = (props) => {
  const { name, color, onChange, labels } = props
  // console.log(labels)

  return (<>
    <div className="flex flex-row justify-start">
      {labels.map((label: string, index: number) => (
        <NavBtn
          name={name}
          color={color}
          onChange={onChange}
          key={index}
        >{label}</NavBtn>
      ))}
    </div>
  </>)
}
