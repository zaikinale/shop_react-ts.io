import style from './style.module.scss'
import TypeCard from '../TypeCard'
import { useCardsDatas } from "../../hooks/useCardsDatas.js";

export default function CatalogContainer () {
    const { typesItems } = useCardsDatas()

  return (
    <div className={style.sliderTypes}> 
      {typesItems.map(type => (
        <TypeCard key={type.Category_ID} type={type} />
      ))} 
    </div>
  );
}