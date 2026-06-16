import "./Timeline.css";
import { FaFutbol, FaClipboardCheck, FaTrophy } from "react-icons/fa";

import { MdSportsScore } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";

const Timeline = () => {

    const [active, setActive] = useState(false);
    const [step, setStep] = useState(0);

    const timelineRef = useRef(null);

    const positions = [
        "0%",
        "33.33%",
        "66.66%",
        "100%"
    ];

    useEffect(() => {

        if(!active) return;

        const times = [

            600,
            1800,
            3000,
            4200

        ];

        times.forEach((time,index)=>{

            setTimeout(()=>{

                setStep(index+1);

            },time);

        });

    },[active]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !active) {
                setActive(true);
            }
        }, { threshold: 0.3 });

        if (timelineRef.current) {
            observer.observe(timelineRef.current);
        }

        return () => observer.disconnect();
    }, [active]);

    return (

        <section ref={timelineRef} className="timeline">

            <h2>¿Cómo funciona?</h2>

            <div className="timeline-wrapper">

                <div className="timeline-line">

                <div className={`timeline-ball ${step === 4 ? "finish" : ""}`}
                    style={{
                        left: positions[step]
                    }}
                >
                    <FaFutbol />
                </div>

                </div>

                <div className="timeline-steps">

                    <div className={`timeline-step ${step >= 0 ? "active" : ""}`}>
                        <FaClipboardCheck />
                        <h3>Pronosticá</h3>
                        <p>Elegí el resultado antes de que empiece el partido.</p>
                    </div>

                    <div className={`timeline-step ${step >= 1 ? "active" : ""}`}>
                        <LuTimerReset />
                        <h3>Esperá</h3>
                        <p>Los resultados se actualizan automáticamente.</p>
                    </div>

                    <div className={`timeline-step ${step >= 2 ? "active" : ""}`}>
                        <MdSportsScore />
                        <h3>Sumá puntos</h3>
                        <p>Cuantos más aciertos tengas, más puntos conseguís.</p>
                    </div>

                    <div className={`timeline-step ${step >= 3 ? "finish active" : ""}`}
>
                        <FaTrophy />
                        <h3>Escalá</h3>
                        <p>Competí con otros jugadores y llegá al primer puesto.</p>
                    </div>

                </div>

            </div>

        </section>

    );

};

export default Timeline;
