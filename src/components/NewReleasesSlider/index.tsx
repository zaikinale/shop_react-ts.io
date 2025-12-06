import { useState } from 'react';
import style from './style.module.scss';
import SliderImg1 from '../../assets/media/slider_1.png';
import SliderImg2 from '../../assets/media/slider_2.png';

interface SlideItem {
    id: number;
    img: string;
}

const dataSliders: SlideItem[] = [
    { id: 1, img: SliderImg1 },
    { id: 2, img: SliderImg2 }
];

export default function NewReleasesSlider() {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % dataSliders.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + dataSliders.length) % dataSliders.length);
    };

    return (
        <div className={style.container}>
            <div className={style.sliderWrapper}>
                <div className={style.clickContainer}>
                    <div className={style.clickPlace} onClick={prevSlide}></div>
                    <div className={style.clickPlace} onClick={nextSlide}></div>
                </div>
                <div
                    className={style.slides}
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`
                    }}
                >
                    {dataSliders.map((slide) => (
                        <div key={slide.id} className={style.slide}>
                            <img
                                className={style.sliderImg}
                                src={slide.img}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={style.controlContainer}>
                {dataSliders.map((_, index) => (
                    <button
                        key={index}
                        className={`${style.controlBtn} ${
                            index === currentSlide ? style.controlBtnActive : ''
                        }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Перейти к слайду ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}