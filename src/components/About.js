import React, {useContext, useEffect} from 'react'
import NoteContext from '../context/notes/noteContext'

const About = () => {
  // hum yahan usecontext hook ki madad say apnay banaye huway noteContext ko access kar rahay hain 
  const a = useContext(NoteContext)
  // useEffect jo hai wo componentdidmount ki tarhan hai 
  useEffect(() => {
    a.update();
    // agar humain is update k function ko kissi state ki value change ho jab kabhi bhi tab execute karwana hai toh hum khali array ki jagah wo state yeh value dein gy jis k change per honay per yeh function execute ho lekin kyu k abhi yeh khali array hai toh yeh sirf eik baar execute hoga aur yeh useEffect componentdidmount ki tarhan hai matlab yeh component render ho jaye us k baad execute hoga
    // eslint-disable-next-line
  }, [])
  

  return (
    <div>About {a.state.name} and his section is {a.state.class}</div>
  )
}

export default About