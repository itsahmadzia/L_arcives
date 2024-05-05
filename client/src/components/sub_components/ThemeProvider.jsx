
import { useSelector } from 'react-redux'
export default function ThemeProvider({children}) {
    const {theme} = useSelector(state=>state.theme)
  return (
    <div className={theme}>
     <div className='bg-white text-zinc-950  dark:text-slate-400 dark:bg-[rgb(17,23,32)] min-h-screen  '>  
        {children}
        </div>   
    
    </div>
  )
}
