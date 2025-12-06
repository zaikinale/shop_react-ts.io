import style from './style.module.scss'
import TypeCard from '../TypeCard/index.js'
import { useCardsDatas } from "../../hooks/useCardsDatas";


export default function SliderProductTypes() {
    const { typesItems } = useCardsDatas()
  return (
    <div className={style.sliderTypes}>
      {typesItems.map(type => (
        <TypeCard key={type.Category_ID} type={type} />
      ))}
    </div>
  );
}