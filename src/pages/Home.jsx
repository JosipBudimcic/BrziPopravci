import { IME_APLIKACIJE } from "../constants";

export default function Home(){
    return(
    <>
    <h1>Dobrodošli na {IME_APLIKACIJE}</h1>
   <div>
              <img 
          src="public\popravci.jpg" 
          alt="Opis slike" 
          style={{ maxWidth: '100%', height: 'auto' }} 
        />
      </div>
    </>
    )
}