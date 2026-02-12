import { useState, useEffect, useMemo } from 'react';

export default function RelationshipTimer() {
    // Fecha: 8 Dic 2018, 17:30. Mes es 0-indexado (11 = Diciembre)
    const startDate = useMemo(() => new Date(2018, 11, 8, 17, 30, 0), []);
    const [timeElapsed, setTimeElapsed] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            let years = now.getFullYear() - startDate.getFullYear();
            let months = now.getMonth() - startDate.getMonth();
            let days = now.getDate() - startDate.getDate();
            let hours = now.getHours() - startDate.getHours();
            let minutes = now.getMinutes() - startDate.getMinutes();
            let seconds = now.getSeconds() - startDate.getSeconds();

            // Ajustar segundos
            if (seconds < 0) {
                seconds += 60;
                minutes--;
            }

            // Ajustar minutos
            if (minutes < 0) {
                minutes += 60;
                hours--;
            }

            // Ajustar horas
            if (hours < 0) {
                hours += 24;
                days--;
            }

            // Ajustar días
            if (days < 0) {
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += prevMonth.getDate();
                months--;
            }

            // Ajustar meses
            if (months < 0) {
                months += 12;
                years--;
            }

            setTimeElapsed({ years, months, days, hours, minutes, seconds });
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);

        return () => clearInterval(interval);
    }, [startDate]);

    return (
        <div className="mt-8 p-6 bg-white/40 rounded-xl backdrop-blur-sm border border-white/50 shadow-sm">
            <h3 className="text-xl font-quicksand font-bold text-primary mb-4">
                Me haces muy feliz desde hace:
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center">
                <TimeUnit value={timeElapsed.years} label="Años" />
                <TimeUnit value={timeElapsed.months} label="Meses" />
                <TimeUnit value={timeElapsed.days} label="Días" />
                <TimeUnit value={timeElapsed.hours} label="Horas" />
                <TimeUnit value={timeElapsed.minutes} label="Min" />
                <TimeUnit value={timeElapsed.seconds} label="Seg" />
            </div>
        </div>
    );
}

function TimeUnit({ value, label }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-text bg-white/60 rounded-lg min-w-[3rem] py-1 px-2 shadow-inner">
                {value}
            </span>
            <span className="text-xs font-semibold text-primary mt-1 uppercase tracking-wider">
                {label}
            </span>
        </div>
    );
}
